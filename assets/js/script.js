//Assign variables in global scope for the button element on which the event
//listener will listen for a click, for passwordLength, specific character arrays,
//and masterArray. Because there is no option to omit numbers from password, 
//masterArray is initialized with the number elements only. Other character arrays, 
//will be pushed into it according to user choice. 
var generateBtn = document.querySelector("#generate");

var passwordLength;
var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var symbolsArray = ["!", "#", "$", "%", "&", "?", "@", "+", "*"];
var masterArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

//This function is called at the beginning of the generatePassword function. It is
//important to reset the masterArray, otherwise it aggregates all the user's 
//selections from each run-through of the program
function init() {
    var passwordText = document.querySelector("#password");
    passwordText.value = ''; // Clear the old password
    masterArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
}

// Helper function, called from the generatePassword function to capture user's
// input as to desired password length and enforce min and max length (8-128) 
// and valid input using a while loop and if conditional. The while loop repeats
// the prompt until the conditions describing a valid input is met. !isNan means
// means that a valid numerical input must be entered.  It protects against
// the user entering nothing or writing in their number as a string (eg. twelve).
// Actually even 12 is a string, but one that parseInt can convert to the datatype of 
// number so that > and < comparison operators can be applied to it.      
function getPasswordLength() {
    while (true) {
        passwordLength = prompt("What is the desired length of your password?", "A Number between 8 and 128");
        passwordLength = parseInt(passwordLength);
        if (passwordLength >= 8 && passwordLength <= 128 && !isNaN(passwordLength)) {
            return passwordLength;
        }
    }
}
        
// Helper function, called from the generatePassword function to return an object 
// with a true or false value for each character criterion property. Symbols are 
// optional, but the if conditional is used to exclude a case where the user wants
// to include no letter characters at all. In this case they will receive an alert
// advising them that they must allow either upper or lower case letters, if not 
// both, and the function will be recursively called until they provide valid input.  
function getCharacterTypes() {
    var hasLowerCase = confirm("Confirm OK to include lower case letters (Cancel will exclude them)");
    var hasUpperCase = confirm("Confirm OK to include upper case letters (Cancel will exclude them)");
    var hasSymbols = confirm("Confirm OK to include special characters eg. $ ! # etc. (Cancel will exclude them)");
    
    if (!hasLowerCase && !hasUpperCase) {
        alert("Passwords must have some letters. Please confirm OK for either lower or upper case, if not both");
        return getCharacterTypes();
    }
    
    return {
        hasLowerCase: hasLowerCase,
        hasUpperCase: hasUpperCase,
        hasSymbols: hasSymbols
    };
}

// This function is called by the writePassword function (the handler function for the click event).
// After calling function init to clear the old password and restore the masterArray to containing only
// numbers (in a case where the user is running through this program more than once), the generatePassword
// function calls two helper functions which return to it the user's desired passwordLength, and an object 
// expressing the user's choices as to characterTypes to include. I have left in the console log statements 
// that check that the expected returns have been received (at one point in development the Old masterArray
// and new masterArray console logs played an important role in debugging, because I realized I would have
// to create something to reset the masterArray like function init).   

