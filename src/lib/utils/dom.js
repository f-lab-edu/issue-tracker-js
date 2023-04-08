export const getClosestDraggableNode = (el) => closest(el, '[draggable="true"], .last');

export const closest = (el, selector) => {
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

export const getMoveToElementInfo = ($node) => {
  const $currentNode = $node;
  const parentNode = closest($node, '[data-type="parent"]');
  if (!parentNode?.children) {
    return null;
  }
  const findNodeIndex = [...parentNode.children].findIndex((child) => child.dataset.id === $currentNode.dataset.id);
  if (findNodeIndex !== -1) {
    return {
      parentId: parentNode.dataset.id,
      nodeId: $currentNode.dataset.id,
      targetIndex: findNodeIndex,
    };
  }
  return null;
};

export const attachTextInputFocusEvent = ($input) => {
  $input.focus();
  const { value } = $input;
  $input.value = '';
  $input.value = value;
};
