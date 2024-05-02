import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../../store/useEditorStore";

const NavBar = () => {
  const [isClick, setIsClick] = useState<string>("대시보드");
  const navigate = useNavigate();
  const { setShowNote } = useEditorStore();

  const btnClick =
    "my-2 flex h-16 w-4/5 items-center justify-center rounded-xl bg-primary-400 hover:cursor-pointer";
  const btnNoClick =
    "my-2 flex h-16 w-4/5 items-center justify-center rounded-xl bg-main-100 text-white hover:cursor-pointer";

  const handleDashBoardClick = () => {
    setIsClick("대시보드");
    navigate("/omegi");
  };

  const handleMyNoteClick = () => {
    setIsClick("내노트");
    navigate("/omegi/myNote");
  };

  const handleAllNoteClick = () => {
    setIsClick("모아보기");
    navigate("/omegi/allNote");
  };

  const handleErrorClick = () => {
    setIsClick("에러목록");
    navigate("/omegi/error");
  };

  const handleSettingClick = () => {
    setIsClick("설정");
    navigate("/omegi/setting");
  };

  const hadleNoteClick = () => {
    setShowNote();
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-500">
      <div className="flex h-1/6 items-center justify-center">
        <div className="text-4xl font-extrabold">Omegi</div>
      </div>
      <div className="flex h-4/6 flex-col items-center">
        <div
          className={isClick === "대시보드" ? btnClick : btnNoClick}
          onClick={handleDashBoardClick}
        >
          <div>대시보드</div>
        </div>
        <div
          className={isClick === "내노트" ? btnClick : btnNoClick}
          onClick={handleMyNoteClick}
        >
          <div>내노트</div>
        </div>
        <div
          className={isClick === "모아보기" ? btnClick : btnNoClick}
          onClick={handleAllNoteClick}
        >
          <div>모아보기</div>
        </div>
        <div
          className={isClick === "에러목록" ? btnClick : btnNoClick}
          onClick={handleErrorClick}
        >
          <div>에러목록</div>
        </div>
        <div
          className={isClick === "설정" ? btnClick : btnNoClick}
          onClick={handleSettingClick}
        >
          <div>설정</div>
        </div>
      </div>
      <div className="h-1/6 w-full">
        <div
          className="h-1/3 w-full hover:cursor-pointer"
          onClick={hadleNoteClick}
        >
          노트 버튼
        </div>
        <div className="h-2/3 w-full">로그인</div>
      </div>
    </div>
  );
};

export default NavBar;