function generatePassword() {
    init(); // Clears the old password and resets the masterArray to contain only numbers

    console.log("Old masterArray:", masterArray);

    passwordLength = getPasswordLength(); // passwordLength was a variable declared in global scope but here it gets redefined according to the value returned from the getPasswordLength function
    var characterTypes = getCharacterTypes(); //helper function getCharacterTypes is called and the object it returns is stored in a variable
    var selectedCharacters = []; // A new array into which I will push one of each selected character type in order to guarantee that even if a user chooses a short passwordLength they will get 
         //at least one of each kind of character they select. Of course this means I will have to adjust the passwordLength value by subtracting the number of representative characters added into to the selectedCharacters array.

    console.log("Password length:", passwordLength);
    console.log("Character types:", characterTypes);


    // Numbers are mandatory, so I will start creating my selectedCharacters array by pushing in one randomly selected number.
    var randomNumber = Math.floor(Math.random() * 10).toString();
    selectedCharacters.push(randomNumber);
    
    console.log("Random number:", randomNumber);

    // These conditionals examine the getCharacterTypes object and for each "true" push a random one character of that 
    // specific character type into the masterArray. The whole specific character type array is also concatenated with 
    // the masterArray. The aim is to develop the master array as a pool of characters (which characters are included in
    // it depends on user selections) out of which can be fished the right number of random characters to satisfy the user's
    // desired passwordLength 

    if (characterTypes.hasLowerCase) {
        selectedCharacters.push(lowerCaseArray[Math.floor(Math.random() * lowerCaseArray.length)]);
        masterArray = masterArray.concat(lowerCaseArray);
    }
    
    if (characterTypes.hasUpperCase) {
        selectedCharacters.push(upperCaseArray[Math.floor(Math.random() * upperCaseArray.length)]);
        masterArray = masterArray.concat(upperCaseArray);
    }

    if (characterTypes.hasSymbols) {
        selectedCharacters.push(symbolsArray[Math.floor(Math.random() * symbolsArray.length)]);
        masterArray = masterArray.concat(symbolsArray);
    }

    console.log("New masterArray:", masterArray);

    // Possible lengths of the selectedCharacters array are 2-4.  This number must be subtracted from the 
    // passwordLength the user has desired, so that the masterArray (enlarged by concatenation to include the full
    // array of each specific character type selected) can be iterated through that number of times to 
    // supply the REST of the characters not already added into the selectedCharacters array).  So this line
    // takes the passwordLength value (ie. the value for desired password length the user has inputted) and subtracts
    // the length of the selectedCharacters array (currently filled with 2-4 characters, one of each type the user has
    // selected), and the difference is stored back into the passwordLength variable as its new updated value)
    passwordLength -= selectedCharacters.length;

    // This line converts what was formerly an array of individual string-type characters into a single string.  It stores
    // this single string into the variable password which is what will eventually be written to the passwordText element to 
    // be rendered on the screen
    var password = selectedCharacters.join("");

    // But first the rest of the characters have to be fished out of the masterArray at random, so that the password is made
    // up of the number of characters the user has indicated is their desired passwordLength.  A variable randomIndex takes the 
    // masterArray.length as its upper limit, and uses Math.floor(Math.random), to arrive at a randomized number between 0 and .9999
    // which it will multiply by this upper limit so that the index falls randomly between 0 and a tenth of a decimal short of the upper
    // limit length. Essentially this gives an index that falls within the masterArray length, which can be used to fish out an individual
    // random character. This "fishing" process is reiterated using the for loop while the index is less than the adjusted value of
    // passwordLength.  Each randomly fished out character is added into the password string and value of the password variable is 
    // updated to reflect the augmented string.

    for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * masterArray.length);
        password += masterArray[randomIndex];
    }

    console.log("Final password:", password);
    
    // At the end, generatePassword returns a string, reflecting the user's desired password length, of randomly selected characters, only of 
    // those types the user has chosen to include. The string is returned to the writePassword function which called the generatePassword function.
    return password; 
}

function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password"); // This line gives access to the text area where the generated password will be written
    var gif = document.querySelector("#gif"); // I thought I would create interest in the otherwise rather bland HTML by adding in a gif.  This 
    // line allows me to access the gif element.  A few style and structure adjustments were made to the HTML and CSS source files accordingly.

    passwordText.value = password;

    passwordText.style.display = "block"; // Initially the CSS sets the display value to none for this element. Once the password is ready to be written
    // I want this white text box (opacity controlled in CSS) to appear overtop of the gif.
}
    
generateBtn.addEventListener("click", writePassword); // This line listens for a click event on the generateBtn element and handles that event with the 
    // writePassword function. Within the writePassword function, the generatePassword function is called, which in turn calls three other functions to help 
    // it return its value of password to the the writePassword function.

   
