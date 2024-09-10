const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomSlider = document.getElementById('zoom-slider');

// scale = 1;
const scaleFactor = 1.2;
const minScaleFactor = 0.1;
const maxScaleFactor = 3.0;

function updateTransform(scale) {
    canvas.style.transform = `scale(${scale})`;
    zoomSlider.value = Number(parseFloat(scale));
    localStorage.setItem("canvasLastScale", scale);
}

zoomInBtn.addEventListener('click', () => {
    if(scale < maxScaleFactor){
        scale *= scaleFactor;
        updateTransform(scale);
    }
});

zoomOutBtn.addEventListener('click', () => {
    if(scale > minScaleFactor){
        scale /= scaleFactor;
        updateTransform(scale);
    }
});

zoomSlider.addEventListener("change", () => {
    scale = Number(parseFloat(zoomSlider.value));
    updateTransform(scale);
});