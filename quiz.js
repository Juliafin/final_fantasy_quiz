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
Custom Cursor - hand
sound effects - chirp

*/

var quizState = {
correctAnswers: ["4", "Final Fantasy 2", "Edward", "Cecil", "Mog", "All of the above", "A Giant Sword", "Love", "A chocobo", "Final Fantasy VI"],

wrongAnswer1: ["1", "Final Fantasy 4", "Cecil", "Rosa", "Locke", "To rule the world", "A Scythe", "Betrayal", "A Tigerdog", "Final Fantasy IV"],

wrongAnswer2: ["2", "Final Fantasy 5", "Kain", "Rydia", "Sabin", "To destroy the world", "A Rapier", "Revenge", "A Porcupinefish", "Final Fantasy VII"],

wrongAnswer3: ["3", "Final Fantasy 3", "Edge", "Golbez", "Terra", "Revive the ancient Goddesses by finding the source of magic", "A Gun", "All of the above", "A Lioncat", "Final Fantasy VIII"],


questions: ["1. How many adventurers were you able to play as in Final Fantasy I (Nes)?", "2. What was the Japanese Version of Final Fantasy IV originally called in the US?", '3. Who is the "spoony bard" in Final Fantasy IV?', "4. Which character undergoes a redemption and becomes a paladin in Final Fantasy IV?", "5. In Final Fantasy VI, which character is featured on the box artwork for the US version?", "6. What is the villain Kefka's goal in Final Fantasy VI?", "7. In Final Fantasy VII, what weapon does Cloud carry?", "8. The major theme of Final Fantasy VIII is:", "9. The animal made most famous by the Final Fantasy Series is:", "10. The best Final Fantasy game in the series is:"],

answerChoices: ['A', 'B', 'C', 'D'],

questionCounter: 0,
questionIndex: -1,
questionIsCorrect: 0,
questionIsWrong: 0,
quizFinished: 0
}


// State Modification functions
function quizHtmlCreateAndAppend(ansA, ansB, ansC, ansD) {
  var ansNotify = "You have " + quizState.questionIsCorrect + " questions correct out of 10.";
  $('.welcome-screen').remove();
  var quizHtml = (`
    <div class= "main-quiz">
    <div class= "Question">${quizState.correctAnswers[quizState.questionIndex]}</div>
    <div class= "answer-A answers"><p></p></div>
    <div class= "answer-B answers"><p></p></div>
    <div class= "answer-C answers"><p></p></div>
    <div class= "answer-D answers"><p></p></div>
    <div class= "answer-notify"><p></p></div>
    <button class="answer-submit">Submit Answer</button>
    </div>
    `)
    $('.welcome-screen').append(quizHtml);
}

function randomizeAnswers() {

}

function answerIsCorrect() {
  quizState.questionIsCorrect +=1;
  quizState.questionIndex +=1;
  quizState.questionCounter +=1;
}

function answerIsWrong() {
  quizState.questionIsWrong +=1;
  quizState.questionIndex +=1;
  quizState.questionCounter +=1;
}

// Event Listeners

// Audio listeners

// hover
var menuMove = $('#menu_move')[0];
$('.answers, .answer-submit, .char').mouseenter(function() {
  menuMove.play();
})


// click answer

var clickAnswer = $('#menu_click_answer')[0];
$('.answers, .char').click(function(event) {
  // event.stopPropagation();
  clickAnswer.play();
})
