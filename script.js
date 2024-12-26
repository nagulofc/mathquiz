const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const simpleModeButton = document.getElementById('simpleMode');
const hardModeButton = document.getElementById('hardMode');

let mode = 'simple';
let score = 0;
let currentQuestion = {};

// Generate a random math question
function generateQuestion() {
  let num1, num2, operator, answer;
  if (mode === 'simple') {
    num1 = Math.floor(Math.random() * 10) + 1; // Numbers from 1 to 10
    num2 = Math.floor(Math.random() * 10) + 1;
    operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // All 4 operators
  } else {
    num1 = Math.floor(Math.random() * 50) + 10; // Numbers from 10 to 59
    num2 = Math.floor(Math.random() * 50) + 10;
    operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  }
  // Calculate the correct answer
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = parseFloat((num1 / num2).toFixed(2)); // Limit division to 2 decimals
      break;
  }
  currentQuestion = { question: `${num1} ${operator} ${num2}`, answer };
  questionElement.textContent = `Question: ${currentQuestion.question}`;
}

// Check the user's answer
submitButton.addEventListener('click', () => {
  const userAnswer = parseFloat(answerInput.value);
  if (userAnswer === currentQuestion.answer) {
    feedbackElement.textContent = 'Correct!';
    feedbackElement.style.color = 'green';
    score++;
  } else {
    feedbackElement.textContent = `Wrong! The correct answer was ${currentQuestion.answer}`;
    feedbackElement.style.color = 'red';
  }
  scoreElement.textContent = `Score: ${score}`;
  answerInput.value = '';
  generateQuestion();
});

// Switch modes
simpleModeButton.addEventListener('click', () => {
  mode = 'simple';
  simpleModeButton.classList.add('active');
  hardModeButton.classList.remove('active');
  generateQuestion();
});

hardModeButton.addEventListener('click', () => {
  mode = 'hard';
  hardModeButton.classList.add('active');
  simpleModeButton.classList.remove('active');
  generateQuestion();
});

// Initialize the quiz
generateQuestion();
