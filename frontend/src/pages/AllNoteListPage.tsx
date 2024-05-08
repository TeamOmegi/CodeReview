import AllNoteList from "../components/AllNote/AllNoteList";

const AllNoteListPage = () => {
  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full rounded-xl bg-blue-300">
        <div className="m-5 flex items-center justify-center text-2xl font-bold">
          모아보기
        </div>
      </div>
      <div className="flex h-5/6 w-full items-center justify-center rounded-xl">
        <div className="border-1 flex h-full w-11/12 items-center justify-center rounded-lg border-primary-100 text-black">
          <AllNoteList />
        </div>
      </div>
    </div>
  );
};

export default AllNoteListPage;
