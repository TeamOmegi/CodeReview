import React, { useState } from "react";
import { useQuestion } from "../../../hooks/useComfirm";
import { linkCreate } from "../../../api/noteGraphAxios";

interface Node {
  idx: number;
  type: string;
}

interface Link {
  source: number;
  target: number;
}

const NoteLink = ({
  nodes,
  links,
  setLinks,
}: {
  nodes: Node[];
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}) => {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

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

  return <div>{/* 여기에 노트 연결 관련 UI 및 로직 추가 */}</div>;
};

export default NoteLink;
