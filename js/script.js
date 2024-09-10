const btnBold = document.getElementById("bold");
const btnItalic = document.getElementById("italic");
const btnUnderline = document.getElementById("underline");
const btnDraw = document.getElementById("draw-btn"); 
const btnLeftAlign = document.getElementById("right-align"); 
const btnCenterAlign = document.getElementById("center-align"); 
const btnRightAlign = document.getElementById("left-align"); 
// const btnJustifyAlign = document.getElementById("justify-align"); 

const canvas = document.getElementById("main-canvas");
canvas.width = 1280;
canvas.height = 720;

let isBold = false;
let isItalic = false;
let isUnderline = false;
var fontStyle = '';
let textPosition = {x:500, y:400};
let fontSize = document.getElementById("font-size").value;
let fontFamilyOptions = document.getElementById("font-family");
var fontFamily = fontFamilyOptions.options[fontFamilyOptions.selectedIndex].value;
let textAlign = ['left', 'center', 'right', 'justify'];



const ctx = canvas.getContext("2d");

var scale = localStorage.getItem("canvasLastScale") || 0.2;
canvas.style.transform = `scale(${scale})`;

// set the saved zoom Slider value 
document.getElementById("zoom-slider").value = Number(parseFloat(scale));


function drawTheText(){
    const inputText = document.getElementById("input-text").value;
    fontSize = document.getElementById("font-size").value;
    fontFamily = fontFamilyOptions.options[fontFamilyOptions.selectedIndex].value;

    fontStyle = ''
    let fillStyle = "#ffffff";
    
    if(isItalic) fontStyle += "italic ";
    if(isBold) fontStyle += "bold ";

    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fillStyle;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(inputText, textPosition.x, textPosition.y);

    if(isUnderline){
        const textWidth = ctx.measureText(inputText).width;
        ctx.beginPath();
        ctx.moveTo(textPosition.x, textPosition.y + 15);
        ctx.lineTo(textPosition.x + textWidth, textPosition.y + (fontSize/12.5));
        ctx.strokeStyle = fillStyle;
        ctx.lineWidth = fontSize /12.5;
        ctx.stroke();
    }
    localStorage.setItem("font-size", fontSize);
}

function updateText(){
    drawTheText();
}

btnDraw.addEventListener("click", () => {
    updateText();
});


btnBold.addEventListener('click', () => {
    isBold = !isBold;
    updateText();
});

btnItalic.addEventListener('click', () => {
    isItalic = !isItalic;
    updateText();
});

btnUnderline.addEventListener('click', () => {
    isUnderline = !isUnderline;
    updateText();
});

btnLeftAlign.addEventListener("click", () =>{
    ctx.textAlign = textAlign[0];
    updateText();
});

btnCenterAlign.addEventListener("click", () =>{
    ctx.textAlign = textAlign[1];
    updateText();
});

btnRightAlign.addEventListener("click", () =>{
    ctx.textAlign = textAlign[2];
    updateText();
});

// btnJustifyAlign.addEventListener("click", () =>{
//     ctx.textAlign = textAlign[3];
//     updateText();
// });

fontFamilyOptions.addEventListener('change', () => {
    fontFamily = fontFamilyOptions.options[fontFamilyOptions.selectedIndex].value;
    updateText();
});


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

// Event listener for downloading the image
document.getElementById('download-btn').addEventListener('click', function() {
  var canvas = document.getElementById("main-canvas");
  var dataURL = canvas.toDataURL("image/png");
  window.open(dataURL);
});

