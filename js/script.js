let isBold = false;
let isItalic = false;
let isUnderline = false;

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

document.getElementById('draw-btn').addEventListener('click', function() {
  updateCanvas();
});

document.getElementById('download-btn').addEventListener('click', function() {
  var canvas = document.getElementById("myCanvas");
  var dataURL = canvas.toDataURL("image/png");
  window.open(dataURL);
});

function updateCanvas() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get the text input value
  var text = document.getElementById("inputText").value || "Your Gold Text";
  
  // Set font styles based on button states
  let fontStyle = '';
  if (isItalic) fontStyle += 'italic ';
  if (isBold) fontStyle += 'bold ';

  // Set font and size
  ctx.font = `${fontStyle}48px Arial`;
  
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

  // Draw the text
  ctx.fillText(text, 50, 100);

  // If underline is selected, draw an underline
  if (isUnderline) {
    const textWidth = ctx.measureText(text).width;
    ctx.beginPath();
    ctx.moveTo(50, 110);  // Position for underline (under the text)
    ctx.lineTo(50 + textWidth, 110);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}


//  var newTab = window.open('about:blank','image from canvas');
//  newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");