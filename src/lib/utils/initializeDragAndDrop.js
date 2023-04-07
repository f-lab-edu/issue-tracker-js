import { getClosestDraggableNode, getMoveToElementInfo } from './dom';

let $dragNode = null;

function initializeDragAndDrop($element, callback) {
  $element.addEventListener('dragstart', handleDragStart, true);
  $element.addEventListener('dragover', handleDragOver, true);
  $element.addEventListener('dragenter', handleDragEnter, true);
  $element.addEventListener('dragend', handleDragEnd.bind(null, callback), true);
}

function handleDragStart(e) {
  const $target = getClosestDraggableNode(e.target);
  if (!$target) {
    return;
  }
  $dragNode = $target;
  $dragNode.style.opacity = '0.5';
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();
  const $enterNode = getClosestDraggableNode(e.target);
  if ($enterNode && $dragNode !== $enterNode) {
    $enterNode.parentNode.insertBefore($dragNode, $enterNode);
  }
}

function handleDragEnd(callback, e) {
  e.target.style.opacity = '1';
  const moveElementInfo = getMoveToElementInfo($dragNode);
  callback(moveElementInfo);
}

export default initializeDragAndDrop;
