// Develper Hat:
//  - data structures
//  - algorithms (methods)
// Designer Hat:
//  - user experience
//  - design beauty
// Business Hat:
//  - functionality, design, etc.
//  - monization
//  - marketing

/*
1. data + algorithms (no ui) <-- defense
2. very basic design (has ui) <-- offense
3. better design
   - JS(events, dom, html), html, css, images, sounds, etc.

Offense - sells tickets
Defense - wins games
*/

// <-- file: ui.js
/*
var quiz = require('./quiz.js'); // <-- has all quiz logic
var container = $('#content');

function renderQuestion(question) {
  container.append('<div class= "question">'+question+'</div>');
}

function renderAnswer(answer) {
  container.append('<div class= "answer-A answers"><p>'+answer+'</p></div>');
}

function removeContent() {
  container.html('');
}

function renderState() {
  var question = quiz.getCurrentState();

  // code to draw the questions on the screen
  removeContent();
  renderQuestion(question.question);
  question.answers.forEach(function(answer) {
    renderAnswer(question.answer);
  });

  // event handlers here
  $('button.submitAnswer').click(function() {
    var answer = $('div.question.selected').data('answer');
    quiz.answer(answer);
    renderState();
  });
}

function start() {
  quiz.init([{question:'', answers:[], answer:-1}]);
  renderState();
}
*/

// TODO
/*
1. V Attach an event listener on the main submit buttons
2. V When the welcome scrren submit button is pressed, increment a counter for the question (also used as an index to push the answers) Create 4 divs for the answer boxes, one for the question, and one for the question counter, and a button for question submits. Also delete the button on the press.
V * Implemented alternate solution involving different data structures : 3. Make a state object with 4 Separate arrays of answers, and also 4 separate arrays for answer letters (one of them being an answer key)
4. V Use the counter to push indexes of those 5 arrays and concatenate them with a letter at the beginning.
5. * This was optional * use regex to parse the letter at the beginning, and push them into the appropriate div
6. When the submit is pressed, a click must be registered on one of the boxes (also turning that box green with an alpha gradient ).
7. Make sure that only one box can be clicked at a time (by removing the "selected" class from the buttons that are not clicked.)
8. Use the event.target to determine which element was clicked.
9. Add an if statement for submit buttons that tests whether a button is currently selected
10. When the submit button is pressed,
parse the selected box, and check whether the content of the answer div selected answer matches at the current index for the answer array. Do this by using regex to strip the (A., B., C., D.) from the div text, matching it against the current index of the answer key (if statement)
11. If it does, increment the "questions right" in the question box. Then flash the divs not selected with a red alpha gradient.
12. On the last submit button press (add an if statement on the current index), remove the quiz divs, and create a new set of divs showing the user their result, and congratulating the user for making it through the quiz. Also, the last question is free no matter what, so match the result regardless (if statement on the last question)

Stretch goals:
LV for questions V
Hp/MP for answered questions V
Avatar and Name choice V not name choice
Custom Cursor - hand V
sound effects - chirp V
fix cursor offset
sound effect for submit button
*/

//Main Quiz State
var quizState = {

  questionsAndAnswers: [

    {
      question: "How many adventurers were you able to play as in Final Fantasy I (Nes)?",
      answers: ["One", "Two", "Three", "Four"],
      correctAnswer: "Four"
    },

    {
      question: "What was the Japanese Version of Final Fantasy IV originally called in the US?",
      answers: ["Final Fantasy 4", "Final Fantasy 2", "Final Fantasy 5", "Final Fantasy 3"],
      correctAnswer: "Final Fantasy 2"
    },

    {
      question: 'Who is the "spoony bard" in Final Fantasy IV?',
      answers: ["Cecil", "Edward", "Kain", "Edge"],
      correctAnswer: "Edward"
    },

    {
      question: "Which character undergoes a redemption and becomes a paladin in Final Fantasy IV?",
      answers: ["Rosa", "Rydia", "Cecil", "Golbez"],
      correctAnswer: "Cecil"
    },

    {
      question: "In Final Fantasy VI, which character is featured on the box artwork for the US version?",
      answers: ["Mog", "Locke", "Sabin", "Terra"],
      correctAnswer: "Mog"
    },

    {
      question: "What is the villain Kefka's goal in Final Fantasy VI?",
      answers: ["To rule the world", "To destroy the world", "Revive the ancient Goddesses by finding the source of magic", "All of the above"],
      correctAnswer: "All of the above"
    },

    {
      question: "In Final Fantasy VII, what weapon does Cloud carry?",
      answers: ["A Scythe", "A Rapier", "A Giant Sword", "A Gun"],
      correctAnswer: "A Giant Sword"
    },

    {
      question: "The major theme of Final Fantasy VIII is:",
      answers: ["Love", "Betrayal", "Revenge", "All of the above"],
      correctAnswer: "Love"
    },

    {
      question: "The animal made most famous by the Final Fantasy Series is:",
      answers: ["A Tigerdog", "A Porcupinefish", "A Lioncat", "A Chocobo"],
      correctAnswer: "A Chocobo"
    },

    {
      question: "The best Final Fantasy game in the series is:",
      answers: ["Final Fantasy IV", "Final Fantasy VI", "Final Fantasy VII", "Final Fantasy VIII"],
      correctAnswer: "All answers are correct!"
    }
  ],

  answerChoices: ['A. ', 'B. ', 'C. ', 'D. '],
  answerClasses: [".answer-A", ".answer-B", ".answer-C", ".answer-D"],


  currentQuestion: 0,
  questionIsCorrect: 0,
  questionIsWrong: 0,
  quizFinished: 0,
  characterClass: '',
  quizSubmitCounter: 0,
  submitClicked: 0,

}



