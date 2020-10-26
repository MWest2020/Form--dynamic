// You can jump to sections by searching:
//     Global Variables Section
//     AddEventListeners Section
//     Functions Section


//NOTE 23-10-2020: after reading on how to avoid global variables, it came to my attention that in terms of refactoring this needs a lot of work. I will revisit later and rewrite this codebase.



//Focus 'Name' on page load
//Credits to a post on stackoverflow. Had it originally set to document.onload instead of window.onload. This sets certain HTML node is a default mode on pageload.

window.onload = () => {
  document.getElementById('name').focus();
  shirtColors.style.display = 'none';
  selectPayment.value = "credit card";
  selectJobOtherRole.style.display = 'none';
}

/***  
* Global Variables Section
***/

// Retrieves input from activities section
const activity = document.querySelectorAll('.activities input');

//Update the "Color" field, based on choices from the "Theme" field
const shirtDesign = document.getElementById('design');
const shirtColors = document.getElementById('shirt-colors');

//Initially hidden other-title and tile HTML NODES. Other-title Shown if JS is disabled.
const selectJobOtherRole = document.getElementById('other-title');
const selectJob = document.getElementById('title');

//Update the "Color" field to read "Please select a T-shirt theme"
const selectShirtColor = document.getElementById('color');
selectShirtColor.innerHTML = `<option> Please select a T-shirt theme.</option>`;

//Creates an element to display the total cost of activities combined
const costElement = document.createElement('div');
const fieldsetActivities = document.querySelector('.activities');
fieldsetActivities.appendChild(costElement);
let totalCost = 0;

//Payment variables 
const creditCard = document.getElementById('credit-card'); 
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const selectPayment = document.getElementById('payment');

//this hides the default select payment options, except "credit card"
const option = selectPayment.children[0];
option.style.display = 'none';
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Selecting NODES for retrieving form input data  
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const activityCheck = document.querySelector('.activities');
const ccSection = document.getElementById('credit-card');
const ccNumber = document.getElementById('cc-num');
const ccZIP = document.getElementById('zip');
const ccCVV = document.getElementById('cvv');
const ccExpirationMonth = document.getElementById('exp-month');
const ccExpirationYear = document.getElementById('exp-year');

// Creating Nodes for the error message div's
const invalidNameMessage = document.createElement('div');
const emptyFieldMessage = document.createElement('div');
const invalidEmailMessage = document.createElement('div');
const emptyEmailMessage = document.createElement('div');
const noActivitySelected = document.createElement('div');
const ccNumber_invalid = document.createElement('div');
const ccZIP_invalid = document.createElement('div');
const ccCVV_invalid = document.createElement('div');
const ccExpirationMonth_invalid = document.createElement('div');
const ccExpirationYear_invalid = document.createElement('div');

//Inserting the message nodes to the DOM
nameInput.insertAdjacentElement('afterend', invalidNameMessage);
nameInput.insertAdjacentElement('afterend', emptyFieldMessage);
emailInput.insertAdjacentElement('afterend', invalidEmailMessage);
emailInput.insertAdjacentElement('afterend', emptyEmailMessage); 
activityCheck.insertAdjacentElement('afterend', noActivitySelected);
ccNumber.insertAdjacentElement('afterend', ccNumber_invalid);
ccZIP.insertAdjacentElement('afterend', ccZIP_invalid);
ccCVV.insertAdjacentElement('afterend', ccCVV_invalid);
ccExpirationMonth.insertAdjacentElement('afterend', ccExpirationMonth_invalid);
ccExpirationYear.insertAdjacentElement('afterend', ccExpirationYear_invalid);

//Invalid form input messages

