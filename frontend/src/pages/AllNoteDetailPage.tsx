import React, { useState, useEffect } from "react";

interface User {
  profileImageUrl: string;
  username: string;
}

interface ErrorInfo {
  errorId: number;
  errorType: string;
  summary: string;
  solved: boolean;
}

interface NoteDetail {
  user: User;
  noteId: number;
  title: string;
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo;
}

interface Props {
  noteId: number;
}

const AllNoteDetailPage = ({ noteId }: Props) => {
  const [note, setNote] = useState<NoteDetail | null>(null);

  const sampleNote: NoteDetail = {
    user: {
      profileImageUrl: "이미지 url",
      username: "사용자1",
    },
    noteId: 1,
    title: "손민기는 보아라",
    content: "손민기 고해림 화이팅 오메기떡 화이팅 ~~~",
    type: "ERROR",
    backlinkCount: 3,
    createdAt: "2024-05-05",
    error: {
      errorId: 2,
      errorType: "NullPointException",
      summary: "에러 요약",
      solved: true,
    },
  };

  useEffect(() => {
    const getNoteDetail = async () => {
      try {
        const response = await fetch(`백엔드API주소/${noteId}`);
        const data = await response.json();
        setNote(data.result);
      } catch (error) {
        console.error(
          "노트 상세 정보를 불러오는 중 오류가 발생했습니다:",
          error,
        );
      }
    };
    getNoteDetail();
  }, [noteId]);

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col rounded-xl p-10 text-black">
        <div className="flex h-[20%] w-full flex-col  border-b-2 ">
          <div className="ml-2 mt-10 flex items-center justify-start text-3xl font-bold">
            <h2>{note ? note.title : sampleNote.title}</h2>
          </div>
          <div className="text-md mr-5 box-border flex justify-end p-2">
            <p className="mr-5">
              {note ? note.user.username : sampleNote.user.username}
            </p>
            <p className="mr-2">
              {note ? note.createdAt : sampleNote.createdAt}
            </p>
          </div>
        </div>
        <hr />
        <div className="box-border flex h-auto w-full flex-col border-b p-7">
          <p>{note ? note.content : sampleNote.content}</p>
          <br />
          <div>
            {note && note.type === "ERROR" ? (
              <>
                <p>에러 요약: {note.error.summary}</p>
                <p>
                  해결 여부: {note.error.solved ? "해결됨" : "해결되지 않음"}
                </p>
              </>
            ) : (
              <p>에러가 없습니다.</p>
            )}
          </div>
        </div>
        <hr />
        <div className="box-border flex h-auto w-full p-3">
          <img
            src="/public/icons/BacklinkIcon.png"
            alt="백링크"
            className="h-5 w-5"
          />
          <p className="ml-1 text-base">
            {note ? note.backlinkCount : sampleNote.backlinkCount}개
          </p>
        </div>
        <div className="box-border flex h-auto w-full bg-orange-100 p-5">
          댓글
        </div>
      </div>
    </div>
  );
};

export default AllNoteDetailPage;