// Shortcut to access quiz content


// State Modification functions
function renderAndIterateQuestion() {
  // Iterate index counters to access appropriate questions
  quizState.currentQuestion += 1;

  // object with the questions, answers,
  var currentQuestionObj = quizState.questionsAndAnswers[quizState.currentQuestion-1];

  // Vars for questions and answers html
  var currentQuestion = currentQuestionObj.question;
  var currentAnswers = currentQuestionObj.answers;
  var letters = quizState.answerChoices;
  var ansA = letters[0] + currentAnswers[0];
  var ansB = letters[1] + currentAnswers[1];
  var ansC = letters[2] + currentAnswers[2];
  var ansD = letters[3] + currentAnswers[3];

  // current Level
  var currentLevel = quizState.currentQuestion;
  // current HP
  var currentHP = 10 - quizState.questionIsWrong;
  // text for continue button
  var toLevelText = "To level " + (currentLevel + 1)

  // variable for the quiz html
  var quizHtml = (`
    <div>
    <div class= "js-main-quiz main-quiz">
    <div class= "question">${currentQuestion}</div>
    <div class= "answer-A js-answers answers"><p>${ansA}</p></div>
    <div class= "answer-B js-answers answers"><p>${ansB}</p></div>
    <div class= "answer-C js-answers answers"><p>${ansC}</p></div>
    <div class= "answer-D js-answers answers"><p>${ansD}</p></div>
    <div class= "js-level level">Level ${currentLevel}</div>
    <div class= "js-level-continue level-continue hidden">${toLevelText}</div>
    <div class="js-current-hp">HP: ${currentHP}/10</div>
    <div class= "js-avatar avatar"></div>
    <div class= "answer-notify"><p>You have <span class="questions-correct"> ${quizState.questionIsCorrect} </span> questions correct out of 10.</p></div>

    <button class="js-answer-submit answer-submit">Submit Answer</button>
    </div>
    </div>
    `);


  // Remove existing html and append to DOM
    $('.js-welcome-screen').remove();
    $('.js-welcome-screen2').remove();
    $('body').append(quizHtml);
    $('.js-avatar').addClass(quizState.characterClass);

  // Re-establish listeners and call new listeners for the main quiz page
    mouseClicklisten();
    mouseHoverlisten();
    answerSelectListen();
    quizSubmitListen();
    continueButtonListen();


}// end of html append function


function resetWelcomeScreen() {
  var welcomeScreenHtml = (`
    <div>
    <header class="header"></header>
    <div class="js-welcome-screen2 welcome-screen2">
    <div class="quiz-report">
      <p>You answered ${quizState.questionIsCorrect} out of 10 questions right!</p>
      <p> You got ${quizState.questionIsWrong} questions wrong!</p>
    </div>
    <div class="quiz-report"></div>
      <button class="js-welcome-text2 welcome-text2">
        <div class="char m-dragoon"></div>
        <div class="char f-dragoon"></div>
        <div class="char m-whitemage"></div>
        <div class="char f-whitemage"></div>
        <div class="char m-redmage"></div>
        <div class="char f-redmage"></div>
        <div class="char m-blackmage"></div>
        <div class="char f-blackmage"></div>
        <div class="char m-ninja"></div>
        <div class="char f-ninja"></div>
        <div class="char m-fighter"></div>
        <div class="char f-fighter"></div>

        <p class="p1">Welcome to the classic Final Fantasy Series Quiz!</p>
        <p class="p2">Please select your Avatar or press space to continue</p>
    </button>

    </div>
  </div>
    `)
    $('body div').remove();
    $('body').prepend(welcomeScreenHtml);

    welcomeListener();
    mouseHoverlisten();
    mouseClicklisten();

}



