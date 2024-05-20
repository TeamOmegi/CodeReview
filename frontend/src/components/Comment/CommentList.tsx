import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateComment, deleteComment } from "../../api/commentAxios";

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
  commentList: Comment[];
  currentUserId: number;
}

const CommentList = ({ commentList, currentUserId }: Props) => {
  const noteId = parseInt(useParams().noteId || "-1");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setComments([...commentList]);
  }, [commentList]);

  // 댓글 수정
  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await updateComment(noteId, commentId, content);
      // getComments();
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(noteId, commentId);
      // 댓글 삭제 후 댓글 목록 다시 불러오기
      // 여기서는 API 호출을 통해 새로운 댓글 목록을 가져올 수 있습니다.
      // getComments();
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.commentId} className="m-1 box-border border-b-2 p-2">
            <div className="flex flex-col">
              <div className="flex">
                <img
                  src={
                    comment.writer.profileImageUrl ||
                    "/icons/ProfileDefault.png"
                  }
                  alt="Profile"
                  className="mr-1 h-5 w-5 rounded-full"
                />
                <span>{comment.writer.username}</span>
              </div>
              <p>{comment.content}</p>
              {currentUserId === comment.writer.userId && (
                <div>
                  {/* 수정 버튼 */}
                  <button
                    onClick={() =>
                      handleUpdateComment(comment.commentId, "새로운 내용")
                    }
                  >
                    수정
                  </button>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
