<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isClick, setIsClick] = useState<string>("대시보드");
  const navigate = useNavigate();
  const btnClick =
    "my-2 flex h-16 w-4/5 items-center justify-center rounded-xl bg-primary-400 hover:cursor-pointer";
  const btnNoClick =
    "my-2 flex h-16 w-4/5 items-center justify-center rounded-xl bg-base text-white hover:cursor-pointer";

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

  return (
    <div className="flex h-full w-1/6 flex-col bg-slate-500">
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
      <div className="h-1/6"> 로그인 </div>
    </div>
  );
};

export default NavBar;
=======

const NavBar = () => {

}

export default NavBar;
>>>>>>> 151d930a092ccb6bb0d38d5747b39dc7c95d044c
