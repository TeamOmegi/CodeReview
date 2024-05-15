import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
interface Node {
  id: string;
  imgLink: string;
}

interface Link {
  source: string;
  target: string;
}

const ErrorGraph = () => {
  const svgRef = useRef<any>();
  const pjtRef = useRef<any[]>([]);
  const [serviceName, setServiceName] = useState<string>("");

  const [nodes, setNodes] = useState<any>([
    {
      id: "해림",
      imgLink: "/진짜루돌프.png",
    },
    {
      id: "화석",
      imgLink: "/진짜루돌프.png",
    },
    {
      id: "제훈",
      imgLink: "/진짜루돌프.png",
    },
    {
      id: "아영",
      imgLink: "/진짜루돌프.png",
    },
    {
      id: "도하",
      imgLink: "/진짜루돌프.png",
    },
    {
      id: "컨설턴트님",
      imgLink: "/진짜산타.png",
    },
    {
      id: "민기",
      imgLink: "/진짜루돌프.png",
    },
  ]);
  const [links, setLinks] = useState<any>([
    {
      source: "해림",
      target: "화석",
    },
    {
      source: "화석",
      target: "아영",
    },
    {
      source: "제훈",
      target: "도하",
    },

    {
      source: "도하",
      target: "화석",
    },
    {
      source: "도하",
      target: "아영",
    },
    {
      source: "컨설턴트님",
      target: "해림",
    },
    {
      source: "컨설턴트님",
      target: "민기",
    },
    {
      source: "민기",
      target: "아영",
    },
  ]);

  useEffect(() => {
    console.log("리렌더링");
    draw();
  }, [nodes]);
  const draw = () => {
    const width = 1000;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width) // SVG의 너비 설정
      .attr("height", height); // SVG의 높이 설정

    // svg 오리는 코드
    svg
      .append("clipPath")
      .attr("id", "circleClip")
      .append("circle")
      .attr("r", 60);

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
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)"); //정의된거 사용하는 방법

    //filter(blur같은)를 정의함
    var filter = defs
      .append("filter")
      .attr("id", "default-shadow")
      .attr("height", "130%");

    // 블러 생성
    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha") //그림자 (흑,백)
      .attr("stdDeviation", 5)
      .attr("result", "defaultBlur");

    // 흑백인 그림자에 색상넣기
    filter
      .append("feColorMatrix")
      .attr("in", "defaultBlur")
      .attr("type", "matrix")
      .attr("values", "1 0 0 0 0  0 1 0 1 0  1 0 1 0 0  1 0 0 1 0")
      .attr("result", "defaultBlurColor");

    //필터에 feOffset을 적용 (필터가 적용될 위치) .attr("dx" or "dy" 설정가능)
    filter
      .append("feOffset")
      .attr("in", "defaultBlurColor")
      .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "defaultOffsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // 에러블러 정의하기
    var errorfilter = defs
      .append("filter")
      .attr("id", "error-shadow")
      .attr("height", "130%");

    // 블러 생성
    errorfilter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 10)
      .attr("result", "errorBlur");

    // 다른 색상의 색상 변환
    errorfilter
      .append("feColorMatrix")
      .attr("in", "errorBlur")
      .attr("type", "matrix")
      .attr("values", "1 1 1 1 1  1 0 0 0 0  0 0 1 0 0  0 0 0 1 0") // 색상 변환 값
      .attr("result", "errorBlurColor");

    // 필터에 feOffset을 적용 (필터가 적용될 위치)
    errorfilter
      .append("feOffset")
      .attr("in", "errorBlurColor")
      .attr("result", "errorOffsetBlur");

    // 필터들을 결합하는 feMerge 생성
    var feMerge2 = errorfilter.append("feMerge");

    // 필터에 연결할 노드 추가
    feMerge2.append("feMergeNode").attr("in", "errorOffsetBlur");
    feMerge2.append("feMergeNode").attr("in", "SourceGraphic");
    /////

    //노드생성
    const node = svg
      .selectAll("g")
      .data(nodes)
      .join("g")
      .each(function (d: any) {
        d3.select(this).selectAll("image").remove(); // 기존 이미지 삭제
        d3.select(this).selectAll("text").remove(); // 기존 텍스트 삭제
        d3.select(this)
          .append("image")
          .attr("xlink:href", d.imgLink)
          .attr("clip-path", "url(#circleClip)") //이미지 오리기 (위에 정의해놓음)
          .attr("width", 100) // 이미지의 크기
          .attr("height", 100) // 이미지의 크기
          .attr("x", -45)
          .attr("y", -50)
          .attr("pjt", `${d.id}`)
          .style("filter", "url(#default-shadow)")
          .on("click", function () {
            d3.select(this).style("filter", "url(#default-shadow)"); // 이미 적용된 스타일 제거
          });
        d3.select(this)
          .append("text")
          .text((d: any) => d.id)
          .attr("x", -25)
          .attr("y", (d: any) => {
            if (d.id == "컨설턴트님") return -25;
            return -5;
          });
      });

    const ticked = () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => {
          // 시작점이 노드의 중심에 연결되도록 조정
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (dx / length) * 60;
          return d.target.x - offsetX;
        })
        .attr("y2", (d: any) => {
          // 시작점이 노드의 중심에 연결되도록 조정
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetY = (dy / length) * 60;
          return d.target.y - offsetY;
        });
      node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force("charge", d3.forceManyBody().strength(-3000))
      .force("center", d3.forceCenter(width / 2, height / 2))
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
    console.log(svgRef.current);
    const arr = svgRef?.current?.querySelectorAll("g image");
    pjtRef.current = [...arr];

    console.log(pjtRef.current);
  };
  const enterEvent = (e: React.KeyboardEvent): void => {
    if (e.key == "Enter") {
      submit();
      setServiceName("");
    }
  };

  const submit = () => {
    const idx = pjtRef.current.findIndex((node) => {
      return node.getAttribute("pjt") === serviceName;
    });

    d3.select(pjtRef?.current[idx]).style("filter", "url(#error-shadow)");
  };
  return (
    <div className="flex">
      <svg ref={svgRef} />
      <div className="flex flex-col justify-center bg-red-100">
        <div className="text-xl font-extrabold">
          "input에 입력한 루돌프에서 에러가 발생!!"
        </div>
        <input
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          onKeyUp={(e) => {
            enterEvent(e);
          }}
        />
        <div className="rounded-lg bg-blue-500" onClick={submit}>
          버튼!!!
        </div>
      </div>
    </div>
  );
};

export default ErrorGraph;
