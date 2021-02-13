var word = "No Word Assigned!";
var startingLetter = "No Letter Assigned!";
var wordList = [];
var userWordInput = [];
var level = 1;
var timevarible;
var score = 0;
var seconds = 60;

//Display Word and Starting Letter
function displayWordDetails(flag = "launchgame"){
    if(seconds != 60 && seconds != 0 && flag == "launchgame")
        window.alert("Complete the current game!");
    else{
        removeElements()
        if(level >= 7)
            document.getElementById("status").innerHTML = "Level 7 will be updated soon!"
        else{
            generateRandomWord()
            if(level > 2 )
                generateRandomStartingLetter()
            generateWordList()
            console.log("Word List: ",wordList)
            launchGame(word,startingLetter,level)
            return true;
        }
    }
}

//Checking Details And Returning The Appropriate Status
function checkDetails(flag = "launchgame"){
    if((seconds == 0 || seconds == 60 ) && flag == "launchgame")
        window.alert("Click on Give me a Word!")
    else if (flag == "Test")
        return true;
    else{
        if(validateUserInput()){
            updateLevel()
            updateScore("increase")
            removeElements()
            document.getElementById("status").innerHTML = "Correct Answers! Click on Give Me A Word!"
        }
        else{
            removeElements()
            document.getElementById("status").innerHTML = "Wrong answers! To try again click on Give Me A Word!"
        }
    }
}

//Generates New Word
function requestNewWord(flag = "launchgame"){
    updateScore("decrease")
    removeElements()
    displayWordDetails()
    return true;
}

//Generates Random Words From Pre Existing List
function generateRandomWord(){
    let preExistingWordList = ["animals","food","countries","sports","jobs","hobbies","desserts","desert","fruits","vegetables","clothes","furniture","music"]
    word = preExistingWordList[Math.floor(Math.random() * preExistingWordList.length)];
    return word;
}

//Generate Random Letter 
function generateRandomStartingLetter(){
    let alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    startingLetter = alphabets[Math.floor(Math.random()*alphabets.length)];
    return startingLetter;
}

//Generating The List Of Words From The Third Party Url Using Axios
function generateWordList(){
    axios.get('https://api.datamuse.com/words',{
        crossDomain: true ,
        params:{
            ml:word
        }
    })
    .then(function(response){
        //Extract Words From The JSON Object
        for(var i = 0; i < response.data.length; i++){
            wordList.push(response.data[i].word.toLowerCase())
        }
    })
    .catch(error => document.getElementById("status").innerHTML ="There is a Error in Retrieving Data. Try Again" )
    return wordList.length != 0 ? true : false ;
}

//Launch The Game With Respect To Levels
function launchGame(word,startingLetter,level){
    document.getElementById("word").innerHTML = "Word: " + word;
    document.getElementById("startingLetter").innerHTML = "Starting Letter: " + startingLetter;
    document.getElementById("level").innerHTML = level;
    var parent = document.getElementById("textfields");
    var count = extractTextFeilds()
    for(let i = 1; i <= count; i++){
        let inputname = "input";
        inputname = document.createElement("input");
        inputname.setAttribute('type', 'text');
        inputname.setAttribute('id',i);
        parent.appendChild(inputname);
    }
    countDown();
    return true;
}

//Return Number Of Textfeilds With Respect To Levels
function extractTextFeilds(){
    switch(level){
        case 1: return 2;
        case 2: return 5;
        case 3: return 2;
        case 4: return 5;
        case 5: return 8;
        case 6: return 10;
    }
}

//Extracting User Inputs
function validateUserInput(){
    var count = extractTextFeilds()
    for(let i = 1; i <= count; i++)
        userWordInput.push(document.getElementById(i).value.toLowerCase());
    return validate(userWordInput,wordList,startingLetter);
}

//Validate The User Inputs
function validate(userWordInput,wordList,startingLetter){
    if(userWordInput.length != new Set(userWordInput).size)
        return false;
    for(var i = 0; i < userWordInput.length; i++){
        let isCheck = false
        for(var j = 0; j < wordList.length; j++){
            if( userWordInput[i] == wordList[j] && (startingLetter.length > 1 || userWordInput[i].startsWith(startingLetter)) ){
                isCheck = true;
                break;
            }
        }
        if(isCheck == false)
            return false;
    }
    return true;
}

//Update Score
function updateScore(str){
    if (str == "increase")
        score = score + 10;
    else if (str == "decrease")
        score = score - 5;
    document.getElementById("score").innerHTML = score;
    return score;
}

//Update Level
function updateLevel(){
    level = level + 1;
    return level;
}

//Timer For 1 Minute
function countDown() {
    seconds = 60;
    function tick() {
        var counter = document.getElementById("timer");
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds); 
        if( seconds > 0 ) {
            timevarible = setTimeout(tick, 1000);
        } 
        else {
            removeElements()
            document.getElementById("status").innerHTML = "Time Up! Click on Give Me A Word to try again!"
        }
    }
    tick();
    return true;
}

//Removing The Input, Word And Starting Letter Fields And Clearing Neccessary Data
function removeElements(){
    wordList = [];
    userWordInput = [];
    clearTimeout(timevarible);
    seconds = 60;
    word = "No Word Assigned!";
    startingLetter = "No Letter Assigned!";
    document.getElementById("status").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("startingLetter").innerHTML = "";
    document.getElementById("timer").innerHTML = "0:00";
    let parent = document.getElementById("textfields")
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    return (wordList.length == 0 && userWordInput.length == 0 && seconds == 60) ? true : false ;
}