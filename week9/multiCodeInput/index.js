const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');
const button = document.querySelector('#verifyBTN');

function handleInput(e){
   // check for data that was entered and if there is another input set focus to it and selects the text in the input if there is any.
   //console.log(e);
   const input = e.target;
   console.log(input.nextElementSibling)
   if (input.nextElementSibling && input.value){
      input.nextElementSibling.focus();
      input.nextElementSibling.select();
   }
   if(input.nextElementSibling == null && input.value != ''){
      button.focus();
   }   
}

function handleBackSpace(e){
   const input = e.target;
   if (input.previousElementSibling && input.value == ''){
      input.previousElementSibling.focus();
      input.previousElementSibling.select();
   }
}

function handlePaste(e){
   const paste = e.clipboardData.getData('text');
   //console.log(paste);
   // loop over each input, and populate it with the index of the pasted string
   inputs.forEach((input, i) =>{
      //console.log(input);
      input.value = paste[i] || "";
   })
   if(checkInputs()){
      button.focus();
   }
}

function checkInputs(){
   let test = 0;
   inputs.forEach((input) => {
      if(input.value){
         test++;
      }
   });
   if (test >= 6){
      return true;
   } else {
      return false;
   }
}

inputs[0].addEventListener('paste', handlePaste);
form.addEventListener('input', handleInput); // we are using event delegation here
form.addEventListener('keydown', (e)=> {
   const key = e.key;
   if (key === 'Backspace' || key === 'Delete'){
      handleBackSpace(e);
   }
})


// Test numbers
// 123456
// 759843
// i4b8s4
// 123

// bonus stuff
// 1. select the text when the next input is focused (DONE)
// 2. Auto submit the form if all fields are filled after a paste (DONE)
// 3. support for backspacing from 1 input to another (DONE)