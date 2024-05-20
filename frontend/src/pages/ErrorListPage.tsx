import { useState, useEffect } from "react";
import ErrorList from "../components/Error/ErrorList";
import { getProjectList, getErrorList } from "../api/errorAxios";
import CustomPjtSelect from "../components/Error/CustomPjtSelect";
import ErrorSwitch from "../components/Error/ErrorSwitch";
import Header from "../components/Common/Header";

interface Project {
  projectId: number;
  name: string;
}

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

const ErrorListPage = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [errorList, setErrorList] = useState<Error[]>([]);
  const [allProject, setAllProject] = useState<string[]>([]);
  const [showUnsolved, setShowUnsolved] = useState<boolean>(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectData = await getProjectList();
        setAllProject(projectData.map((project: Project) => project.name));
        if (projectData.length > 0) {
          const firstProjectName = projectData[0].name;
          setSelectedProject(firstProjectName);
          fetchErrorList(firstProjectName, false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getProjects();
  }, []);

  const fetchErrorList = async (project: string, solved: boolean | null) => {
    try {
      const errors = await getErrorList(project, "", solved);
      setErrorList(errors);
    } catch (error) {
      console.error("Failed to fetch errors:", error);
    }
  };

  const handleSelectProject = async (project: string) => {
    setSelectedProject(project);
    fetchErrorList(project, showUnsolved ? false : null);
  };

  const handleErrorClick = (newShowUnsolved: boolean) => {
    setShowUnsolved(newShowUnsolved);
    fetchErrorList(selectedProject, newShowUnsolved ? false : null);
  };

  return (
    <div className="bg-default box-border flex h-full w-full flex-col justify-between px-8 pb-8 pt-12">
      <div className="flex h-[20%] w-full flex-col justify-start">
        <Header title="🐛 에러 리스트"></Header>
        <div className="mx-2 flex h-full w-full items-center justify-between">
          <div className="flex h-full w-full items-center">
            <div className="mx-2 flex text-base font-medium text-main-100 text-opacity-40">
              PROJECT
            </div>
            <CustomPjtSelect
              options={allProject}
              selectedOption={selectedProject}
              handleSelectProject={handleSelectProject}
            />
            {/* <ErrorSwitch onClick={handleErrorClick} /> */}
          </div>
        </div>
      </div>
      <div className=" flex h-[80%] w-full items-start justify-center rounded-2xl bg-white p-3 shadow-md">
        <ErrorList selectedProject={selectedProject} errorList={errorList} />
      </div>
    </div>
  );
};

export default ErrorListPage;
