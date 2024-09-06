let isBold = false;
let isItalic = false;
let isUnderline = false;
let fontSize = 11; // Default font size
let fontFamily = "Arial"; // Default font family
let fontCase = "sentence-case"; // Default sentence case

let textPosition = { x: 50, y: 100 }; // Initial position of the text
let isDragging = false; // To track dragging state
let offsetX, offsetY; // Offset for dragging

// Event listeners for bold, italic, and underline
document.getElementById('bold').addEventListener('click', function() {
  isBold = !isBold;
  updateCanvas();
});

document.getElementById('italic').addEventListener('click', function() {
  isItalic = !isItalic;
  updateCanvas();
});

document.getElementById('underline').addEventListener('click', function() {
  isUnderline = !isUnderline;
  updateCanvas();
});

// Event listener for font size change
document.querySelector('input[type="number"]').addEventListener('input', function(event) {
  fontSize = event.target.value;
  updateCanvas();
});

// Event listener for font family change
document.getElementById('fonts').addEventListener('change', function() {
  fontFamily = this.value;
  updateCanvas();
});

// Event listener for font case change
document.getElementById('font-case').addEventListener('change', function() {
  fontCase = this.value;
  updateCanvas();
});

// Event listener for drawing the image on canvas
document.getElementById('draw-btn').addEventListener('click', function() {
  updateCanvas();
});

// Event listener for downloading the image
document.getElementById('download-btn').addEventListener('click', function() {
  var canvas = document.getElementById("myCanvas");
  var dataURL = canvas.toDataURL("image/png");
  window.open(dataURL);
});

// Add mouse event listeners to enable text dragging
const canvas = document.getElementById("myCanvas");
canvas.addEventListener("mousedown", onMouseDown);
// canvas.addEventListener("mousemove", onMouseMove);

canvas.addEventListener("mousemove", (event) => {
  console.log("Mouse is dragging")
  if(isDragging){
    // offsetX = mouseX - textPosition.x;
    // offsetY = mouseY - textPosition.y;
    console.log("Is Dragging");
  }
});
canvas.addEventListener("mouseup", onMouseUp);

// create the context for the canvas
var ctx = canvas.getContext("2d");

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawOnCanvas(text, x, y) {
  // Draw the text at the updated position
  ctx.fillText(text, textPosition.x, textPosition.y);
}

function updateCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get the text input value
  var text = document.getElementById("inputText").value || "Your Gold Text";

  // Apply sentence case transformations based on the selected option
  text = transformCase(text, fontCase);

  // Set font styles based on button states
  let fontStyle = '';
  if (isItalic) fontStyle += 'italic ';
  if (isBold) fontStyle += 'bold ';

  // Set font and size
  ctx.font = `${fontStyle}${fontSize}px ${fontFamily}`;
  
  // Set text gradient (Gold effect)
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "#FFD700");
  gradient.addColorStop("1.0", "#FFCC00");

  // Apply gradient and shadow
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 3;

  let x, y;
  x = 50;
  y = 100;

  drawOnCanvas(text, x, y);

  // If underline is selected, draw an underline
  if (isUnderline) {
    const textWidth = ctx.measureText(text).width;
    ctx.beginPath();
    ctx.moveTo(textPosition.x, textPosition.y + 10);  // Adjust underline position
    ctx.lineTo(textPosition.x + textWidth, textPosition.y + 10);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Mouse down event: Start dragging the text
function onMouseDown(e) {
  const ctx = canvas.getContext("2d");
  const text = document.getElementById("inputText").value || "Your Gold Text";
  
  // Calculate mouse position relative to the canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Measure the text size and check if the mouse is within the text boundaries
  const textWidth = ctx.measureText(text).width;
  const textHeight = fontSize;

  console.log("mouse is clicked");
  
  if (
    mouseX >= textPosition.x && 
    mouseX <= textPosition.x + textWidth &&
    mouseY >= textPosition.y - textHeight &&
    mouseY <= textPosition.y
  ) {
    // Start dragging and calculate the offset
    isDragging = true;
    offsetX = mouseX - textPosition.x;
    offsetY = mouseY - textPosition.y;
  }
}

// Mouse move event: Move the text while dragging
function onMouseMove(e) {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update text position based on mouse movement
    textPosition.x = mouseX - offsetX;
    textPosition.y = mouseY - offsetY;

    console.log("Currently, mouse is moving");

    // Redraw the canvas with the updated text position
    updateCanvas();
  }
}

// Mouse up event: Stop dragging the text
function onMouseUp() {
  isDragging = false;
  console.log("Mouse lifted");
}

// Helper function to transform text case
function transformCase(text, caseOption) {
  switch (caseOption) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'title-case':
      return text.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
    case 'invertcase':
      return text.split('').map(function(char) {
        return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
      }).join('');
    case 'sentence-case':
    default:
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
