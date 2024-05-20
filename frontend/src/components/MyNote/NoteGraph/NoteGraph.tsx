import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useQuestion } from "../../../hooks/useComfirm";
import {
  getGraphData,
  linkCreate,
  linkDelete,
} from "../../../api/noteGraphAxios";
import { useError2 } from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

interface Node {
  nodeId: number;
  idx: number;
  value: string;
  type: string;
}

interface Link {
  source: number;
  target: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

// const GraphDataSample: Graph = {
//   nodes: [
//     { nodeId: 2, idx: 1, value: "태그", type: "TAG" },
//     { nodeId: 3, idx: 2, value: "해림메모1", type: "MYNOTE" },
//     { nodeId: 4, idx: 3, value: "도하메모", type: "OTHERNOTE" },
//     { nodeId: 5, idx: 4, value: "화석메모", type: "OTHERNOTE" },
//     { nodeId: 7, idx: 5, value: "아영메모", type: "OTHERNOTE" },
//     { nodeId: 8, idx: 6, value: "제훈메모", type: "OTHERNOTE" },
//     { nodeId: 9, idx: 7, value: "도하메모2", type: "OTHERNOTE" },
//     { nodeId: 11, idx: 8, value: "해림메모3", type: "MYNOTE" },
//     { nodeId: 12, idx: 9, value: "민기메모1", type: "OTHERNOTE" },
//     { nodeId: 13, idx: 10, value: "민기메모2", type: "OTHERNOTE" },
//     { nodeId: 16, idx: 11, value: "민기메모3", type: "OTHERNOTE" },
//     { nodeId: 19, idx: 12, value: "연결안됨", type: "MYNOTE" },
//   ],

//   links: [
//     { source: 2, target: 1 },
//     { source: 3, target: 2 },
//     { source: 4, target: 1 },
//     { source: 5, target: 1 },
//     { source: 9, target: 8 },
//     { source: 10, target: 8 },
//     { source: 11, target: 2 },
//     { source: 7, target: 2 },
//     { source: 6, target: 8 },
//   ],
// };

const NoteGraph = () => {
  // Refs 정의
  const svgRef = useRef<SVGSVGElement | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);

  // State 정의
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  let simulation: d3.Simulation<Node, Link>;

  const navigate = useNavigate();

  // 그래프 그리기
  const getGraph = async () => {
    try {
      const response = await getGraphData();
      if (response) {
        setNodes([...response.nodes]);
        setLinks([...response.links]);
      }
      console.log("getGraph 들어옴");
    } catch (error) {
      console.error("Failed to get graph data:", error);
    }
  };

  useEffect(() => {
    getGraph();
  }, []);

  // ================== 노트 연결  ==================
  const handleNodeDoubleClick = (nodeIdx: number, graph: Graph) => {
    const selectedNode = nodes.find((node) => node.idx === nodeIdx);
    if (!selectedNode) return;

    if (selectedNodes.length === 0) {
      console.log("노드 더블클릭:", selectedNode);
      setSelectedNodes([selectedNode]);
      console.log("selectedNodes", selectedNodes);
    } else if (selectedNodes.length === 1) {
      console.log("노드 두번째 더블클릭");
      const firstSelectedNode = selectedNodes[0];
      console.log("selectedNode 두번째다.", selectedNode);
      const firstNode = nodes.find(
        (node) => node.idx === firstSelectedNode.idx,
      );
      console.log("firstNode", firstNode);
      if (!firstNode) return;

      if (firstNode.type === "OTHERNOTE" && selectedNode.type === "OTHERNOTE") {
        useError2({
          title: "Other Note Connection Error",
          text: "다른 사람의 노트끼리는 연결할 수 없습니다.",
        });
        setSelectedNodes([]);
      }
      if (firstNode.type === "TAG" || selectedNode.type === "TAG") {
        useError2({
          title: "Tag Connection Error",
          text: "그래프에서는 태그와 연결이 어렵습니다.",
        });
        setSelectedNodes([]);
      } else {
        handleConnect(firstNode.nodeId, selectedNode.nodeId);
      }
    } else {
      setSelectedNodes([]);
    }
  };

  // 노드 연결 핸들러
  const handleConnect = async (noteId: number, targetNodeId: number) => {
    const result = await useQuestion({
      title: "Connect Note",
      fireText: "노트를 연결하시겠습니까?",
      resultText: "노트가 연결되었습니다.",
    });

    if (result) {
      try {
        await linkCreate(noteId, targetNodeId);
        getGraph();
      } catch (error) {
        console.error("Failed to create link:", error);
      }
      setSelectedNodes([]);
    }
  };

