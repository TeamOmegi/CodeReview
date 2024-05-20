import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

export const getCommentList = async (noteId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/notes/${noteId}/comments`);
    const data = response.data.response;
    //console.log("data", data);
    return data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// 댓글 작성
export const createComment = async (noteId: number, content: string) => {
  try {
    const response = await axiosInstance.post(`/notes/${noteId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

// 댓글 수정
export const updateComment = async (
  noteId: number,
  commentId: number,
  content: string,
) => {
  try {
    const response = await axiosInstance.put(
      `/notes/${noteId}/comments/${commentId}`,
      {
        content,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

// 댓글 삭제
export const deleteComment = async (noteId: number, commentId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/notes/${noteId}/comments/${commentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
