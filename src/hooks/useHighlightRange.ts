import { rangeAtom } from "@/model/range";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { wrapHighLight } from "@/painter/highlight";
import { getSelectedNodes } from "@/painter";
import { HighlightRange } from "@/types";
const useHighlightRange = (): [HighlightRange | null, () => void] => {
  const [range, setRange] = useAtom(rangeAtom);
  const highlightRange = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const selectedRange = selection.getRangeAt(0);
      setRange({
        start: { $node: selectedRange.startContainer },
        end: { $node: selectedRange.endContainer },
      });
    }
  };
  useEffect(() => {
    if (range) {
      const selectedNodes = getSelectedNodes(
        document.body,
        range.start,
        range.end,
      );
      selectedNodes.forEach((node) => {
        wrapHighLight(node, range);
      });
    }
  }, [range?.id]);

  return [range, highlightRange];
};

export default useHighlightRange;
