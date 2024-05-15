import axios from "axios";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

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

interface GraphData {
  nodes: Node[];
  edges: Link[];
}

export const getGraphData = async (): Promise<GraphData | null> => {
  try {
    const response = await axios.get<GraphData>(`${BASE_URL}/notes/graph`);
    return response.data;
  } catch (error) {
    console.error("Fail getGraphData", error);
    return null;
  }
};

// 노트 연결
export const linkCreate = async (newLink: Link) => {
  try {
    const response = await axios.post<Link>(`${BASE_URL}/notes/link`, newLink);
    return response.data;
  } catch (error) {
    console.error("Fail linkCreate", error);
  }
};

// 링크 삭제
export const linkDelete = async (sourceNode: number, targetNode: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/notes/graph/${sourceNode}/${targetNode}`,
    );
    return response.data;
  } catch (error) {
    console.error("Fail linkeDelete", error);
  }
};