invalidNameMessage.innerHTML = '<span class="error">No numbers or special characters accepted)</span>';
emptyFieldMessage.innerHTML = '<span class="empty-name">Name is required</span>';
invalidEmailMessage.innerHTML = '<span class="invalid-email">*Must be a valid email address</span>';
emptyEmailMessage.innerHTML = '<span class="empty-email">Email is required</span>';
noActivitySelected.innerHTML = '<span class="no-activity">Please select an activity</span>'
ccNumber_invalid.innerHTML =  '<span class="invalid-cc-num">Invalid Credit Card Number</span>';
ccZIP_invalid.innerHTML =  '<span class="invalid-zip">Invalid ZIP code</span>';
ccCVV_invalid.innerHTML =  '<span class="invalid-cvv">Invalid CVV number</span>';
ccExpirationMonth_invalid.innerHTML =  '<span class="invalid-cc-num">Please select a month</span>';
ccExpirationYear_invalid.innerHTML =  '<span class="invalid-cc-num">Please select a year</span>';

//Regex' (email regex copied from internet. The rest tested on https://regex101.com/ )

const nameRegex = /^[a-zA-Z]+\s?(([',. -][a-zA-Z ])?[a-zA-Z]*)*\s?$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ccNumRegex = /^\d{13,16}$/;
const zipRegex = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
const ccCvvRegex = /^[0-9]{3,4}$/;

//Variables for hiding or displaying the invalid form input messages
let errorMessage = document.querySelector('.error');
let emptyField = document.querySelector('.empty-name');
let invalidEmail = document.querySelector('.invalid-email'); 
let emptyEmail = document.querySelector('.empty-email'); 
let noActivity = document.querySelector('.no-activity');
let invalidCardNum = document.querySelector('.invalid-cc-num');
let invalidZIP = document.querySelector('.invalid-zip');
let invalidCardVV = document.querySelector('.invalid-cvv');
let expMonth = document.querySelector('.exp-month'); 
let expYear = document.querySelector('.exp-year');

//SUBMIT BUTTON used for the submit event
let submitButton = document.querySelector('[type="submit"]');

/***  
* AddEventListeners Section
***/

selectJob.addEventListener('change', (e) => {
  if(e.target.value === 'other' ){
      selectJobOtherRole.style.display = 'block';
  } else{selectJobOtherRole.style.display = 'none';}
});

shirtDesign.addEventListener('change', (e) => {
  if(e.target.value === 'js puns')  {
      selectShirtColor.innerHTML = 
      `
      <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
      <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
      <option value="gold">Gold (JS Puns shirt only)</option>
      `;
      shirtColors.style.display = 'block';
  } else if (e.target.value === 'heart js') {
      selectShirtColor.innerHTML = 
      `
      <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
      <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
      <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>
      `;
      shirtColors.style.display = 'block';
  } 
})

//This listener listens for checked checkboxes and retrieves data-cost and computes to a total cost for the selected activities and display them in a dynamically generated element
fieldsetActivities.addEventListener('change', (e) => {
  if(e.target.checked){
      let dataCost = e.target.getAttribute('data-cost');
      const activityCost = Number(dataCost);
      totalCost += activityCost;
      costElement.innerHTML = `<span class="totalCost">The total amount is $${totalCost}</span>`;
      return true;
  } else if(!e.target.checked){
      let dataCost = e.target.getAttribute('data-cost');
      const activityCost = Number(dataCost);
      totalCost -= activityCost;
      costElement.innerHTML = `<span class="totalCost">The total amount is $${totalCost}</span>`;
      return false;
  }  
})

//Listens for checked activities and blocks out other activities if day-and-time attributes are the same(and not itself, of course) by iteration. 
fieldsetActivities.addEventListener('input', (e) =>{
  for (i = 0; i <= activity.length; i++) {
    
    if (e.target.checked === true && e.target.dataset.dayAndTime === activity[i].dataset.dayAndTime && e.target.name !== activity[i].name) {
      activity[i].disabled = true; 
      activity[i].parentNode.style.color = 'grey'; 
    } else if (e.target.checked === false && e.target.dataset.dayAndTime === activity[i].dataset.dayAndTime) { 
      activity[i].disabled = false; 
      activity[i].parentNode.style.color = 'black'; 
    }
  }
})


//listens for selected payment option and dynamically generates content.
selectPayment.addEventListener('change', (e) => {
if (e.target.value == 'paypal') {
  paypal.style.display = 'block'; // show paypal div
  creditCard.style.display = 'none';
  bitcoin.style.display = 'none';
  return;
} else if (e.target.value == 'bitcoin') {
  bitcoin.style.display = 'block'; // show bitcoin div
  paypal.style.display = 'none';
  creditCard.style.display = 'none';
  return;
} else if (e.target.value == 'credit card') {
  creditCard.style.display = 'block'; // show credit card div
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
  return;
}
})

//event listeners that fire a callback function to validate input(functions below)
nameInput.addEventListener("input", () => validName());
emailInput.addEventListener("input", () => validEmail());
fieldsetActivities.addEventListener("input", () => validActivity());
ccSection.addEventListener("input", () => validCheck());
ccZIP.addEventListener("input", () => validZIP());
ccCVV.addEventListener("input", () => validCVV());

//
submitButton.addEventListener("click", (e) => {
if(isValidMaster() === false) {
  e.preventDefault();
} 
})


/***  
* Functions Section
***/

function validName(validator) {
  //check if name field isn't empty
  if (nameRegex.test(nameInput.value) || !nameInput.value === ""){
    emptyField.style.display = 'none';
    } else if (nameInput.value === ""){
    emptyField.style.display = 'block';
    return false;
  }
    //checks name field input via regex for strings that have no special characters.
  if (nameRegex.test(nameInput.value) === true && nameInput.value !== ""){
    errorMessage.style.display = 'none';
    return true;
  } else if (!nameRegex.test(nameInput.value) && nameInput.value.length > 0){
    errorMessage.style.display = 'block';
    return false;
  }
}

function validEmail(validator) {
  //check if email field isn't empty
  if (emailRegex.test(emailInput.value) || !emailInput.value === ""){
    emptyEmail.style.display = 'none';
  } else if (emailInput.value === ""){
    emptyEmail.style.display = 'block';
    return false;
  }
  //checks email field input via regex for valid email addresses.
  if(emailRegex.test(emailInput.value) === true && emailInput.value){
    invalidEmail.style.display = 'none';
    return true;
  } else if (!emailRegex.test(emailInput.value) && emailInput.value.length > 0){
    invalidEmail.style.display = 'block';
    return false;
  }
}

function validActivity() {
    //if no activities are checked, it returns false and show and error message
  const activityChecked = document.querySelectorAll(" [type='checkbox']:checked" ); // check for 
    if (activityChecked.length == 0) { 
      noActivity.style.display = 'block';
      return false;
    } else {
      noActivity.style.display = 'none';
      return true;
    } 
}

function validCheck() {
//checks credit card number field input via regex for a numeric sequence ranging 13-16.
  if (!ccNumRegex.test(ccNumber.value)){
    invalidCardNum.style.display = 'block';
    return false;
  } else if(ccNumRegex.test(ccNumber.value)){
    invalidCardNum.style.display = 'none';
    return true;
  } 
}

function validZIP() {
//checks ZIP codefield input via regex for a numeric sequence with a length of 5.   
if (!zipRegex.test(ccZIP.value)){
    invalidZIP.style.display = 'block';
    return false;
  } else if(zipRegex.test(ccZIP.value)){
    console.log(true);
    invalidZIP.style.display = 'none';
    return true;
  } 
}

function validCVV() {
//checks ZIP codefield input via regex for a numeric sequence ranging 3-4.   
if (!ccCvvRegex.test(ccCVV.value)){
  invalidCardVV.style.display = 'block';
  return false;
} else if(ccCvvRegex.test(ccCVV.value)){
  console.log(true);
  invalidCardVV.style.display = 'none';
  return true;
} 
}


// MASTER VALIDATOR
// this function will check if any functions are returning false as boolean and thus preventing the submit button to function. The prevention with trigger error messages on the respective sections of the form. 
function isValidMaster() {
validName();
validEmail();
validActivity();
validCheck();
validZIP();
validCVV();  

  if (validName() == false || validEmail() == false || validActivity() == false||validCheck() == false || validZIP() == false || validCVV() == false) {
    return false;
  } else {
    return true;
  }
}
