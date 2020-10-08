/**** first examples in the chapter 8 
// old way of doing things
// const form = document.forms[0];

//above is equivalent to 
//const form = document.getElementByTagname('form')[0];

//but we will go with this
const form = document.forms['search'];
const input = form.elements.searchInput;

//input.addEventListener('blur', () => alert('blurred'), false);
//input.addEventListener('change', () => alert('changed'), false);
form.addEventListener('submit', search, false);

//input.value = 'Search Here';

function search() {
   alert(`You Searched for: ${input.value}`);
   event.preventDefault();
}

// input.addEventListener('focus', function () {
//    if (input.value === 'Search Here') {
//       input.value = ''
//    }
// }, false);
// input.addEventListener('blur', function () {
//    if (input.value === '') {
//       input.value = 'Search Here';
//    }
// }, false);
// or something similar can be done using placeholder
input.placeholder = 'Search Here';
*/

/***** Chapter 8 Hero Examples */
const form = document.forms['hero'];
// validation event listeners should come first
form.addEventListener('submit', validate, false);

form.addEventListener('submit', makeHero, false);

function makeHero(event) {
   event.preventDefault(); // prevent the form from being submitted
   const hero = {}; // create an empty object
   hero.name = form.heroName.value; // create a name property based on the input field's value
   hero.realName = form.realName.value;
   hero.age = form.age.value;

   //hero.powers = [] // lets check to see if our hero has any powers.
   // for (let i=0; i < form.powers.length; i++) {
   //    if (form.powers[i].checked){
   //       hero.powers.push(form.powers[i].value);
   //    }
   // }
   // or the above can be rewritten as 
   hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);

   hero.category = form.category.value;
   hero.city = form.city.value;
   hero.origin = form.origin.value;

   alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
   return hero;
}


function validate(event) {
   const firstLetter = form.heroName.value[0];
   if (firstLetter.toUpperCase() === 'X') {
      alert('Your name is not allowed to start with an X!');
   }
}

/* Class Declaration Example */
class Dice {
   constructor(sides = 6) {
      this.sides = sides;
   }
   roll() {
      return Math.floor(this.sides * Math.random() + 1)
   }
}

const blueDice = new Dice(20);
console.log(`Rolling the blue die: ${blueDice.roll()}`)