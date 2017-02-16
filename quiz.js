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
Hp/MP for answered questions
Avatar and Name choice
Custom Cursor - hand V
sound effects - chirp V

*/

var quizState = {

  questionsAndAnswers: [

    {
      question: "How many adventurers were you able to play as in Final Fantasy I (Nes)?",
      answers: ["1", "2", "3", "4"],
      correctAnswer: "4"
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

  //letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], //etc.

  questionCounter: 0,
  questionIndex: -1,
  questionIsCorrect: 0,
  questionIsWrong: 0,
  quizFinished: 0,
  characterClass: ''

  // Can the character state be here?
}

// State Modification functions
// function renderQuestion()
function quizHtmlCreateAndAppend() {
  // Iterate index counters to access appropriate questions

  //var question = quizState
  //  .questionsAndAnswers[quizState.currentQuestion];

  quizState.questionIndex += 1;
  quizState.questionCounter += 1;

  // Declare variables and create HTML
  var level = quizState.questionCounter;
  // Concat Answers
  var answerLetterArr = quizState.answerChoices;
  var index = quizState.questionCounter;
  var answers = quizState.questionsAndAnswers[index].answers;

  // Concat Questions
  var questionNoNumber = quizState.questionsAndAnswers[index].question;
  var currentQuestionNum = quizState.questionCounter;
  var currentQuestion = "LV " + currentQuestionNum + ": " + questionNoNumber

  // TODO
  // Concat Notify

  // var currentHP =

  var ansNotify = "You have " + '<span class="questions-correct">' + quizState.questionIsCorrect + "</span>" + " questions correct out of 10.";


  var ansA = answerLetterArr[0] + answers[0];
  var ansB = answerLetterArr[1] + answers[1];
  var ansC = answerLetterArr[2] + answers[2];
  var ansD = answerLetterArr[3] + answers[3];
  var quizHtml = (`
    <div>
    <div class= "js-main-quiz main-quiz">
    <div class= "question">${currentQuestion}</div>
    <div class= "answer-A js-answers answers"><p>${ansA}</p></div>
    <div class= "answer-B js-answers answers"><p>${ansB}</p></div>
    <div class= "answer-C js-answers answers "><p>${ansC}</p></div>
    <div class= "answer-D js-answers answers"><p>${ansD}</p></div>
    <div class= "js-level level">Level ${level}</div>
    <div class= "js-avatar avatar"></div>
    <div class= "answer-notify"><p>${ansNotify}</p></div>
    <button class="js-answer-submit answer-submit">Submit Answer</button>
    </div>
    </div>
    `);

  // Remove existing html and append to DOM
  $('.js-welcome-screen').remove();
  $('body').append(quizHtml);
  $('.js-avatar').addClass(quizState.characterClass);

  // Re-establish audio listeners
  mouseClicklisten();
  mouseHoverlisten();
}

// TODO finish this function
// add checks on if selected elements have a class
function answerIsCorrect() {
  quizState.questionIsCorrect += 1;
  quizState.questionIndex += 1;
  quizState.questionCounter += 1;
}

// TODO finish this function
function answerIsWrong() {
  quizState.questionIsWrong += 1;
  quizState.questionIndex += 1;
  quizState.questionCounter += 1;
}

// Event Listeners

// Audio listeners

// hover
function mouseHoverlisten() {
  var menuMove = $('#menu_move')[0];
  $('.js-answers, .js-answer-submit, .char, .js-avatar').mouseenter(function() {
    menuMove.pause();
    menuMove.play();
  });
}
mouseHoverlisten();

// mouse click
function mouseClicklisten() {
  var clickAnswer = $('#menu_click_answer')[0];
  $('div .js-answers, .char').click(function(event) {
    clickAnswer.pause();
    clickAnswer.play();
  });
}
mouseClicklisten();



// Welcome listener
$('button.js-welcome-text, .char').click(function(event) {
  quizState.characterClass = $(this).attr('class').replace('char', '');
  quizHtmlCreateAndAppend();
});


// TODO finish Submit listener
function quizSubmitListen() {
  $('.js-main-quiz .js-answer-submit').click(function(event) {

  });
}
