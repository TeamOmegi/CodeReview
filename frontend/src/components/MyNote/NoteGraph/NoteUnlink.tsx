import React from "react";
import { useQuestion } from "../../../hooks/useComfirm";
import { useError2 } from "../../../hooks/useAlert";
import { linkDelete } from "../../../api/noteGraphAxios";

interface Link {
  source: number;
  target: number;
}

interface Node {
  nodeId: number;
  type: string;
}

const NoteUnlink = ({
  link,
  graph,
  setLinks,
  setNodes,
}: {
  link: Link;
  graph: { nodes: Node[]; links: Link[] };
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) => {
  const handleLinkClick = async (event: MouseEvent, d: Link) => {
    // 연결 끊기 작업 수행
    console.log(d);
    console.log("링크 클릭:", d.source, "->", d.target);
    // source와 target 노드의 idx를 가져옵니다.
    const sourceNode = graph.nodes.find((node) => node.nodeId === d.source);
    const targetNode = graph.nodes.find((node) => node.nodeId === d.target);
    console.log("sourceNode:", sourceNode);
    console.log("targetNode:", targetNode);

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
        // linkDelete 함수를 사용하여 선택된 링크의 연결을 끊습니다.
        await linkDelete(sourceNode!.nodeId, targetNode!.nodeId);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedLinks = graph.links.filter(
          (link) => !(link.source === d.source && link.target === d.target),
        );
        setLinks(updatedLinks);

        // 연결을 끊은 후에 로컬 상태를 업데이트합니다.
        const updatedNodes = graph.nodes.filter(
          (node) =>
            node.nodeId !== sourceNode!.nodeId &&
            node.nodeId !== targetNode!.nodeId,
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

  return (
    <div>
      <button onClick={(event) => handleLinkClick(event, link)}>
        노트 연결 해제
      </button>
    </div>
  );
};

export default NoteUnlink;
