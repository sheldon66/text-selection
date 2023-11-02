import {
  DATASET_IDENTIFIER,
  DATASET_SPLIT_TYPE,
  DATASET_IDENTIFIER_EXTRA,
} from "@/util/const";
import { SelectedNode, HighlightRange } from "@/types";
export const wrapHighLight = (
  selected: SelectedNode,
  range: HighlightRange,
) => {
  const $parent = selected.$node.parentNode as HTMLElement;
  const isHighlightWrapNode = ($node: HTMLElement): boolean =>
    !!$node.dataset && !!$node.dataset[DATASET_IDENTIFIER];

  const wrapNewNode = (
    selected: SelectedNode,
    range: HighlightRange,
  ): HTMLElement => {
    const $wrap = document.createElement("span");

    // addClass($wrap, className);

    $wrap.appendChild(selected.$node.cloneNode(false));
    const $parent = selected.$node.parentNode;
    if ($parent) {
      $parent.replaceChild($wrap, selected.$node);
    }
    $wrap.classList.add("hightlight");
    $wrap.setAttribute(`data-${DATASET_IDENTIFIER}`, range.id);
    $wrap.setAttribute(`data-${DATASET_SPLIT_TYPE}`, selected.splitType);
    $wrap.setAttribute(`data-${DATASET_IDENTIFIER_EXTRA}`, "");

    return $wrap;
  };
  if (!isHighlightWrapNode($parent)) {
    wrapNewNode(selected, range);
  }
};
