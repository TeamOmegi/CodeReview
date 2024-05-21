const ToggleContainer = ({ setViewType, viewType }: any) => {
  return (
    <label className="shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-3xl p-1">
      <input
        type="checkbox"
        className="sr-only"
        onChange={() =>
          setViewType((prevViewType: any) =>
            prevViewType === "list" ? "list" : "graph",
          )
        }
      />
      <span
        className={`flex items-center  rounded-3xl px-4 py-2 text-sm font-medium ${viewType === "list" ? "border-2 bg-secondary-50" : ""}`}
        onClick={() => setViewType("list")}
      >
        <img src="/icons/ListIcon.png" alt="list" className="mr-1 h-5 w-5" />
        리스트
      </span>
      <span
        className={`flex items-center rounded-3xl px-4 py-2 text-sm font-medium ${viewType === "graph" ? "border-2 bg-secondary-50" : ""}`}
        onClick={() => setViewType("graph")}
      >
        <img src="/icons/GraphIcon.png" alt="graph" className="mr-1 h-5 w-5" />
        그래프
      </span>
    </label>
  );
};

export default ToggleContainer;
