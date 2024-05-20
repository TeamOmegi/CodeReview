import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWarnning2 } from "../../hooks/useComfirm";
import useEditorStore from "../../store/useEditorStore";
import useErrorStore from "../../store/useErrorStore";
import axiosInstance from "../../api/axiosInstance";
import Cookies from "js-cookie";
import { fetchUserProfile } from "../../api/userAxios";

const NavBar = () => {
  const [isClick, setIsClick] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { showNote, noteType, setShowNote, setNoteType } = useEditorStore();
  const { isNewError } = useErrorStore();
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const btnClick =
    "flex h-12 w-full items-center justify-start rounded-xl text-main-100 font-bold bg-gradient-to-r from-secondary-500 via-primary-500 to-primary-400 hover:cursor-pointer shadow shadow-primary-300 transition duration-100";
  const btnNoClick =
    "flex h-12 w-full items-center justify-start rounded-xl text-primary-100 hover:border border-primary-400 hover:cursor-pointer";

  const handleDashBoardClick = () => {
    setIsClick("/omegi");
    navigate("/omegi");
  };

  const handleMyNoteClick = () => {
    setIsClick("/omegi/myNote");
    navigate("/omegi/myNote");
  };

  const handleAllNoteClick = () => {
    setIsClick("/omegi/allNote");
    navigate("/omegi/allNote");
  };

  const handleErrorClick = () => {
    setIsClick("/omegi/error");
    navigate("/omegi/error");
  };

  const handleSettingClick = () => {
    setIsClick("/omegi/setting");
    navigate("/omegi/setting");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/users/logout");
      Cookies.remove("access");
      Cookies.remove("refresh");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const hadleNoteClick = async () => {
    if (noteType === "edit") {
      const result = await useWarnning2({
        title: "새 노트를 작성하시겠습니까?",
        fireText: "이전 변경사항은 저장되지 않습니다.",
      });
      if (result) return setNoteType("create");
      else return;
    } else if (noteType === "link") return setNoteType("create");
    setShowNote();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await fetchUserProfile();
        setProfileName(user.username);
        setProfileImage(user.profileImageUrl);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // 에러 발생 시 프로필 정보를 초기화하거나 기본값으로 설정할 수 있습니다.
        navigate("/login");
        setProfileName("");
        setProfileImage("");
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    setIsClick(location.pathname);
  }, []);

  useEffect(() => {
    if (noteType === "link") {
      if (
        !/^\/omegi\/myNote\/\d+$/.test(location.pathname) &&
        !/^\/omegi\/allNote\/\d+$/.test(location.pathname)
      ) {
        if (showNote) setShowNote();
        setTimeout(() => {
          setNoteType("create");
        }, 750);
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full select-none flex-col bg-main-100">
        <div className="h-1/6 w-full ">
          <div className="mt-10 flex h-full w-full items-end justify-center bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text font-PyeongChang text-[40px] font-extrabold text-transparent">
            <div>OMEGI</div>
          </div>
        </div>
        <div className="m-3 mt-28 flex h-4/6 flex-col items-center pl-1 text-base">
          <div
            className={isClick === "/omegi" ? btnClick : btnNoClick}
            onClick={handleDashBoardClick}
          >
            <div className="relative ml-5  flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Dashboard_Icon"
                src={
                  isClick === "/omegi"
                    ? "/icons/DashboardIcon_b.png"
                    : "/icons/DashboardIcon.png"
                }
              />
              <span>대시보드</span>
              {isNewError && (
                <span className="absolute  right-[-18px] top-[-2px] flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                </span>
              )}
            </div>
          </div>
          <div
            className={
              isClick === "/omegi/myNote" ||
              /^\/omegi\/myNote\/\d+$/.test(isClick)
                ? btnClick
                : btnNoClick
            }
            onClick={handleMyNoteClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Mynote_Icon"
                src={
                  isClick === "/omegi/myNote" ||
                  /^\/omegi\/myNote\/\d+$/.test(isClick)
                    ? "/icons/MynoteIcon_b.png"
                    : "/icons/MynoteIcon.png"
                }
              />
              <span>내 노트</span>
            </div>
          </div>
          <div
            className={
              isClick === "/omegi/allNote" ||
              /^\/omegi\/allNote\/\d+$/.test(isClick)
                ? btnClick
                : btnNoClick
            }
            onClick={handleAllNoteClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Allnote_Icon"
                src={
                  isClick === "/omegi/allNote" ||
                  /^\/omegi\/allNote\/\d+$/.test(isClick)
                    ? "/icons/AllnoteIcon_b.png"
                    : "/icons/AllnoteIcon.png"
                }
              />
              <span>모아보기</span>
            </div>
          </div>
          <div
            className={isClick === "/omegi/error" ? btnClick : btnNoClick}
            onClick={handleErrorClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Error_Icon"
                src={
                  isClick === "/omegi/error"
                    ? "/icons/ErrorIcon_b.png"
                    : "/icons/ErrorIcon.png"
                }
              />
              <span>에러목록</span>
            </div>
          </div>
          <div
            className={isClick === "/omegi/setting" ? btnClick : btnNoClick}
            onClick={handleSettingClick}
          >
            <div className="ml-5 flex items-center justify-center">
              <img
                className="mr-4 h-5 w-5"
                alt="Setting_Icon"
                src={
                  isClick === "/omegi/setting"
                    ? "/icons/SettingIcon_b.png"
                    : "/icons/SettingIcon.png"
                }
              />
              <span>설정</span>
            </div>
          </div>
        </div>
        <div className="h-1/6 w-full">
          <div className="flex h-1/3 w-full justify-end ">
            <img
              className={`mr-2 h-7 w-7 hover:cursor-pointer ${location.pathname === "/omegi" || location.pathname === "/omegi/setting" ? "hidden" : ""}`}
              alt="Pencil_Icon"
              src={
                isHovered ? "/icons/PencilHover.png" : "/icons/PencilIcon.png"
              }
              onClick={hadleNoteClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <div className="ml-5 flex h-2/3 w-full items-center justify-center pb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full">
              {profileImage ? (
                <img
                  className="h-9 w-9 rounded-full"
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                <img
                  className="h-9 w-9"
                  src={"/icons/ProfileDefault.png"}
                  alt="Profile"
                />
              )}
            </div>

            <div className="ml-3 flex-1">{profileName}</div>
            <div className="mr-5 flex justify-end">
              <img
                className="h-8 w-8 hover:cursor-pointer"
                alt="Signout_Icon"
                src="/icons/SignoutIcon.png"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
