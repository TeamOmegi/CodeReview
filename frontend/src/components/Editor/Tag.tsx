import { useRef, useState } from "react";

const Tag = () => {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const [tagName, setTagName] = useState<string>("");
  const [tagLen, setTagLen] = useState<number>(0);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTagName(e.target.value);
  };

  const handleOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key == "Enter" && tagName) {
      if (tagLen > 2) {
        setTagName("");
        return;
      } else if (tagLen > 0) {
        const allTag = Array.from(
          tagRef.current?.querySelectorAll("div") || [],
        );

        const isDuplication = allTag.find((tagDiv) => {
          if (tagDiv.textContent === `# ${tagName}`) {
            return tagDiv;
          }
        });

        if (isDuplication != undefined) {
          setTagName("");
          return;
        }
      }

      const inputTag = tagRef.current?.querySelector("input");
      const newTag = document.createElement("div");
      const className =
        "mr-3 font-light text-orange-500 bg-orange-50 rounded-3xl px-4 hover:cursor-pointer";
      newTag.textContent = `# ${tagName}`;
      newTag.className = className;
      newTag.addEventListener("click", () => {
        handleTagDelete(newTag);
      });

      if (inputTag) {
        tagRef.current?.insertBefore(newTag, inputTag);
        setTagName("");
        setTagLen(tagLen + 1);
      }
    } else if (e.key == "Backspace" && tagName == "") {
      // div 제거하는 코드
      const lastTag = tagRef.current?.querySelector("input")?.previousSibling;
      if (lastTag) {
        tagRef.current?.removeChild(lastTag);
        setTagName("");
        if (tagLen > 0) setTagLen(tagLen - 1);
      }
    }
  };

  const handleTagDelete = (tagDiv: HTMLDivElement) => {
    tagRef.current?.removeChild(tagDiv);
    const len = tagRef.current?.querySelectorAll("div").length || 0;
    setTagName("");
    setTagLen(len);
  };

  return (
    <div className="w-[90%] overflow-x-scroll scrollbar-webkit ">
      <div
        className="flex h-10 w-full flex-row items-center whitespace-nowrap"
        ref={tagRef}
      >
        <input
          type="text"
          value={tagName}
          className={` bg-main-200 ml-2 h-7 w-48 text-base tracking-[0.07em]  focus:outline-none ${tagLen == 3 ? "placeholder-rose-500" : "placeholder-[#868E96]"}`}
          placeholder={`해시태그 입력. (${tagLen}/3)`}
          onChange={handleTagChange}
          onKeyUp={handleOnKeyUp}
        />
      </div>
    </div>
  );
};

export default Tag;
