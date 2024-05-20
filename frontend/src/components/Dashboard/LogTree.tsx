import { useState, useEffect } from "react";
import ErrorGraph from "./ErrorGraph";
import ProjectSelect from "../Setting/ProjectSelect";
import { getProjectNames } from "../../api/projectAxios";

interface Project {
  id: number;
  name: string;
}

interface ProjectName {
  projectId: number;
  name: string;
}

const LogTree = () => {
  const [pjtNames, setPjtNames] = useState<ProjectName[]>([]);
  const [selectedProject, setSelectedProject] = useState<number>(-1);

  useEffect(() => {
    const getPjtNames = async () => {
      const nameData = await getProjectNames();
      setPjtNames([...nameData.projects]);
    };
    getPjtNames();
  }, []);

  // 프로젝트 셀렉트
  const handleSelectProject = async (projectId: number) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="mb-1 mr-1 mt-2 flex h-auto w-[65%] flex-col rounded-xl bg-white p-1 shadow-md">
      <div className="flex h-[15%] w-full justify-between">
        <div className="ml-3 box-border flex h-full w-1/2 pt-3 text-base font-bold">
          로그 트리
        </div>
        <ProjectSelect
          options={pjtNames}
          handleSelectProject={handleSelectProject}
        />
      </div>

      <div className="box-border flex h-[85%] w-full p-5">
        <ErrorGraph projectId={selectedProject} />
      </div>
    </div>
  );
};

export default LogTree;
