const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

let scale = 1;
const scaleFactor = 1.2;

function updateTransform() {
    //  canvas already declared in script.js
    canvas.style.transform = `scale(${scale})`;
}

zoomInBtn.addEventListener('click', () => {
    scale *= scaleFactor;
    updateTransform();
});

zoomOutBtn.addEventListener('click', () => {
    scale /= scaleFactor;
    updateTransform();
});
