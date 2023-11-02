import type { SelectedNode, DomNode } from "@/types";
import {SelectedNodeType, SplitType} from "@/types"
export const getSelectedNodes = (
  $root: Document | HTMLElement,
  start: DomNode,
  end: DomNode,
): SelectedNode[] => {
  const $startNode = start.$node;
  const $endNode = end.$node;
  const startOffset = start.offset;
  const endOffset = end.offset;

  const nodeStack: (ChildNode | Document | HTMLElement | Text)[] = [$root];
  const selectedNodes: SelectedNode[] = [];

  let withinSelectedRange = false;
  let curNode: Node | null | undefined = null;

  while ((curNode = nodeStack.pop())) {
    // do not traverse the excepted node

    const children = curNode.childNodes;

    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i]);
    }

    // only collect text nodes
    if (curNode === $startNode) {
      if (curNode.nodeType === 3) {
        (curNode as Text).splitText(startOffset);

        const node = curNode.nextSibling as Text;

        selectedNodes.push({
          $node: node,
          type: SelectedNodeType.text,
          splitType: SplitType.head,
        });
      }

      // meet the start-node (begin to traverse)
      withinSelectedRange = true;
    } else if (curNode === $endNode) {
      if (curNode.nodeType === 3) {
        const node = curNode as Text;

        node.splitText(endOffset);
        selectedNodes.push({
          $node: node,
          type: SelectedNodeType.text,
          splitType: SplitType.tail,
        });
      }

      // meet the end-node
      break;
    }
    // handle text nodes between the range
    else if (withinSelectedRange && curNode.nodeType === 3) {
      selectedNodes.push({
        $node: curNode as Text,
        type: SelectedNodeType.text,
        splitType: SplitType.none,
      });
    }
  }

  return selectedNodes;
};
