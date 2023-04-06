let $dragNode = null;

function initializeDragAndDrop($container) {
  $container.addEventListener('dragstart', handleDragStart, true);
  $container.addEventListener('dragover', handleDragOver, true);
  $container.addEventListener('dragenter', handleDragEnter, true);
  $container.addEventListener('dragleave', handleDragLeave, true);
  $container.addEventListener('drop', handleDrop, true);
  $container.addEventListener('dragend', handleDragEnd, true);
}

function closest(el, selector) {
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function getClosestDraggableNode(el) {
  return closest(el, '[draggable="true"], .last');
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
function handleDragLeave(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();

  console.log('element', getClosestDraggableNode(e.target));
  console.log('parent element', closest(e.target, '[data-type="parent"]'));
}

function handleDragEnd(e) {
  e.target.style.opacity = '1';
}

export default initializeDragAndDrop;
