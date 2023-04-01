let $dragNode = null;

function initializeDragAndDrop($container) {
  $container.addEventListener('dragstart', handleDragStart, true);
  $container.addEventListener('dragover', handleDragOver, true);
  $container.addEventListener('dragenter', handleDragEnter, true);
  $container.addEventListener('dragleave', handleDragLeave, true);
  $container.addEventListener('drop', handleDrop, true);
  $container.addEventListener('dragend', handleDragEnd, true);
}

function handleDragStart(e) {
  const $target = e.target.closest('.board-list__item');
  if (!$target) {
    return;
  }

  $dragNode = $target;
  $target.style.opacity = '0.5';
}

function handleDragOver(e) {
  e.preventDefault();
  e.target.style.cursor = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  const $enterNode = e.target.closest('.board-list__item');
  if ($enterNode && $dragNode !== $enterNode) {
    $enterNode.parentNode.insertBefore($dragNode, $enterNode);
  }
}
function handleDragLeave(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  console.log('element', e.target);
  console.log('parent element', e.target.parentNode);
}

function handleDragEnd(e) {
  e.target.style.opacity = '1';
}

export default initializeDragAndDrop;
