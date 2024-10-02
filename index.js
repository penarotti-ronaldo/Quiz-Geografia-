const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual é o ponto mais elevado do Brasil?",
    answers: [
      { text: "Pico das agulhas negras", correct: false },
      { text: "Pico 31 de março", correct: false },
      { text: "Pico da Neblina", correct: true },
      { text: "Pico Paraná", correct: false }
    ]
  },
  {
    question: "Quantos continentes existe no Planeta Terra?",
    answers: [
      { text: "6", correct: true },
      { text: "5", correct: false },
      { text: "4", correct: false },
      { text: "7", correct: false }
    ]
  },
  {
    question: "Qual a diferença entre mar e oceano?",
    answers: [
      { text: 'Os mares são menores em relação ao oceano', correct: true },
      { text: 'Os mares são mais profundo em relação aos oceanos ', correct: false },
      { text: 'São todos iguais', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'O relevo pode ser entendido como qualquer forma da superfície terreste, do qual se diferencia em diferentes formas',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Uma Montanha é uma forma de relevo:',
    answers: [
      { text: 'Antiga', correct: false },
      { text: 'Recente', correct: true },
      { text: 'Intermediária', correct: false },
      { text: 'Plana', correct: false }
    ]
  },
  {
    question: 'As planícies são formas de relevo:',
    answers: [
      { text: 'Com as maiores elevações', correct: false },
      { text: 'Com as menores elevações', correct: true },
      { text: 'Com formas irregulares ', correct: false },
      { text: 'Com as maiores altitudes', correct: false }
    ]
  },
  {
    question: 'O Mar Morto encontra-se em uma forma de relevo Chamada de:',
    answers: [
      { text: 'Depressão relativa', correct: false },
      { text: 'Planície', correct: false },
      { text: 'Planaltos ', correct: false },
      { text: 'Depressão Absoluta', correct: true },
    ]
  },
  {
    question: 'O ponto mais elevado do planeta Terra é Chamado de:',
    answers: [
      { text: 'Monte Everest', correct: true },
      { text: 'Monte Kilimanjaro', correct: false },
      { text: 'Monte FIJI', correct: false },
      { text: 'Ilhas Falklands', correct: false },
    ]
  },
  {
    question: 'São formas de relevo que formam ondulações no terreno com topo arredondado,formando elevações de médias altitudes. Essas formas de relevo são denominadas de:',
    answers: [
      { text: 'Montanha', correct: false },
      { text: 'Planície', correct: false },
      { text: 'Planaltos ', correct: true},
      { text: 'Depressão', correct: false },
    ]
  },
  {
    question: 'Uma forma de relevo com topo aplaninado e com as bordas bastante inclinada formando paredões rochosos em formato de escarpa recebem o nome de:',
    answers: [
      { text: 'Chapada', correct: true },
      { text: 'Planície', correct: false },
      { text: 'Planaltos ', correct: false },
      { text: 'Depressão Absoluta', correct: false},
    ]
  },
]