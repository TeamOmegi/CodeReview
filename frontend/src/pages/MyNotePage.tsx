import NoteGraph from "../components/MyNote/NoteGraph/NoteGraph";

const MyNotePage = () => {
  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full rounded-xl bg-blue-300 text-2xl">
        <div className="m-5 flex items-center justify-center bg-amber-400">
          내 노트
        </div>
      </div>
      <div className="flex h-5/6 w-full items-center justify-center rounded-xl">
        <div className="border-1 flex h-5/6 w-11/12 items-center justify-center rounded-lg border-primary-100 text-black">
          <NoteGraph />
        </div>
      </div>
    </div>
  );
};

export default MyNotePage;
