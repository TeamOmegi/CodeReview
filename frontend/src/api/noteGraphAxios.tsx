import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

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

interface GraphData {
  nodes: Node[];
  edges: Link[];
}

export const getGraphData = async (): Promise<{
  nodes: Node[];
  links: Link[];
} | null> => {
  try {
    const response = await axiosInstance.get<GraphData>(`/notes/graph`);
    const Nodes: Node[] = response.data.response.nodes.map(
      (node: {
        nodeId: number;
        index: number;
        value: string;
        type: string;
      }) => {
        return {
          nodeId: node.nodeId,
          idx: node.index,
          value: node.value,
          type: node.type,
        };
      },
    );
    const Links: Link[] = response.data.response.edges.map(
      (edge: { sourceIndex: number; targetIndex: number }) => {
        return {
          source: edge.sourceIndex,
          target: edge.targetIndex,
        };
      },
    );
    return {
      nodes: Nodes,
      links: Links,
    };
  } catch (error) {
    console.error("Failed to get graph data", error);
    return null;
  }
};

// 노트 연결
export const linkCreate = async (noteId: number, targetNoteId: number) => {
  console.log("연결할 targetNoteId", targetNoteId);
  try {
    const response = await axiosInstance.post(`/notes/link`, {
      noteId: noteId,
      targetNoteId: targetNoteId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Fail linkCreate", error);
  }
};

// 링크 삭제
export const linkDelete = async (noteId: number, targetNoteId: number) => {
  try {
    const response = await axiosInstance.delete(`/notes/link`, {
      data: {
        noteId: noteId,
        targetNoteId: targetNoteId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fail linkDelete", error);
  }
};

// 링크 연결확인
export const linkCheck = async (sourceNode: number, targetNode: number) => {
  try {
    const response = await axiosInstance.get(`/notes/link`, {
      params: {
        noteId: sourceNode,
        targetNoteId: targetNode,
      },
    });
    return response.data.response.linked;
  } catch (error) {
    console.error("Fail linkeDelete", error);
  }
};
