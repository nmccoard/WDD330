const squareElement = document.getElementById('square');
const square1Element = document.getElementById('square1');
let angle = 0;
let angle1 = 0;

// old school way of doing JS animations
setInterval( () => {
   angle = (angle - 1) % 360;
   squareElement.style.transform = `rotate(${angle}deg)`
}, 1000/60);

// modern ES6 JS way of doing it.
function rotate(){
   angle1 = (angle1 + 2) % 360;
   square1Element.style.transform = `rotate(${angle1}deg)`
   window.requestAnimationFrame(rotate);
}

const id = requestAnimationFrame(rotate);