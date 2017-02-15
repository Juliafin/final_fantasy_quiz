// TODO
/*
1. Attach an event listener on the main submit buttons
2. When the welcome scrren submit button is pressed, increment a counter for the question (also used as an index to push the answers) Create 4 divs for the answer boxes, one for the question, and one for the question counter, and a button for question submits. Also delete the button on the press.
3. Make a state object with 4 Separate arrays of answers, and also 4 separate arrays for answer letters (one of them being an answer key)
4. Use the counter to push indexes of those 5 arrays and concatenate them with a letter at the beginning.
5. use regex to parse the letter at the beginning, and push them into the appropriate div
6. When the submit is pressed, a click must be registered on one of the boxes (also turning that box green with an alpha gradient ).
7. Make sure that only one box can be clicked at a time (by removing the "selected" class from the buttons that are not clicked.)
8. Use the event.target to determine which element was clicked.
9. Add an if statement for submit buttons that tests whether a button is currently selected
10. When the submit button is pressed,
parse the selected box, and check whether the content of the answer div selected answer matches at the current index for the answer array. Do this by using regex to strip the (A., B., C., D.) from the div text, matching it against the current index of the answer key (if statement)
11. If it does, increment the "questions right" in the question box. Then flash the divs not selected with a red alpha gradient.
12. On the last submit button press (add an if statement on the current index), remove the quiz divs, and create a new set of divs showing the user their result, and congratulating the user for making it through the quiz. Also, the last question is free no matter what, so match the result regardless (if statement on the last question)

Stretch goals:
LV for questions
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

  questionCounter: 0,
  questionIndex: -1,
  questionIsCorrect: 0,
  questionIsWrong: 0,
  quizFinished: 0
}

// State Modification functions
function quizHtmlCreateAndAppend(characterClass) {
  quizState.questionIndex += 1;
  quizState.questionCounter += 1

  var answerLetterArr = quizState.answerChoices;
  var index = quizState.questionCounter;
  var answers = quizState.questionsAndAnswers[index].answers;
  var questionNoNumber = quizState.questionsAndAnswers[index].question;
  var currentQuestionNum = quizState.questionCounter;
  var currentQuestion = currentQuestionNum + ". " + questionNoNumber
  var ansNotify = "You have " + quizState.questionIsCorrect + " questions correct out of 10.";
  var ansA = answerLetterArr[0] + answers[0];
  var ansB = answerLetterArr[1] + answers[1];
  var ansC = answerLetterArr[2] + answers[2];
  var ansD = answerLetterArr[3] + answers[3];
  var quizHtml = (`
    <div class= "main-quiz">
    <div class= "Question">${currentQuestion}</div>
    <div class= "answer-A answers"><p>${ansA}</p></div>
    <div class= "answer-B answers"><p>${ansB}</p></div>
    <div class= "answer-C answers"><p>${ansC}</p></div>
    <div class= "answer-D answers"><p>${ansD}</p></div>
    <div class= "avatar"></div>
    <div class= "answer-notify"><p>${ansNotify}</p></div>
    <button class="answer-submit">Submit Answer</button>
    </div>
    `);
    $('.welcome-screen').remove();
    $('body').append(quizHtml);
    $('.avatar').addClass(characterClass);
}

// TODO finish this function
function answerIsCorrect() {
  quizState.questionIsCorrect +=1;
  quizState.questionIndex +=1;
  quizState.questionCounter +=1;
}

// TODO finish this function
function answerIsWrong() {
  quizState.questionIsWrong +=1;
  quizState.questionIndex +=1;
  quizState.questionCounter +=1;
}

// Event Listeners

// Audio listener

// hover
var menuMove = $('#menu_move')[0];
$('.answers, .answer-submit, .char, .avatar').mouseenter(function() {
  menuMove.pause();
  menuMove.play();
})


// mouse click

var clickAnswer = $('#menu_click_answer')[0];
$('.answers, .char').click(function(event) {
  clickAnswer.pause();
  clickAnswer.play();
});



// Welcome listener

$('button.welcome-text, .char').click(function(event){
  var clickedCharClass= $(this).attr('class').replace('char','');
  quizHtmlCreateAndAppend(clickedCharClass);
});
