import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../../store/useEditorStore";

const NavBar = () => {
  const [isClick, setIsClick] = useState<string>("대시보드");
  const navigate = useNavigate();
  const { setShowNote } = useEditorStore();
  const [isHovered, setIsHovered] = useState(false);

  const btnClick =
    "flex h-12 w-full items-center justify-start rounded-xl text-main-100 font-bold bg-gradient-to-r from-secondary-500 via-primary-500 to-primary-400 hover:cursor-pointer shadow shadow-primary-300 transition duration-100";
  const btnNoClick =
    "flex h-12 w-full items-center justify-start rounded-xl text-primary-100 hover:border border-primary-400 hover:cursor-pointer";

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
    <div className="flex h-full w-full">
      <div className="flex h-full w-full select-none flex-col bg-main-100">
        <div className="flex h-1/6 items-center justify-center">
          <div className=" mt-10 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-4xl font-extrabold text-transparent">
            Omegi
          </div>
        </div>
        <div className="m-3 mt-28 flex h-4/6 flex-col items-center pl-1 text-base">
          <div
            className={isClick === "대시보드" ? btnClick : btnNoClick}
            onClick={handleDashBoardClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Dashboard_Icon"
                src={
                  isClick === "대시보드"
                    ? "/icons/DashboardIcon_b.png"
                    : "/icons/DashboardIcon.png"
                }
              />
              <span>대시보드</span>
            </div>
          </div>
          <div
            className={isClick === "내노트" ? btnClick : btnNoClick}
            onClick={handleMyNoteClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Mynote_Icon"
                src={
                  isClick === "내노트"
                    ? "/icons/MynoteIcon_b.png"
                    : "/icons/MynoteIcon.png"
                }
              />
              <span>내 노트</span>
            </div>
          </div>
          <div
            className={isClick === "모아보기" ? btnClick : btnNoClick}
            onClick={handleAllNoteClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Allnote_Icon"
                src={
                  isClick === "모아보기"
                    ? "/icons/AllnoteIcon_b.png"
                    : "/icons/AllnoteIcon.png"
                }
              />
              <span>모아보기</span>
            </div>
          </div>
          <div
            className={isClick === "에러목록" ? btnClick : btnNoClick}
            onClick={handleErrorClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Error_Icon"
                src={
                  isClick === "에러목록"
                    ? "/icons/ErrorIcon_b.png"
                    : "/icons/ErrorIcon.png"
                }
              />
              <span>에러목록</span>
            </div>
          </div>
          <div
            className={isClick === "설정" ? btnClick : btnNoClick}
            onClick={handleSettingClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Setting_Icon"
                src={
                  isClick === "설정"
                    ? "/icons/SettingIcon_b.png"
                    : "/icons/SettingIcon.png"
                }
              />
              <span>설정</span>
            </div>
          </div>
        </div>
        <div className="h-1/6 w-full">
          <div
            className="flex h-1/3 w-full justify-end hover:cursor-pointer"
            onClick={hadleNoteClick}
          >
            <img
              className="mr-2 h-7 w-7 "
              alt="Setting_Icon"
              src={
                isHovered ? "/icons/PencilHover.png" : "/icons/PencilIcon.png"
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <div className="ml-3 flex h-2/3 w-full items-center justify-center pb-3">
            <div className="mr-1 flex h-11 w-11 items-center justify-center rounded-full bg-slate-300">
              <img
                className="h-9 w-9"
                src={"/icons/ProfileDefault.png"}
                alt="Profile"
              />
            </div>

            {/* <div className="flex-1">{profileName}</div> */}
            <div className="ml-3 flex-1">도하이사용자</div>
            <div className="mr-2 flex justify-end">
              <img
                className="h-8 w-8 hover:cursor-pointer"
                alt="Signout_Icon"
                src="/icons/SignoutIcon.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
