import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { getDiagram } from "../../api/projectAxios";
import useErrorStore from "../../store/useErrorStore";
// interface Node {
//   id: number;
//   serviceName: string;
//   img: string;
// }

// interface Link {
//   source: number;
//   target: number;
// }
interface Props {
  projectId: number;
}
const ErrorGraph = ({ projectId }: Props) => {
  const svgRef = useRef<any>();
  const pjtRef = useRef<any[]>([]);
  const [nodes, setNodes] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
  const { errorMap } = useErrorStore();

  const getDiagramData = async () => {
    if (projectId == -1) return;
    const diagramData = await getDiagram(projectId);
    setNodes([...diagramData.nodes]);
    setLinks([...diagramData.edges]);
  };
  useEffect(() => {
    getDiagramData();
  }, [projectId]);

  useEffect(() => {
    if (nodes.length != 0 && links.length != 0) {
      draw();
      errorCheck();
    } else {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
    }
  }, [nodes, errorMap]);

  const errorCheck = () => {
    const errorIdxArr = pjtRef.current.map((node, index) => {
      if (errorMap.has(parseInt(node.getAttribute("pjt")))) return index;
      else return -1;
    });

    errorIdxArr.map((idx) => {
      if (idx == -1) return;
      d3.select(pjtRef?.current[idx]).attr("fill", "#ff5050");
    });
  };

  const draw = () => {
    const width = 660;
    const height = 240;
    const radius = 25;
    const margin = 100;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width) // SVG의 너비 설정
      .attr("height", height); // SVG의 높이 설정

    // svg 오리는 코드
    svg
      .append("clipPath")
      .attr("id", "circleClip")
      .append("circle")
      .attr("r", radius);

    //svg에 정의하는 코드 (svg 내에서 사용가능한 기능 만들어놓는다 생각하면됨)
    var defs = svg.append("defs");

    //marker라는 화살표를 정의함
    var marker = defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5) // 화살표 끝 부분의 x 좌표
      .attr("refY", 5) // 화살표 끝 부분의 y 좌표
      .attr("markerWidth", 6) // 화살표 너비
      .attr("markerHeight", 6) // 화살표 높이
      .attr("orient", "auto");

    marker
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "black");

    const link = svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#arrowhead)"); //정의된거 사용하는 방법

    // 블러 필터
    var blurFilter = defs.append("filter").attr("id", "blur-filter");

    blurFilter
      .append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", 5);

    //쉐도우 필터
    var shadowFilter = defs
      .append("filter")
      .attr("id", "default-shadow")
      .attr("height", "130%");

    // 블러 생성
    shadowFilter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha") //그림자 (흑,백)
      .attr("stdDeviation", 25)
      .attr("result", "defaultBlur");

    // 흑백인 그림자에 색상넣기
    shadowFilter
      .append("feColorMatrix")
      .attr("in", "defaultBlur")
      .attr("type", "matrix")
      .attr("values", "1 0 0 0 0  0 1 0 1 0  1 0 1 0 0  1 0 0 1 0")
      .attr("result", "defaultBlurColor");

    //필터에 feOffset을 적용 (필터가 적용될 위치) .attr("dx" or "dy" 설정가능)
    shadowFilter
      .append("feOffset")
      .attr("in", "defaultBlurColor")
      .attr("result", "offsetBlur");

    var feMerge = shadowFilter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "defaultOffsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //노드생성
    const node = svg
      .selectAll("g")
      .data(nodes)
      .join("g")
      .each(function (d: any) {
        d3.select(this).selectAll("circle").remove();
        d3.select(this).selectAll("image").remove(); // 기존 이미지 삭제
        d3.select(this).selectAll("text").remove(); // 기존 텍스트 삭제

        d3.select(this)
          .append("circle")
          .attr("r", radius + 12)
          .attr("pjt", `${d.serviceId}`)
          .attr("fill", "#6699ff")
          .attr("class", "blur-circle")
          .style("filter", "url(#blur-filter)")
          .style("opacity", 0.4);
        //.style("filter", "url(#default-shadow)");

        d3.select(this)
          .append("circle")
          .attr("r", radius + 1)
          .attr("pjt", `${d.serviceId}`)
          .attr("fill", "white");

        d3.select(this)
          .append("image")
          .attr("xlink:href", `${d.serviceImageUrl}`)
          .attr("clip-path", "url(#circleClip)") //이미지 오리기 (위에 정의해놓음)
          .attr("width", 2 * radius) // 이미지의 크기
          .attr("height", 2 * radius) // 이미지의 크기
          .attr("x", -radius)
          .attr("y", -radius);

        d3.select(this)
          .append("text")
          .text((d: any) => d.serviceName)
          .attr("x", -25)
          .attr("y", +50)
          .style("font-size", "12px") // 폰트 크기 설정
          .style("font-weight", "bold");
      });

    const ticked = () => {
      link
        .attr("x1", (d: any) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetX = dx * (radius / (length == 0 ? 1 : length));
          return d.source.x + offsetX;
        })
        .attr("y1", (d: any) => {
          {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const offsetY = dy * (radius / (length == 0 ? 1 : length));
            return d.source.y + offsetY;
          }
        })
        .attr("x2", (d: any) => {
          // 시작점이 노드의 중심에 연결되도록 조정
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetX = dx * ((radius + 7) / (length == 0 ? 1 : length));
          return d.target.x - offsetX;
        })
        .attr("y2", (d: any) => {
          // 시작점이 노드의 중심에 연결되도록 조정
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetY = dy * ((radius + 7) / (length == 0 ? 1 : length));
          return d.target.y - offsetY;
        });
      node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)
        .attr(
          "cx",
          (d: any) => (d.x = Math.max(radius, Math.min(width - radius, d.x!))),
        )
        .attr(
          "cy",
          (d: any) => (d.y = Math.max(radius, Math.min(height - radius, d.y!))),
        );
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.serviceId),
      )
      .force("charge", d3.forceManyBody().strength(-5000))
      .force("center", d3.forceCenter(width / 2, height / 2 + 30))
      .force(
        "x",
        d3.forceX().x((d) => Math.max(margin, Math.min(width - radius, d.x!))),
      )
      .force(
        "y",
        d3.forceY().y((d) => Math.max(margin, Math.min(height - radius, d.y!))),
      )
      .force("x", d3.forceX(width).strength(0.1)) // x축 위치 제한
      .force("y", d3.forceY(height).strength(0.1)) // y축 위치 제한
      .on("tick", ticked);

    const dragstarted = (event: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    };

    const dragged = (event: any) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    };

    const dragended = (event: any) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    node.call(
      (d3.drag() as any)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended),
    );

    const arr = svgRef?.current?.querySelectorAll("g circle.blur-circle");
    pjtRef.current = [...arr];
  };

  return (
    <div className="flex h-full w-full">
      <svg ref={svgRef} className="h-full w-full" />
    </div>
  );
};

export default ErrorGraph;
