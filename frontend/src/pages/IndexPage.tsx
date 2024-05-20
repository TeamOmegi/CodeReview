import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const GITHUB_LOGIN_URL =
  "https://k10a308.p.ssafy.io/api/oauth2/authorization/github";

const IndexPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 상태 확인
    const checkLogin = () => {
      const accessToken = Cookies.get("access");
      if (accessToken) {
        navigate("/omegi"); // access 토큰이 존재하면 메인 페이지로 이동
      }
    };

    checkLogin();
  }, [navigate]);

  const handleLoginClick = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  const handleSourceCodeClick = () => {
    window.open("https://lab.ssafy.com/s10-final/S10P31A308", "_blank");
  };

  return (
    <main className="snap max-h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-[#000000] via-[#130F40] to-[#000000] bg-300%"></div>
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-center">
        <img
          className="h-15 w-15 mb-7 flex aspect-square h-36 items-center justify-center"
          alt="Dropdown_Icon"
          src="/icons/OmegiLogo.png"
        />
        <div className="mb-5 h-fit w-fit bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text pb-[4%] text-8xl font-extrabold text-transparent ">
          Omegi
        </div>
        <div className="mb-[4%] flex h-fit w-fit flex-col items-center">
          <div className="inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text pb-[1%] text-3xl font-medium text-transparent">
            Omegi는 Opentelemetry Instrumentation을 이용한 에러 로그 자동 분산
            추적 시스템입니다
          </div>
          <div className="inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-3xl font-medium text-transparent">
            실시간으로 에러를 확인하고 에러 노트를 작성해보세요!
          </div>
        </div>
        <button
          onClick={handleLoginClick}
          className="box-border flex h-fit w-fit items-center justify-center rounded-lg border-[1px] border-[#B9B8EE] bg-[#000] px-4 py-2"
        >
          <img
            className="mr-5 flex aspect-square h-10 items-center justify-center"
            alt="Dropdown_Icon"
            src="/icons/GithubMark.svg"
          />
          <div className="flex h-fit w-fit items-center justify-center text-lg text-gray-300">
            Github로 로그인하기
          </div>
        </button>
      </section>
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-between px-[10%] py-[5%]">
        <div className="mb-[3%] h-fit w-fit bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text pb-5 text-4xl font-extrabold text-transparent">
          오류 추적 + 오류 노트를 하나의 서비스로
        </div>
        <div className="mb-[2%] flex flex-col items-center">
          <div className="mb-2 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-2xl font-medium text-transparent">
            오메기는 연결된 프로젝트의 실시간 에러 알림을 제공하며, 즉시 노트를
            작성하여 사용자의 기록을 남길 수 있습니다.
          </div>
          <div className="inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-2xl font-medium text-transparent">
            노트를 public으로 전환해 다른 사용자와 인사이트를 공유해보세요!
          </div>
        </div>
        <img
          className="mr-5 mt-7 flex h-[5%] w-auto flex-grow items-center justify-center rounded-2xl shadow-md"
          alt="Service Gif"
          src="/icons/TempRecord.gif"
        />
      </section>
      <section className="relative mt-10 flex h-screen w-full snap-start flex-col items-center justify-start px-[10%] py-[6%]">
        <div className="mb-[8%] flex h-[25%] w-full items-center justify-between">
          <div className="flex h-fit w-full flex-col items-start justify-center">
            <div className="mb-[1%] h-fit w-fit bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text pb-5 text-4xl font-extrabold text-transparent">
              OpenSource Project
            </div>
            <div className="flex flex-col items-start pb-[2%]">
              <div className="mb-2 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-[23px] font-medium text-transparent">
                omegi opentelemetry instrumentation은 오픈소스로 제공되고
                있습니다.
              </div>
              <div className="mb-2 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-[23px] font-medium text-transparent">
                Gitlab에서 설치 및 사용 방법을 확인하세요. 에이전트는 사용자가
                정의할 수 있는 유연한 옵션을 제공합니다.
              </div>
              <div className="inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-[23px] font-medium text-transparent">
                개발자는 오메기의 오픈소스를 자유롭게 사용하고 확장할 수
                있습니다
              </div>
            </div>
          </div>
          <div
            className=" box-border flex aspect-square h-full flex-col items-center justify-center rounded-2xl bg-white/25 p-5 text-black shadow-md hover:cursor-pointer"
            onClick={handleSourceCodeClick}
          >
            <img
              className="flex aspect-square h-full items-center justify-center"
              alt="GitLab Logo"
              src="/icons/GitLabLogo.svg"
            />
          </div>
        </div>
        <div className="flex h-[45%] w-full flex-col">
          <div className=" mb-[1%] h-fit w-fit bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text pb-5 text-4xl font-extrabold text-transparent">
            Supported Agent Language
          </div>
          <div className="flex h-full w-full">
            <div className="mr-9 flex aspect-square h-full flex-col align-middle">
              <div className="mb-2 ml-2 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-2xl font-medium text-transparent">
                Java
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white/25 shadow-md">
                <img
                  className="my-8 flex h-[40%] items-center justify-center rounded-2xl"
                  alt="Java Logo"
                  src="/icons/JavaLogo.svg"
                />
                <div className="mb-3 flex h-fit w-fit flex-col justify-center align-middle text-2xl font-bold text-[#c9cbe7]">
                  Java 사용 설명서
                </div>
                <a
                  href="https://lab.ssafy.com/s10-final/S10P31A308/-/tree/develop-ins/omegi-opentelemetry-instrumentation/omegi-instrumentation-java?ref_type=heads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 h-fit w-fit rounded-lg bg-white/50 px-5 py-2 text-lg font-medium text-[#171821] shadow-md"
                >
                  바로가기 ⏎
                </a>
              </div>
            </div>
            <div className="mr-[1%] flex aspect-square h-full flex-col align-middle">
              <div className="mb-2 ml-2 inline-block bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-400 bg-clip-text text-2xl font-medium text-transparent">
                Python
              </div>
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white/25 shadow-md">
                <img
                  className="my-8 flex h-[40%] items-center justify-center rounded-2xl"
                  alt="Python Logo"
                  src="/icons/PythonLogo.png"
                />
                <div className="mb-3 flex h-fit w-fit flex-col justify-center align-middle text-2xl font-bold text-[#c9cbe7]">
                  Python 사용 설명서
                </div>
                <a
                  href="https://lab.ssafy.com/s10-final/S10P31A308/-/tree/develop-ins/omegi-opentelemetry-instrumentation/omegi-instrumentation-python?ref_type=heads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 h-fit w-fit rounded-lg bg-white/50 px-5 py-2 text-lg font-medium text-[#171821] shadow-md"
                >
                  바로가기 ⏎
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IndexPage;
