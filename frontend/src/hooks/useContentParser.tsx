export const useContentParser = (elementString: string) => {
  const domParser = new DOMParser();
  let textContent: string = "";
  const startElements = Array.from(
    domParser.parseFromString(elementString, "text/html").body.childNodes,
  );

  const textParser = (element: ChildNode[]) => {
    for (var node of element) {
      // 노드가 텍스트 노드인 경우 텍스트를 추출하여 결과에 추가합니다.
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
      // 노드가 요소 노드인 경우 재귀적으로 해당 요소의 텍스트 콘텐츠를 추출합니다.
      else if (node.nodeType === Node.ELEMENT_NODE) {
        console.log("히히 오줌발싸", node);
        textParser(Array.from(node.childNodes));
      }
    }
    return textContent;
  };
  return textParser(startElements);
};
