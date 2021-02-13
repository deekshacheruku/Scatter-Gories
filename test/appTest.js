let HTMLElements = {};
document.getElementById = jasmine.createSpy('HTML Element').and.callFake(function (ID) {
  if (!HTMLElements[ID]) {
    var newElement = document.createElement('div');
    HTMLElements[ID] = newElement;
  }
  return HTMLElements[ID];
});
console.log(HTMLElements)
function isElement(element) {
  return element instanceof Element ;
}

describe("Checking Level", function () {
  it("updateLevel function should be defined",function(){
    expect(updateLevel()).toBeDefined();
  });

  it("Checking level HTML Element",function(){
    expect(isElement(document.getElementById("level"))).toBeTrue();
  })

  it("Level change upon validating user answers", function () {
    expect(updateLevel()).toEqual(jasmine.any(Number));
  });
});

describe("Checking Score",function(){
  it("updateScore function should be defined",function(){
    expect(updateScore()).toBeDefined();
  });

  it("Checking score HTML Element",function(){
    expect(isElement(document.getElementById("score"))).toBeTrue();
  })

  it("Increasing score after positive results of validation of user answers",function(){
    expect(updateScore("increase")).toEqual(jasmine.any(Number));
  });
  
  it("Decreasing score after negative results of validation of user answers",function(){
    var expectedScore = 5;
    expect(updateScore("decrease")).toEqual(jasmine.any(Number));
  });
});

describe("Checking Countdown", function() {
  beforeEach(function() {
    jasmine.clock().install();
    timerHTMLElement=document.getElementById("timer")
  });
  
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("countDown function should be defined",function(){
    expect(countDown()).toBeDefined();
  });

  it("Checking timer HTML Element",function(){
    expect(isElement(document.getElementById("timer"))).toBeTrue();
  })
  
  it("After a second", function() {
    countDown();
    expect(timerHTMLElement.textContent).toBe("0:59");
  });

  it("After two seconds", function(){
    countDown();
    jasmine.clock().tick(1000);
    expect(timerHTMLElement.textContent).toBe("0:58");
  });
  it("After thirty seconds",function(){
    countDown();
    jasmine.clock().tick(29000);
    expect(timerHTMLElement.textContent).toEqual("0:30");
  });

  it("Completion of one minute",function(){
    countDown();
    jasmine.clock().tick(59000);
    expect(timerHTMLElement.textContent).toEqual("0:00");
  });
});

describe("Generating a random word",function(){
  it("generateRandomWord function should be defined",function(){
    expect(generateRandomWord()).toBeDefined();
  });

  it("Checking word HTML Element",function(){
    expect(isElement(document.getElementById("word"))).toBeTrue();
  })

  it("Word should be generated from the pre-existing word list only.",function(){
    preExistingWordList = ["animals","food","countries","sports","jobs","hobbies","desserts","desert","fruits","vegetables","clothes","furniture","music"]
    expect(preExistingWordList).toContain(generateRandomWord());
  });
})

describe("Generating a random starting letter",function(){
  it("generateRandomStartingLetter function should be defined",function(){
    expect(generateRandomStartingLetter()).toBeDefined();
  });

  it("Checking starting letter HTML Element",function(){
    expect(isElement(document.getElementById("startingLetter"))).toBeTrue();
  })

  it("Starting letter should be defined from 26 alphabets only",function(){
    alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    expect(alphabets).toContain(generateRandomStartingLetter());
  });
});

describe("Launching Game by generating input text boxes",function(){
  it("launchGame function should be defined",function(){
    expect(launchGame('sds','s',1)).toBeDefined();
  });

  it("Generating input text feilds",function(){
    inputTextFeildHTMLElement=document.getElementById(1);
    expect(isElement(inputTextFeildHTMLElement)).toBeTrue();
  });

  it("Display word,startingletter on the HTML Document",function(){
    launchGame('Jobs','G',1)
    wordHTMLElement=document.getElementById("word");
    expect(wordHTMLElement.textContent).toEqual("Word: Jobs")
    startingLetterHTMLElement=document.getElementById("startingLetter")
    expect(startingLetterHTMLElement.textContent).toEqual("Starting Letter: G")
    levelHTMLElement=document.getElementById("level")
    expect(levelHTMLElement.textContent).toEqual("1")
  });
});

