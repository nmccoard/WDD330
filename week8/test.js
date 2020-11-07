//let canvas = document.querySelector("#myCanvas");
//let context = canvas.getContext("2d");

//context.strokeStyle = "black";
//context.fillStyle = "rgba(0, 0, 200, 0.5)";

//context.fillRect(10, 10, 100, 100);   
//context.strokeRect(10, 10, 100, 100);

function drawPattern() {
   let canvas = document.querySelector("#myCanvas");
   let context = canvas.getContext("2d");
   context.strokeStyle = "red";
   let img = new Image();
   img.src = "xwing2.png";
   img.onload = () => {
      let pattern = context.createPattern(img, "repeat");
      context.fillStyle = pattern;
      context.fillRect(10, 10, 100, 100);
      context.strokeRect(10, 10, 100, 100);
   };
}

function drawGradient() {
   let canvas = document.querySelector("#myCanvas");
   let context = canvas.getContext("2d");
   context.strokeStyle = "blue"
   let gradient = context.createLinearGradient(0, 0, 0, 200);
   gradient.addColorStop(0, "red");
   gradient.addColorStop(1, "white");
   context.fillStyle = gradient;
   context.fillRect(10, 10, 100, 100);
   context.strokeRect(10, 10, 100, 100);
}

function drawCircle() {
   let canvas = document.querySelector("#myCanvas");
   let context = canvas.getContext("2d");
   context.beginPath();
   context.arc(50, 50, 30, 0, Math.PI*2, true);
   context.closePath();
   context.strokeStyle = "green";
   context.fillStyle = "blue";
   context.lineWidth = 3;
   context.fill();
   context.stroke();
}

window.addEventListener("load", drawImageToCanvas, false);

function drawImageToCanvas() {
   let canvas = document.getElementById("myCanvas");
   let context = canvas.getContext("2d");
   let image = document.getElementById("myImageElem");
   context.drawImage(image, 86, 68);
   console.log("I tried to load the image") 
}

function manipulateImage() {
   let canvas = document.querySelector("#myCanvas");
   let context = canvas.getContext("2d");
   let image = document.getElementById("myImageElem");
   context.drawImage(image, 60, 60);
   let imageData = context.getImageData(0, 0, 200, 200);
   
   for (var i = 0; i < imageData.data.length; i += 4) {
   let red = imageData.data[i];
   let green = imageData.data[i + 1];
   let blue = imageData.data[i + 2];
       
   let grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
       
   imageData.data[i] = grayscale;
   imageData.data[i + 1] = grayscale;
   imageData.data[i + 2] = grayscale;
   } 
   context.putImageData(imageData, 0, 0);
}