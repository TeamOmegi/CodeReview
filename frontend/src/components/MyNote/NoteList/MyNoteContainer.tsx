import { useNavigate } from "react-router-dom";

interface Props {
  notes: MyNote[];
  selectedTag: string;
}

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}

const MyNoteContainer = ({ notes, selectedTag }: Props) => {
  const navigate = useNavigate();

  const handleNoteClick = (note: MyNote) => {
    navigate(`/omegi/myNote/${note.noteId}`);
  };
  return (
    <div className="mt-10  flex h-full w-full flex-col overflow-y-scroll scrollbar-webkit">
      {notes.map((note, index) => {
        if (selectedTag !== "" && !note.tags.includes(selectedTag)) return;
        return (
          <div
            key={index}
            className="mb-5 ml-5 mr-5 box-border flex h-32 items-center justify-between rounded-xl border-[1px] bg-white pb-2 pl-3 shadow-lg hover:cursor-pointer"
            onClick={() => {
              handleNoteClick(note);
            }}
          >
            <div className="box-border flex h-[80%] w-full flex-col justify-start">
              <div className="box-border flex flex-col">
                <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
                <p className="p-2 text-sm">{note.content}</p>
              </div>
              <div className="mb-3 ml-2 mt-2 flex items-center justify-between">
                <div>
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className=" mr-3 rounded-3xl bg-green-100 px-4 py-1 text-base font-light text-green-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pr-5 text-xs text-gray-500">
                  작성 시간: {note.createdAt}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyNoteContainer;
