// Assignment code here
function generatePassword() {
  
  // Define character sets
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // Ask user for password length
  let passwordLength = parseInt(prompt("How many characters would you like your password length to contain?"));

  // Validate password length
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert("Please enter a valid number between 8 and 128.");
    passwordLength = parseInt(prompt("Choose a password length between 8 and 128 characters:"));
  }

  function getAvailableChars() {
    let availableChars = "";
    // Ask user for character types
    includeLowerCase = confirm("Do you want to include lowercase characters?");
    includeUpperCase = confirm("Do you want to include uppercase characters?");
    includeNumbers = confirm("Do you want to include numbers?");
    includeSpecialChars = confirm("Do you want to include special characters?");

    // Append selected character sets to available characters
    if (includeLowerCase) {
      availableChars += lowerCaseChars;
    }
    if (includeUpperCase) {
      availableChars += upperCaseChars;
    }
    if (includeNumbers) {
      availableChars += numberChars;
    }
    if (includeSpecialChars) {
      availableChars += specialChars;
    }

    // Validate that at least one character type is selected
    if (availableChars === "") {
      alert("You must select at least one character type.");
      return getAvailableChars();
    }

    return availableChars;
  }

  // Usage
  let availableCharacters = getAvailableChars();

  // Generate the password
  let generatedPassword = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    generatedPassword += availableCharacters[randomIndex];
  }

  // Validate that all selected character types are included
  function isValidPassword(password) {
    if (includeLowerCase && !password.split('').some(char => lowerCaseChars.includes(char))) return false;
    if (includeUpperCase && !password.split('').some(char => upperCaseChars.includes(char))) return false;
    if (includeNumbers && !password.split('').some(char => numberChars.includes(char))) return false;
    if (includeSpecialChars && !password.split('').some(char => specialChars.includes(char))) return false;
    return true;
  }


  while (!isValidPassword(generatedPassword)) {
    generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        generatedPassword += availableCharacters[randomIndex];
    }
  }
  
  return generatedPassword;
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