function resetStateCounters() {
  quizState.currentQuestion= 0
  quizState.questionIsCorrect= 0
  quizState.questionIsWrong= 0
  quizState.characterClass= ''
  quizState.quizSubmitCounter= 0
  quizState.submitClicked= 0
}



// Answer Tests

// Iterates correct answer counter
function answerIsCorrect() {
  quizState.questionIsCorrect += 1;
};
// Iterates incorrect answer counter
function answerIsWrong() {
  quizState.questionIsWrong += 1;
};

// tests if the selected answer is correct, then displays the right and wrong answers
function testSelectedAnswer() {
//

  var selectedAnswer = $("[class*='green-selected']").text().replace(/^.../, "");
  var rightAnswer = quizState.questionsAndAnswers[quizState.currentQuestion-1].correctAnswer;

      if (selectedAnswer === rightAnswer) answerIsCorrect();
       else if (selectedAnswer !== rightAnswer) answerIsWrong();

      var selectionClasses = quizState.answerClasses;
      var answerArray = quizState.questionsAndAnswers[quizState.currentQuestion-1].answers;
      answerArray.forEach(function(element, index){
        if (element === rightAnswer) {
          $(selectionClasses[index]).addClass('green-selected');
        } else {
          $(selectionClasses[index]).addClass('red-selected');

        };

      });
}






// Event Listeners

// Audio listeners

// hover (play sound)
function mouseHoverlisten() {
  var menuMove = $('#menu_move')[0];
  $('.js-answers, .js-answer-submit, .char, .js-avatar').mouseenter(function(event) {
    event.preventDefault();
    menuMove.pause();
    menuMove.play();
  });
}
// Class mouse hover listener
$(document).ready(function(){
  mouseHoverlisten();
});

// mouse click (play sound)
function mouseClicklisten() {
  var clickAnswer = $('#menu_click_answer')[0];
  $('div .js-answers, button.welcome-text .char, button.welcome-text2 .char, .js-answer-submit').click(function(event) {
    event.preventDefault();
    clickAnswer.pause();
    clickAnswer.play();
  });
}

// Call mouseclick listener
$(document).ready(function(){
mouseClicklisten();
});


// Welcome listener - initial listener on welcome screen
function welcomeListener () {
  $('.js-welcome-text, .js-welcome-text2, .char').click(function(event) {
    resetStateCounters();
    quizState.characterClass = $(this).attr('class').replace("char", '');
    renderAndIterateQuestion();
  });
}
// call listener
welcomeListener();


// Answer select (highlight red or green) listener
function answerSelectListen () {
$('.js-answers').click(function(event) {
  var elementsNotSelected = $('.js-answers').not($(this));
  if (quizState.submitClicked === 1) {
    return

  } else if ($(this).hasClass('red-selected')) {
  $(this).removeClass('red-selected');
};

if (elementsNotSelected.hasClass('green-selected')) {
  elementsNotSelected.removeClass('green-selected')
};

$(this).addClass('green-selected');

});
}



// Submit Listener - test and show correct answers, iterate submit counter counter
function quizSubmitListen() {
    // tests if an answer has been submitted: if not alert the user and exit
    $('.js-answer-submit').click(function(event) {
      if (($('.js-answers').hasClass('green-selected')) === false) {
        alert("Please select an answer");
        return

      } else if ( ($('.level-continue').hasClass('hidden')) ) {
        // displays the hidden continue button
        $('.level-continue').removeClass('hidden');
        // locks the selection in place (in the answer select listener)
        quizState.submitClicked = 1;
        // for keeping track of the total number of quiz submits
        // will activate the continue button to reset on the 11th click
        quizState.quizSubmitCounter++;
        testSelectedAnswer();
        $('js-answers').removeClass('green-selected');

          if (quizState.quizSubmitCounter === 10) {
            $('.js-level-continue').text("Restart Quiz");
          }


        // add answer testing functions here

      } else {
        alert("Please click on the To Level button to continue");
      }
  });
}


function continueButtonListen() {
  $('.js-level-continue').click(function(event){
    if (quizState.quizSubmitCounter < 10) {
    event.preventDefault;
    // Reset the submit button
      quizState.submitClicked = 0;
    renderAndIterateQuestion();
  } else {
    resetWelcomeScreen();
  };
});
}
