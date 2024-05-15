import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { createComment, getCommentList } from "../../api/commentAxios";
import CommentForm from "./CommentForm";

interface Comment {
  commentId: number;
  content: string;
  writer: {
    profileImageUrl: string;
    userId: number;
    username: string;
  };
}

interface Props {
  noteId: number;
  currentUserId: number;
}

const CommentContainer = ({ noteId, currentUserId }: Props) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const handleCommentSubmit = async (content: string) => {
    try {
      await createComment(noteId, content);
      getComments();
      // setCommentList([...commentList]); // 로그인 연결할 때 최적화하기~! 🚨
      console.log("댓글 작성:", content);
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
    }
  };
  const getComments = async () => {
    try {
      const response = await getCommentList(noteId);
      setCommentList([...response]);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="h-full">
      <div className="mx-1 flex w-[95%]">
        <h2 className="mr-1 text-lg font-bold">댓글</h2>
        <img
          src="/icons/CommentListIcon.png"
          alt="comment"
          className="m-1 h-5 w-5"
        />
      </div>
      <div className="mx-1 my-1 mb-3 p-1">
        <CommentList commentList={commentList} currentUserId={currentUserId} />
      </div>
      <div className="h-24">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default CommentContainer;
