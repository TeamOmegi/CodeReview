const ErrorMark = () => {
  return (
    <div className="flex h-8 w-fit items-center justify-between overflow-hidden rounded-full bg-[rgba(255,119,119,0.30)] px-2">
      <img
        className="mr-1 h-6 w-6"
        alt="UnsolvedIcon"
        src={"/icons/UnsolvedIcon.svg"}
      />
      <div className="mr-1.5 flex h-6 w-fit items-center justify-center text-xs text-white">
        미해결
      </div>
    </div>
  );
};

const SolvedErrorMark = () => {
  return (
    <div className="flex h-8 w-fit items-center justify-between overflow-hidden rounded-full bg-[rgba(107,185,166,0.30)] px-2">
      <img
        className="mr-1 h-6 w-6"
        alt="SolvedIcon"
        src={"/icons/SolvedIcon.svg"}
      />
      <div className="mr-1.5 flex h-6 w-fit items-center justify-center text-xs text-white">
        해결
      </div>
    </div>
  );
};

export { ErrorMark, SolvedErrorMark };