  // ================== 링크 삭제 ==================
  const handleLinkClick = async (event: MouseEvent, d: Link, graph: Graph) => {
    // 연결 끊기 작업 수행
    console.log(d);
    // source와 target 노드의 idx를 가져옵니다.
    const sourceNode = d.source;
    const targetNode = d.target;
    console.log("sourceNode", sourceNode);
    console.log("targetNode", targetNode);

    // source나 target 중에 type이 TAG인 것이 있는지 확인
    const isTagInLink =
      sourceNode?.type === "TAG" || targetNode?.type === "TAG";

    // TAG가 있는 경우 알림 띄우기
    if (isTagInLink) {
      useError2({
        title: "Tag Link Error",
        text: "태그와 연결된 노트는 연결을 끊을 수 없습니다.",
      });
      return;
    }

    const handleDeleteLink = async () => {
      try {
        await linkDelete(sourceNode.nodeId, targetNode.nodeId);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedLinks = graph.links.filter(
          (link) => !(link.source === d.source && link.target === d.target),
        );
        setLinks(updatedLinks);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedNodes = graph.nodes.filter(
          (node) => node.nodeId !== sourceNode && node.nodeId !== targetNode,
        );
        setNodes(updatedNodes);
        console.log("링크 연결 해제 완료");
      } catch (error) {
        console.error("Failed to disconnect link:", error);
      }
    };

    const handleDisconnectAlert = async () => {
      const result = await useQuestion({
        title: "Disconnect Link",
        fireText: "연결을 끊으시겠습니까?",
        resultText: "연결이 끊겼습니다.",
      });

      if (result) {
        await handleDeleteLink();
      } else {
        console.log("취소");
      }
    };

    handleDisconnectAlert();
  };

  // ================== 노드 클릭 ==================
  const handleNodeClick = (node: Node) => {
    if (node.type === "MY_NOTE") {
      navigate(`/omegi/myNote/${node.nodeId}`);
    } else if (node.type === "OTHERS_NOTE") {
      navigate(`/omegi/allNote/${node.nodeId}`);
    }
  };

  useEffect(() => {
    const width = 1100;
    const height = 550;
    const margin = 100;

    const graph = { nodes, links };
    // getGraph();
    if (nodes.length == 0 || links.length == 0) return;

    // 이전에 생성된 시뮬레이션을 중지하고 삭제합니다.
    if (simulation) simulation.stop();
    simulation = d3
      .forceSimulation<Node, Link>(nodes)
      .force(
        "link",
        d3
          .forceLink<Link>(links)
          .id((d) => {
            // console.log("d.idx", d.idx);
            return d.idx;
          })
          .distance(55), // 링크의 길이
      )
      .force("charge", d3.forceManyBody().strength(-900))
      .force("center", d3.forceCenter(width / 2, height / 2))

      .force(
        "x",
        d3.forceX().x((d) => Math.max(margin, Math.min(width - margin, d.x!))),
      )
      .force(
        "y",
        d3.forceY().y((d) => Math.max(margin, Math.min(height - margin, d.y!))),
      )

      .force("x", d3.forceX(width).strength(0.25)) // x축 위치 제한
      .force("y", d3.forceY(height).strength(0.5)); // y축 위치 제한

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const link = svg
      .append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(15)) // 링크의 두께
      .on("click", (event, d: Link) => handleLinkClick(event, d, graph)); // 그래프 객체 전달

    const node = svg
      .append("g")
      .selectAll(".circle")
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("click", (event, d: Node) => handleNodeClick(d))
      .call(
        d3
          .drag<SVGGElement, Node, SVGGElement>()
          .on("start", (event, d: Node) => {
            if (!event.active) simulation.alphaTarget(0.3);
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: Node) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: Node) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    node
      .append("circle")
      .attr("r", 7)
      .attr("fill", (d) => {
        if (d.type === "MY_NOTE") {
          return "#ffcaa2";
        } else if (d.type === "OTHERS_NOTE") {
          return "#c9c4ff";
        } else {
          return "#baffa1";
        }
      })
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 21)
      .style("font-size", "12px") // 글자 크기 설정
      .attr("fill", "white")
      .text((d) => d.value);

    node.on("dblclick", (event, d, graph) => {
      handleNodeDoubleClick(d.idx, graph);
      d3.select(this)
        .select("circle")
        .attr(
          "stroke",
          selectedNodes.find((node) => node.idx === d.idx) ? "red" : "black",
        );
    });

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    };

    simulation.nodes(nodes).on("tick", ticked);
  }, [nodes, links, selectedNodes]);

  return (
    <div
      ref={graphRef}
      className="flex h-full w-full items-center justify-center"
    >
      {/* 그래프 컨텐츠 */}
      <svg ref={svgRef} className=" h-full w-full"></svg>
    </div>
  );
};

export default NoteGraph;