describe("Checking status element for displaying the verdict of each level",function(){
  it("Checking status HTML Element",function(){
    expect(isElement(document.getElementById("status"))).toBeTrue();
  }); 

  it("Checking status display",function(){
    document.getElementById("status").innerHTML="Welcome";
    expect(document.getElementById("status").textContent).toEqual("Welcome");
  });

});

describe("Checking Button HTML Elements",function(){
  it("Checking Button HTML Element",function(){
    expect(isElement(document.getElementById("buttons"))).toBeTrue();
  });
})

describe("Checking Rules HTML Element",function(){
  it("Check Rules Element",function(){
    expect(isElement(document.getElementById("rules"))).toBeTrue();
  });
});

describe("Checking dispalyWordDetails function",function(){
  var x = null;
  it("displayWorkDeatils function should be defined",function(){
    expect(displayWordDetails("Test")).toBeDefined();
  });
});

describe("Checking checkDetails function",function(){
  it("checkDetails function should be defined",function(){
    expect(checkDetails("Test")).toBeDefined();
  });
});

describe("Checking requestNewWord function",function(){
  it("requestNewWord function should be defined", function(){
    expect(requestNewWord()).toBeDefined();
  });
});

describe("Checking generateWordList function",function(){
  it("generateWordList function should be defined", function(){
    expect(generateWordList()).toBeDefined();
  });
});

describe("Checking extractTextFeilds function",function(){
  it("extractTextFeilds function should be defined", function(){
    expect(extractTextFeilds()).toBeDefined();
  });

  it("Checking the return value of extractTextFeilds function",function(){
    expect(extractTextFeilds()).toEqual(jasmine.any(Number));
  });
});

describe("Checking validate function",function(){
  it("validate() should be defined",function(){
    userList=["red","yellow"]
    wordList=["yellow","red"]
    expect(validate(userList,wordList,"K")).toBeDefined();
  });

  it("Return true if both list matches",function(){
    userList=["red","yellow"]
    wordList=["yellow","red"]
    expect(validate(userList,wordList,"Not Assigned")).toBeTrue();
  });

  it("Return false if both list doesn't matches",function(){
    userList=["red","yellow"]
    wordList=["yellow","green"]
    expect(validate(userList,wordList,"Not Assigned")).toBeFalse();
  });

  it("Return true if both list matches along with starting letter",function(){
    userList=["Biscuits","Bread"]
    wordList=["Bread","Biscuits"]
    expect(validate(userList,wordList,"B")).toBeTrue();
  });

  it("Return false if both list doesn't matches along with starting letter",function(){
    userList=["Bread","Bald"]
    wordList=["Biscuits","Bread"]
    expect(validate(userList,wordList,"B")).toBeFalse();
  });

  it("Return false if both list matches and same set of words exists in userlist",function(){
    userList=["red","red"]
    wordList=["red","green"]
    expect(validate(userList,wordList,"Not Assigned")).toBeFalse();
  });
});

describe("Checking removeElements function",function(){
  it("removeElemnts function should be defined ",function(){
    expect(removeElements()).toBeDefined();
  });

  it("Checking status,word,startingletter,timer,textfeilds HTML Elements",function(){
    removeElements()
    statusHTMLElement=document.getElementById("status");
    expect(statusHTMLElement.textContent).toEqual("")

    wordHTMLElement=document.getElementById("word");
    expect(wordHTMLElement.textContent).toEqual("")

    startingletterHTMLElement=document.getElementById("startingLetter");
    expect(startingletterHTMLElement.textContent).toEqual("")

    timerHTMLElement=document.getElementById("timer");
    expect(timerHTMLElement.textContent).toEqual("0:00")

    textfeildsHTMLElement=document.getElementById("textfeilds");
    expect(textfeildsHTMLElement.firstChild).toBeNull();
  });
});