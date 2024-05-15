import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useQuestion } from "../../../hooks/useComfirm";
import { linkCreate, linkDelete } from "../../../api/noteGraphAxios";

interface Node {
  id: number;
  idx: number;
  title: string;
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

const GraphDataSample: Graph = {
  nodes: [
    { id: 2, idx: 1, title: "태그", type: "TAG" },
    { id: 3, idx: 2, title: "해림메모1", type: "MYNOTE" },
    { id: 4, idx: 3, title: "도하메모", type: "OTHERNOTE" },
    { id: 5, idx: 4, title: "화석메모", type: "OTHERNOTE" },
    { id: 7, idx: 5, title: "아영메모", type: "OTHERNOTE" },
    { id: 8, idx: 6, title: "제훈메모", type: "OTHERNOTE" },
    { id: 9, idx: 7, title: "도하메모2", type: "OTHERNOTE" },
    { id: 11, idx: 8, title: "해림메모3", type: "MYNOTE" },
    { id: 12, idx: 9, title: "민기메모1", type: "OTHERNOTE" },
    { id: 13, idx: 10, title: "민기메모2", type: "OTHERNOTE" },
    { id: 16, idx: 11, title: "민기메모3", type: "OTHERNOTE" },
    { id: 19, idx: 12, title: "연결안됨", type: "MYNOTE" },
  ],
  links: [
    { source: 2, target: 1 },
    { source: 3, target: 2 },
    { source: 4, target: 1 },
    { source: 5, target: 1 },
    { source: 9, target: 8 },
    { source: 10, target: 8 },
    { source: 11, target: 2 },
    { source: 7, target: 2 },
    { source: 6, target: 8 },
  ],
};

const NoteGraph = () => {
  // Refs 정의
  const svgRef = useRef<SVGSVGElement | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);

  // State 정의
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const [nodes, setNodes] = useState<Node[]>(GraphDataSample.nodes);
  const [links, setLinks] = useState<Link[]>(GraphDataSample.links);
  let simulation: d3.Simulation<Node, Link>;

  // ================== 노트 연결  ==================
  const handleNodeDoubleClick = (nodeIdx: number) => {
    const selectedNode = nodes.find((node) => node.idx === nodeIdx);
    if (!selectedNode) return;

    if (selectedNodes.length === 0) {
      console.log("노드 더블클릭:", nodeIdx);
      setSelectedNodes([nodeIdx]);
    } else if (selectedNodes.length === 1) {
      console.log("노드 두번째 더블클릭");
      const firstNodeIdx = selectedNodes[0];
      console.log("firstNodeIdx", firstNodeIdx);
      const firstNode = nodes.find((node) => node.idx === firstNodeIdx);
      if (!firstNode) return;

      if (firstNode.type === "OTHERNOTE" && selectedNode.type === "OTHERNOTE") {
        alert("다른 노트끼리는 연결할 수 없습니다.");
        setSelectedNodes([]);
      } else {
        handleConnect(firstNodeIdx, nodeIdx);
      }
    } else {
      setSelectedNodes([]);
    }
  };

  // 노드 연결 핸들러
  const handleConnect = async (firstNodeIdx: number, nodeIdx: number) => {
    const result = await useQuestion({
      title: "Connect Note",
      fireText: "노트를 연결하시겠습니까?",
      resultText: "노트가 연결되었습니다.",
    });

    if (result) {
      // 링크 추가
      const newLink = { source: firstNodeIdx, target: nodeIdx };
      setLinks([...links, newLink]);

      // linkCreate 함수를 사용하여 링크 생성
      try {
        await linkCreate(newLink);
      } catch (error) {
        console.error("Failed to create link:", error);
      }
      setSelectedNodes([]);
    }
  };

  // ================== 링크 삭제 ==================
  const handleLinkClick = async (
    sourceNode: number,
    targetNode: number,
    d: Link,
    graph: Graph,
  ) => {
    // 연결 끊기 작업 수행
    console.log("링크 클릭:", d.source, "->", d.target);

    const handleDeleteLink = async () => {
      try {
        // linkDelete 함수를 사용하여 선택된 링크의 연결을 끊습니다.
        await linkDelete(sourceNode, targetNode);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedLinks = graph.links.filter(
          (link) => !(link.source === d.source && link.target === d.target),
        );
        setLinks(updatedLinks);
        console.log("updatedLinks:", updatedLinks);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedNodes = graph.nodes.filter(
          (node) => node.id !== sourceNode && node.id !== targetNode,
        );
        setNodes(updatedNodes);
        console.log("updatedNodes:", updatedNodes);
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

  useEffect(() => {
    const width = 1212;
    const height = 830;

    const graph: Graph = { nodes, links };

    // 이전에 생성된 시뮬레이션을 중지하고 삭제합니다.
    if (simulation) simulation.stop();
    simulation = d3
      .forceSimulation<Node, Link>(graph.nodes)
      .force(
        "link",
        d3
          .forceLink<Link>(graph.links)
          .id((d) => d.idx)
          .distance(50), // 링크의 길이
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 3, height / 3))

      .force("x", d3.forceX(width).strength(0.1)) // x축 위치 제한
      .force("y", d3.forceY(height).strength(0.1)); // y축 위치 제한

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const link = svg
      .append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(10)) // 링크의 두께
      .on("click", (event, d: Link) => handleLinkClick(event, d, graph)); // 그래프 객체 전달

    const node = svg
      .append("g")
      .selectAll(".circle") // class로 선택하도록 수정
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr("class", "circle")
      .call(
        d3
          .drag<SVGGElement, Node, SVGGElement>()
          .on("start", (event, d: Node) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
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
      .attr("r", 10)
      .attr("fill", (d) => {
        if (d.type === "MYNOTE") {
          return "#A9DFD8";
        } else if (d.type === "OTHERNOTE") {
          return "#B6B1EC";
        } else {
          return "orange";
        }
      });

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 21)
      .style("font-size", "12px") // 글자 크기 설정
      .text((d) => d.title);

    node.on("dblclick", (event, d) => {
      handleNodeDoubleClick(d.idx);
      d3.select(event.currentTarget)
        .select("circle")
        .attr("stroke", selectedNodes.includes(d.idx) ? "red" : "black");
    });

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    };

    simulation.nodes(graph.nodes).on("tick", ticked);
  }, [nodes, links, selectedNodes]);

  return (
    <div
      ref={graphRef}
      className="flex h-full w-full items-center justify-center"
    >
      {/* 그래프 컨텐츠 */}
      <svg
        ref={svgRef}
        width={1212}
        height={830}
        className="h-full w-full"
      ></svg>
    </div>
  );
};

export default NoteGraph;
