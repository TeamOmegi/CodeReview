import AllNoteList from "../components/AllNote/AllNoteList";
import Header from "../components/Common/Header";

const AllNoteListPage = () => {
  return (
    <div className="bg-default box-border flex h-full w-full flex-col justify-between px-8 pb-8 pt-12">
      <div className="flex h-[10%] w-full flex-col justify-start">
        <Header title="📚 모아보기" />
      </div>
      <div className="mx-1 flex h-[90%] w-full items-center justify-center rounded-xl">
        <div className="border-1 flex h-full w-full items-center justify-center rounded-lg border-primary-100 text-black">
          <AllNoteList />
        </div>
      </div>
    </div>
  );
};

export default AllNoteListPage;
