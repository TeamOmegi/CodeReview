import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
}

const LogTree = () => {
  const [selectedProject, setSelectedProject] = useState<number>(1);

  // Sample project data
  const projects: Project[] = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ];

  const handleProjectChange = (projectId: number) => {
    setSelectedProject(projectId);
  };
  return (
    <div className="mb-1 mr-1 mt-2 flex h-auto w-3/5 flex-col rounded-xl bg-white p-1 shadow-md">
      <div className="flex h-[15%] w-full justify-between">
        <div className="ml-3 box-border flex h-full w-1/2 pt-3 text-base font-bold">
          로그 트리
        </div>
        <div className=" mr-7 box-border flex h-5/6 w-1/3 items-center pt-3">
          <select
            value={selectedProject}
            onChange={(e) => handleProjectChange(Number(e.target.value))}
            className="w-full appearance-none rounded-xl border-gray-400 bg-secondary-50 px-4 py-2 pr-8 shadow hover:border-gray-500"
          >
            <option value="" disabled>
              프로젝트 선택
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
            <img
              className="pointer-events-none flex h-5 w-5"
              src="/icons/DropdownIcon.png"
              alt="DropdownIcon"
            />
          </select>
        </div>
      </div>

      <div className="box-border flex h-[85%] w-full p-5">
        <img
          className="h-full w-full rounded-xl"
          src="/LogTemp.png"
          alt="LogTemp"
        />
      </div>
    </div>
  );
};

export default LogTree;
