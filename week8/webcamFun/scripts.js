const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// if you add a filter add another false to this array
let filter = [false, false, false]


function getVideo(){
   navigator.mediaDevices.getUserMedia({ video: true, audio: false})
      .then(localMediaStream => {
      console.log(localMediaStream);
      //video.src = window.URL.createObjectURL(localMediaStream); this does work.
      video.srcObject = localMediaStream; //had to find this. This wasn't easy. https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      video.play();
   })
   .catch(err => {
      console.error(`Are you really going to do that to me`, err);
   })
}

function paintToCanvas(){
   const width = video.videoWidth;
   const height = video.videoHeight;
   canvas.width = width;
   canvas.height = height;

   return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      // take the pixels out
      let pixels = ctx.getImageData(0, 0, width, height);
      // do stuff with them
      if(filter[0] === true){
      pixels = redEffect(pixels);
      }
      if (filter[1] === true){
      pixels = rgbSplit(pixels);
      }
      if (filter[2] === true){
      pixels = greenScreen(pixels);
      }
      // put them back in
      ctx.putImageData(pixels, 0, 0);

   }, 16);
}

/*****************************************************
 * Filters Functions
 ****************************************************/
// filter1
function redEffect(pixels){
   for(let i=0; i < pixels.data.length; i += 4){
      // RED
      pixels.data[i] = pixels.data[i] + 100;
      // GREEN
      pixels.data[i+1] = pixels.data[i+1] - 50;
      // BLUE
      pixels.data[i+2] = pixels.data[i+2] * 0.5;
   }
   return pixels
}

//filter2
function rgbSplit(pixels){
   for(let i=0; i < pixels.data.length; i += 4){
      // RED
      pixels.data[i - 10] = pixels.data[i];
      // GREEN
      pixels.data[i + 500] = pixels.data[i+1];
      // BLUE
      pixels.data[i - 550] = pixels.data[i+2];
   }
   return pixels
}

// filter3
function greenScreen(pixels) {
   const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
   });

   for (i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i];
      green = pixels.data[i+1];
      blue = pixels.data[i+2];
      alpha = pixels.data[i+3];

      if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax){
         pixels.data[i+3] = 0;
      }
   }
   return pixels;
}

/*************************************************
 * Toggle Filters on/off
 ************************************************/
function toggleRed() {
   if(filter[0] === false){
      filter[0] = true;
   } else {
      filter[0]= false;
   }
}

function toggleRGB() {
   if(filter[1] === false){
      filter[1] = true;
   } else {
      filter[1] = false;
   }
}

function toggleGreen() {
   if(filter[2] === false){
      filter[2] = true;
      document.querySelector("#greenScreenSliders").classList.remove("hidden");
   } else {
      filter[2] = false;
      document.querySelector("#greenScreenSliders").classList.add("hidden");
   }
}

function removeFilters(){
   for( let i=0; i < filter.length; i++){
      filter[i] = false;
   }

}

function takePhoto() {
   // play the click sound
   snap.currentTime = 0;
   snap.play();

   // now take the actual picture and save it some where
   const data = canvas.toDataURL("image/png");
   const link = document.createElement("a");
   link.href = data;
   link.setAttribute("download", "some_dude");
   link.innerHTML = `<img src="${data}" alt="Some Dude" />`
   strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas); //this make sure the webcam is sorted and sending video before starting the paint to canvas function