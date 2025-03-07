// Do not change code below this line
// This code will just display the questions to the screen
let questioncontainer = document.getElementById("questions")
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  questions.forEach((q, index) => {
    let div = document.createElement("div")
    div.innerHTML = `<p>${q.question}</p>` // Removed the extra space
    q.choices.forEach((option) => {
      div.innerHTML += `<input type="radio" name="q${index}" value="${option}"> ${option}`
    })
    questioncontainer.appendChild(div)
  })
}

renderQuestions();

// Code for storing the answer in session storage 
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    let progress = {}
      
    document.querySelectorAll("input[type='radio']:checked").forEach((radio) => {
      progress[radio.name] = radio.value;
    })
    
    sessionStorage.setItem("progress", JSON.stringify(progress))
  })
})

// Code for loading saved answers
function reload() {
  let savedAnswers = JSON.parse(sessionStorage.getItem("progress"));
  if (savedAnswers) {
    document.querySelectorAll("input[type='radio']").forEach(radio => {
      if (savedAnswers[radio.name] === radio.value) {
        radio.checked = true;
        // Add the checked attribute for Cypress to detect
        radio.setAttribute("checked", "true");
      }
    })
  }
}

// Load saved answers on page load
reload();

// Code to calculate score & storing it in localStorage
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  let savedAnswers = JSON.parse(sessionStorage.getItem("progress") || "{}");
  
  questions.forEach((q, index) => {
    if (savedAnswers[`q${index}`] === q.answer) {
      score++;
    }
  })
  
  document.getElementById("score").innerText = `Your score is ${score} out of 5`;
  localStorage.setItem("score", score.toString());
})

// Add event listener to ensure proper checked attribute setting
window.addEventListener("load", () => {
  document.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("click", function() {
      // Remove checked attribute from all radios in the same group
      document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
        r.removeAttribute("checked");
      });
      // Add checked attribute to the selected radio
      this.setAttribute("checked", "true");
    });
  });
});