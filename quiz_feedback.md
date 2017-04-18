# General

- add README.md
- Images to images (lower case file and folder names)
- font files in Images folder (move to fonts folder)
- images files have upper case letters with spaces (shorten names in general)
- zip files in Images folder (remove)
- css files in root folder (move to css folder)

# index.html

 - move `<head>` to new line
 - move `</body>` to new line
 - remove `<div>` after body or give it an id
 - remove commented lines
 - fix indentation: `</button>`, `<audio>`, `<script>`
 - button shouldn't contain so many divs (make separate buttons)

# main.css

- `*{` needs a space `* {`
- `@font-face` needs a newline before it
- rename `welcome-screen2`
- `.p1` needs line break before it
- remove multiple line breaks between classes (ex. `.p2` to `.char`) only needed one empty line
- remove commented lines
- span.questions-correct needs a new line before it
- `.level-continue needs` correct indentation
- change `body:hover...` to `body { cursor:... }` so that only one definition is needed since it's the default

# quiz.js

- remove all beginning comments (some of this material could go in README.md)
- change correctAnswer to be the index value of the correct answer
- remove unnecessary line breaks
- rename `renderAndIterateQuestion` to `renderQuestion`
- rename `resetWelcomeScreen` to `renderWelcome`
- since you have `resetWelcomeScreen()` there is no need to also have it in index.html
- rename `resetStateCounters` to `resetState`
- rename `testSelectedAnswer` to `checkAnswer` (returns true or false)
- add function: `handleAnswerSubmit` (invokes `checkAnswer()`, updates state, renders next screen)
- fix indentation throughout file
- create function attachEvents (move all event listeners into this function except `.ready()`)
- consolidate two `.ready()` functions
- give event listeners a function so that it's clear why they exist
- move all logic in event handlers into separate functions so that you're not performing logic in those handlers (this will help consolidate the state changes)

# quiz_questions_&_answers.md

- remove ampersand from file name (replace with and if needed)
- refactor this file so that it's readable to someone who didn't design the application
- the markdown formatting isn't correct so that questions have indented answer lines
- added a link from README.md to this file

# quizstate.html

- this file isn't being used so it should be removed
