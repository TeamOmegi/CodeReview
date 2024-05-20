import { useState, useEffect, useRef } from "react";
import {
  deleteServiceTokens,
  getProjectNames,
  getProjectTokens,
  getServiceTokens,
  getServices,
  getServicesType,
  projectCreate,
  projectDelete,
} from "../api/projectAxios";
import ProjectSelect from "../components/Setting/ProjectSelect";
import ServiceTypeSelect from "../components/Setting/ServiceTypeSelect";
import { useError, useSuccessAlert } from "../hooks/useAlert";
import { useQuestion, useWarnning } from "../hooks/useComfirm";
import Header from "../components/Common/Header";

interface ProjectNames {
  projectId: number;
  name: string;
}

interface ServiceNames {
  serviceId: number;
  serviceName: string;
}

interface ServiceType {
  serviceTypeId: number;
  serviceTypeName: string;
}

interface Token {
  serviceId: number;
  serviceToken: string;
}

const SettingPage = () => {
  // select 선택항목
  const [pjtNames, setPjtNames] = useState<ProjectNames[]>([]);
  const [serviceType, setServiceType] = useState<ServiceType[]>([]);

  // select 선택 후 표시된 프로젝트, 서비스
  const [selectedProject, setSelectedProject] = useState<number>(-1);
  const [services, setServices] = useState<ServiceNames[]>([]);

  // 프로젝트 생성 data
  const [projectName, setProjectName] = useState<string>("");
  const [serviceNames, setServiceNames] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([1, 1, 1, 1, 1]);

  // 토큰
  const [projectToken, setProjectToken] = useState<Token[]>([]);

  useEffect(() => {
    const getPjtNames = async () => {
      const nameData = await getProjectNames();
      const typeData = await getServicesType();
      setPjtNames([...nameData.projects]);
      setServiceType([...typeData.supportedTypes]);
    };
    getPjtNames();
  }, []);

  useEffect(() => {
    console.log("프로젝트id", selectedProject);
    if (selectedProject == -1) return;
    const getService = async () => {
      const serviceData = await getServices(selectedProject);
      setServices([...serviceData.services]);
    };

    const getProjectToken = async () => {
      const tokensData = await getProjectTokens(selectedProject);
      setProjectToken(tokensData.serviceTokens);
      console.log(tokensData.serviceTokens);
    };

    getService();
    getProjectToken();
  }, [selectedProject]);

  // 프로젝트 등록

  const createServiceNamesArray = () => {
    return serviceNames.map((name, index) => ({
      serviceTypeId: selectedTypes[index],
      serviceName: name,
    }));
  };

  const handleProjectCreate = async () => {
    if (projectName == "") {
      useError({
        title: "Error",
        text: "프로젝트 이름을 입력해주세요.",
      });
      return;
    } else {
      for (let i = 0; i < pjtNames.length; i++) {
        if (pjtNames[i].name === projectName) {
          useError({
            title: "Error",
            text: "이미 존재하는 프로젝트 이름입니다.",
          });
          return;
        }
      }

      for (let i = 0; i < serviceNames.length; i++) {
        if (serviceNames[i] === "") {
          useError({
            title: "Error",
            text: "서비스 이름을 입력해주세요.",
          });
          return;
        }
      }

      const result = await useQuestion({
        title: "Project Create",
        fireText: "프로젝트를 생성하시겠습니까?",
        resultText: "프로젝트가 생성되었습니다.",
      });

      if (result) {
        const projectData = {
          projectName: projectName,
          services: createServiceNamesArray(),
        };

        await projectCreate(projectData);
        const nameData = await getProjectNames();

        setPjtNames([...nameData.projects]);
        setProjectName("");
        setSelectedTypes([1, 1, 1, 1, 1]);
        setServiceNames(["", "", "", "", ""]);
      } else return;
    }
  };

  // 프로젝트 삭제
  const handleProjectDelete = async () => {
    const result = await useWarnning({
      title: "Project Delete",
      fireText: "Project를 삭제하시겠습니까?",
      resultText: "Project가 삭제되었습니다.",
    });

    if (result) {
      await projectDelete(selectedProject);
      const deletedProject = pjtNames.filter(
        (project) => project.projectId != selectedProject,
      );
      setPjtNames(deletedProject);
    }
  };

  const handleServiceCreate = () => {
    setServiceNames([...serviceNames, ""]);
    setSelectedTypes([...selectedTypes, 1]);
  };

  const handleServiceDelete = (index: number) => {
    const newServiceNames = serviceNames.filter((_, i) => i !== index);
    setServiceNames(newServiceNames);

    const newSelectedTypes = selectedTypes.filter((_, i) => i !== index);
    setSelectedTypes(newSelectedTypes);
  };

  // 프로젝트 셀렉트
  const handleSelectProject = async (projectId: number) => {
    setSelectedProject(projectId);
  };

  // 프로젝트 이름 인풋
  const handleChangeProjectName = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setProjectName(e.target.value);
  };

  // 서비스 이름 인풋
  const handleChangeServiceName = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    index: number,
  ) => {
    const newInputNames = serviceNames.map((name, i) => {
      if (i == index) return e.target.value;
      else return name;
    });
    setServiceNames(newInputNames);
    console.log(newInputNames);
  };

  // 서비스 타입 셀렉트
  const handleSelectType = async (index: number, typeId: number) => {
    setSelectedTypes((prevSelectedTypes) => {
      const newSelectedTypes = [...prevSelectedTypes];
      newSelectedTypes[index] = typeId;
      return newSelectedTypes;
    });
  };

  // 서비스 토근가져오기
  const handleServiceToken = async (serviceId: number, serviceName: string) => {
    const result = await useQuestion({
      title: "Token Generate",
      fireText: "Token을 생성하시겠습니까?",
      resultText: "Token이 생성되었습니다.",
    });

    if (result) {
      const tokenName = {
        name: serviceName,
      };
      const token = await getServiceTokens(
        selectedProject,
        serviceId,
        tokenName,
      );

      setProjectToken([
        ...projectToken,
        { serviceId: serviceId, serviceToken: token.serviceToken },
      ]);
    }
  };

  // 서비스 토큰 삭제
  const handleDeleteToken = async (projectId: number, serviceId: number) => {
    const result = await useWarnning({
      title: "Token Delete",
      fireText: "Token을 삭제하시겠습니까?",
      resultText: "Token이 삭제되었습니다.",
    });

    if (result) {
      await deleteServiceTokens(projectId, serviceId);
      const deletedTokens = projectToken.filter(
        (token) => token.serviceId != serviceId,
      );
      setProjectToken(deletedTokens);
    }
  };

  // 토큰 복사 (클립보드)
  const handleCopyToken = (token: string) => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        useSuccessAlert("클립보드에 복사되었습니다.");
      })
      .catch((error) => {
        console.log("복사실패");
      });
  };

  // 오메기 깃랩으로
  const handleOmegiGitLab = () => {
    const url =
      "https://lab.ssafy.com/s10-final/S10P31A308/-/tree/develop-ins/omegi-opentelemetry-instrumentation?ref_type=heads";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-default box-border flex h-full w-full flex-col justify-between px-8 pb-8 pt-12">
      <div className="flex h-1/6 w-full flex-col justify-start">
        <Header title="⚙️ 프로젝트 설정"></Header>
      </div>
      <div className="flex h-5/6 w-full justify-center">
        {/* 프로젝트 생성 Container*/}
        {/*  프로젝트 리스트 */}
        <div className="flex h-full w-1/2 flex-col pl-4">
          <div className="flex h-1/6 w-full items-center">
            <div className="mx-2 flex text-2xl font-bold text-main-100 text-opacity-70">
              PROJECT TOKEN
            </div>
          </div>

          <div className="h-1/6 w-full">
            <div className="mx-2 text-base font-medium text-main-100 text-opacity-40">
              PROJECT NAME
            </div>
            <div className="flex h-auto w-full items-center">
              <ProjectSelect
                options={pjtNames}
                handleSelectProject={handleSelectProject}
              />
              <img
                src="/icons/DeleteIcon1.png"
                className="ml-3 h-6 w-5 opacity-70 hover:cursor-pointer"
                onClick={handleProjectDelete}
              />
            </div>
          </div>
          <div className="mx-2 mt-2 flex text-base font-medium text-main-100 text-opacity-40">
            SERVICE NAME
          </div>
          <div className="h-3/6 w-[95%] overflow-y-scroll scrollbar-webkit">
            {services.map((service) => {
              const foundToken = projectToken.find(
                (token) => token.serviceId === service.serviceId,
              );

              return (
                <div className="flex items-center">
                  <div className="my-2 flex h-10 w-60 items-center justify-center rounded-lg border-[3px] border-gray-300 bg-white">
                    <div>{service.serviceName}</div>
                  </div>

                  {foundToken != undefined ? (
                    <div className="ml-2 flex items-center ">
                      <div className="flex w-60 items-center rounded-lg border-2 border-gray-500 px-2.5 py-1.5">
                        <div className="w-48 overflow-x-scroll whitespace-nowrap text-xs scrollbar-hide">
                          {foundToken.serviceToken}
                        </div>
                        {/* 클립보드 복사 */}
                        <img
                          src="/icons/CopyTokenIcon.png"
                          className=" ml-4 h-5 w-5 opacity-70 hover:cursor-pointer hover:opacity-100"
                          onClick={() => {
                            handleCopyToken(foundToken.serviceToken);
                          }}
                        />
                      </div>
                      {/* 토큰삭제 */}
                      <img
                        src="/icons/DeleteTokenIcon.png"
                        className=" ml-3 h-5 w-5 opacity-45 hover:cursor-pointer hover:opacity-100"
                        onClick={() => {
                          handleDeleteToken(selectedProject, service.serviceId);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="ml-2 flex items-center">
                      <div className="flex w-60 items-center rounded-lg border-2 border-gray-500 px-2.5 py-1.5">
                        {/* 토큰생성 */}
                        <img
                          src="/icons/TokenInfoIcon.png"
                          className=" mx-3 mb-[1px] h-4 w-4 opacity-45 "
                        />
                        <div className="w-48 text-xs text-gray-500">
                          {"토큰을 새로 발급해 주세요!"}
                        </div>
                      </div>
                      <img
                        src="/icons/CreateTokenIcon.png"
                        className=" ml-3 h-5 w-5 opacity-45 hover:cursor-pointer hover:opacity-100"
                        onClick={() =>
                          handleServiceToken(
                            service.serviceId,
                            service.serviceName,
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="ml-10 flex h-1/4 w-[75%] items-end justify-center">
            <div
              className="box-border flex h-5/6 w-full  items-center justify-center rounded-lg border-2 border-gray-400 bg-white p-4 hover:cursor-pointer hover:shadow-xl"
              onClick={handleOmegiGitLab}
            >
              <div className="flex h-full flex-col">
                <div className=" text-sm font-bold text-primary-600">
                  Welcome Omegi Service
                </div>
                <div className="mt-1.5 w-[95%] text-xs text-gray-500">
                  https://lab.ssafy.com/s10-final/S10P31A308/-/tree/develop-ins/omegi-opentelemetry-instrumentation?ref_type=heads
                </div>
              </div>
              <img
                className="h-16 w-16 rounded-xl"
                src="/icons/GitLabIcon.png"
              />
            </div>
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col border-l-2 pl-16">
          {/* 프로젝트 정보 입력 */}
          <div className="flex h-1/6 w-full  items-center ">
            <div className="mx-2 flex text-2xl font-bold text-main-100 text-opacity-70">
              PROJECT CREATE
            </div>
          </div>
          <div className="h-1/6 w-full">
            <div className="mx-2 flex text-base font-medium text-main-100 text-opacity-40">
              PROJECT
            </div>
            <input
              className="box-border h-10 w-72 rounded-lg border-[3px] px-3 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
              value={projectName}
              placeholder="ProjectName"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              onBlur={(e) => {
                handleChangeProjectName(e);
              }}
            />
          </div>
          <div className="mx-2 flex text-base font-medium text-main-100 text-opacity-40">
            SERVICE
          </div>
          <div className="h-3/6 w-[95%] overflow-y-scroll scrollbar-webkit">
            {serviceNames.map((value, index) => (
              <div className="my-1 flex items-center ">
                <input
                  key={index}
                  value={value}
                  className="box-border flex h-10 w-72 rounded-lg border-[3px] px-3 text-gray-700 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
                  placeholder={`${index + 1}.  ServiceName`}
                  onChange={(e) => {
                    const newServiceNames = [...serviceNames];
                    newServiceNames[index] = e.target.value;
                    setServiceNames(newServiceNames);
                  }}
                  onBlur={(e) => {
                    handleChangeServiceName(e, index);
                  }}
                />
                <ServiceTypeSelect
                  options={serviceType}
                  index={index}
                  handleSelectType={handleSelectType}
                />
                {index != 0 && index == serviceNames.length - 1 && (
                  <img
                    className="ml-3 h-5 w-5 opacity-45 hover:cursor-pointer hover:opacity-100"
                    onClick={() => {
                      handleServiceDelete(index);
                    }}
                    src="/icons/MinusIcon.png"
                  />
                )}
              </div>
            ))}
          </div>

          {/* 서비스추가, 생성버튼 */}
          <div className="h-1/6 w-[95%]">
            <div
              className="flex h-8 w-72 items-end justify-center hover:cursor-pointer"
              onClick={handleServiceCreate}
            >
              <img
                className="ml-3 h-6 w-6 opacity-45 hover:cursor-pointer hover:opacity-100"
                src="/icons/HoverPlusIcon.png"
              />
            </div>
            <div
              className="mt-3 flex h-10 w-72 items-center justify-center rounded-lg bg-gray-400 text-lg text-white hover:cursor-pointer hover:bg-primary-500 hover:duration-200"
              onClick={handleProjectCreate}
            >
              <div>프로젝트 생성</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
