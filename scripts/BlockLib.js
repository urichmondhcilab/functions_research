// makeDraggable is needed to preserve the selected option in the dropdown while being moved
function makeDraggable() {
    const draggableBlocks = document.querySelectorAll('.draggable');

    draggableBlocks.forEach(function(block) {
        block.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.dataset.move);
        });
    });
}
