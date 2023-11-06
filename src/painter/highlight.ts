import {
  DATASET_IDENTIFIER,
  DATASET_SPLIT_TYPE,
  DATASET_IDENTIFIER_EXTRA,
  ID_DIVISION,
} from "@/util/const";
import { SelectedNode, HighlightRange } from "@/types";
const isNodeEmpty = ($n: Node): boolean => !$n || !$n.textContent;
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
  $wrap.classList.add("highlight");
  $wrap.setAttribute(`data-${DATASET_IDENTIFIER}`, range.id);
  $wrap.setAttribute(`data-${DATASET_SPLIT_TYPE}`, selected.splitType);
  $wrap.setAttribute(`data-${DATASET_IDENTIFIER_EXTRA}`, "");

  return $wrap;
};

const wrapPartialNode = (
  selected: SelectedNode,
  range: HighlightRange,
  className: string[] | string,
  wrapTag: string,
): HTMLElement => {
  const $wrap: HTMLElement = document.createElement(wrapTag);

  const $parent = selected.$node.parentNode as HTMLElement;
  const $prev = selected.$node.previousSibling;
  const $next = selected.$node.nextSibling;
  const $fr = document.createDocumentFragment();
  const parentId = $parent.getAttribute(`data-${DATASET_IDENTIFIER}`);
  const parentExtraId = $parent.getAttribute(
    `data-${DATASET_IDENTIFIER_EXTRA}`,
  );
  const extraInfo = parentExtraId
    ? parentId + ID_DIVISION + parentExtraId
    : parentId;

  $wrap.setAttribute(`data-${DATASET_IDENTIFIER}`, range.id);
  $wrap.setAttribute(`data-${DATASET_IDENTIFIER_EXTRA}`, extraInfo);
  $wrap.appendChild(selected.$node.cloneNode(false));

  let headSplit = false;
  let tailSplit = false;
  let splitType: SplitType;

  if ($prev) {
    const $span = $parent.cloneNode(false);

    $span.textContent = $prev.textContent;
    $fr.appendChild($span);
    headSplit = true;
  }

  const classNameList: string[] = [];

  if (Array.isArray(className)) {
    classNameList.push(...className);
  } else {
    classNameList.push(className);
  }

  addClass($wrap, unique(classNameList));
  $fr.appendChild($wrap);

  if ($next) {
    const $span = $parent.cloneNode(false);

    $span.textContent = $next.textContent;
    $fr.appendChild($span);
    tailSplit = true;
  }

  if (headSplit && tailSplit) {
    splitType = SplitType.both;
  } else if (headSplit) {
    splitType = SplitType.head;
  } else if (tailSplit) {
    splitType = SplitType.tail;
  } else {
    splitType = SplitType.none;
  }

  $wrap.setAttribute(`data-${DATASET_SPLIT_TYPE}`, splitType);
  $parent.parentNode.replaceChild($fr, $parent);

  return $wrap;
};

export const wrapHighLight = (
  selected: SelectedNode,
  range: HighlightRange,
) => {
  const $parent = selected.$node.parentNode as HTMLElement;
  const $prev = selected.$node.previousSibling;
  const $next = selected.$node.nextSibling;
  const isHighlightWrapNode = ($node: HTMLElement): boolean =>
    !!$node.dataset && !!$node.getAttribute(`data-${DATASET_IDENTIFIER}`);

  if (!isHighlightWrapNode($parent)) {
    $wrap = wrapNewNode(selected, range);
  } else if (!isNodeEmpty($prev) || !isNodeEmpty($next)) {
    $wrap = wrapPartialNode(selected, range);
  }
};
