// Assignment Code
var generateBtn = document.querySelector("#generate");

//My code down to line 51. Assignment of global variables.  
//The user will select their desired password length and if they want a certain character type included, I will add all the characters of that type to the master array which presently consists only of numbers, which the password must have by default
var passwordLength = 12; 
var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var symbolsArray = ["!", "#", "$", "%", "&", "?", "@", "+", "*"];
var masterArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function defineMasterArray() {
// Store user's desired password length in a variable, disallowing the edge cases 
var passwordLength = Number(prompt("What is the desired length of your password?", "A Number between 8 and 128"));
    if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
      alert("Please select a number between 8 and 128");
      return 
    }

// Store user's preferences re: character types in variables and use this to build a masterArray of all user-selected characters. 
var hasLowerCase = confirm("Confirm OK to include lower case letters (Cancel will exclude them)");
var hasUpperCase = confirm("Confirm OK to include upper case letters (Cancel will exclude them)");
    /*if (hasLowerCase === false && hasUpperCase === false) {
        alert("Passwords must have some letters. Please confirm OK for either lower or upper case, if not both");
        */
var hasSymbols = confirm("Confirm OK to include special characters eg. $ ! # etc. (Cancel will exclude them)");

// Now that the user-dependent variables have known values, I can build up my masterArray by adding in one user selection at a time.  
if(hasLowerCase) {
    masterArray = [...masterArray, ...lowerCaseArray]; 
}  
if(hasUpperCase) {
    masterArray = [...masterArray, ...upperCaseArray]; 
}
if(hasSymbols) {
    masterArray = [...masterArray, ...symbolsArray];

        return masterArray;
}
};

//The defineMasterArray function is called from within the generatePassword function and returns its master array back here as a pool to be fished out of using the Math.random method, for as many iterations as the user has selected for password length.    
 function generatePassword() {
defineMasterArray();
        var password = "";
        for(var i = 0; i <passwordLength; i++){
            var randomIndex = Math.floor(Math.random() * masterArray.length);
            password += masterArray[randomIndex];
        }
        return password;   
    }

//This sourcecode was given.  It looks after writing the password to the document
    function writePassword() {
        var password = generatePassword();
        var passwordText = document.querySelector("#password");
      
        passwordText.value = password;
      }

//This sourcecode was given. It fires the function to write the password after input gathering and internal machinations by the computer to randomize a password based on the user's selected criteria.
generateBtn.addEventListener("click", writePassword);

//This code has two bugs.  Instead of the user's password length getting through to the generate password function that function is accessing the default of 12.  Also the password stays written if I click and start the process again.j 
//Also see the comment at lines 23-25.  There is currently nothing preventing the user from selecting no letters at all.  Also at line 16 there should be something preventing the generator from going ahead and giving a password if a legal password length is not entered.    
