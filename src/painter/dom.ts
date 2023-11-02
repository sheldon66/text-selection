import type { SelectedNode, DomNode, HighlightRange } from '@/types';

export const wrapHighlight = (
  selected: SelectedNode,
  range: HighlightRange,
  className: string[] | string,
  wrapTag: string,
): HTMLElement => {
  const $parent = selected.$node.parentNode as HTMLElement;
  const $prev = selected.$node.previousSibling;
  const $next = selected.$node.nextSibling;

  let $wrap: HTMLElement;

  // text node, not in a highlight wrapper -> should be wrapped in a highlight wrapper
  if (!isHighlightWrapNode($parent)) {
    $wrap = wrapNewNode(selected, range, className, wrapTag);
  }
  // text node, in a highlight wrap -> should split the existing highlight wrapper
  else if (
    isHighlightWrapNode($parent) &&
    (!isNodeEmpty($prev) || !isNodeEmpty($next))
  ) {
    $wrap = wrapPartialNode(selected, range, className, wrapTag);
  }
  // completely overlap (with a highlight wrap) -> only add extra id info
  else {
    $wrap = wrapOverlapNode(selected, range, className);
  }

  return $wrap;
};
