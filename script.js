let deckId
let compScore = 0
let myScore = 0
const cardsContainer = document.getElementById('cards')
const deckBtn = document.getElementById('new-deck')
const drawBtn = document.getElementById('draw-cards')
const headerTextEl = document.getElementById('header-text')
const remainingCardsEl = document.getElementById('remaining-cards')
const compScoreEl = document.getElementById('pc-score-el')
const myScoreEl = document.getElementById('my-score')

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id

      if (data.remaining > 0) {
        drawBtn.disabled = false
        remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`
        headerTextEl.textContent = `Game Of War!`
        compScoreEl.textContent = `Computer Score: ${compScore = 0}`
        myScoreEl.textContent = `Your Score: ${myScore = 0}`
        cardsContainer.children[0].innerHTML = `
        <img src="">
      `
        cardsContainer.children[1].innerHTML = `
        <img src="">
      `

      }
    })
}

function drawNewCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
      remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`

      if (deckId === undefined) {
        remainingCardsEl.textContent = `Get new Deck of Cards!`
      }
      const winnerText = determineCardWinner(data.cards[0], data.cards[1])
      headerTextEl.textContent = winnerText
      cardsContainer.children[0].innerHTML = `
        <img src="${data.cards[0].image}" class="card">
      `
      cardsContainer.children[1].innerHTML = `
        <img src="${data.cards[1].image}" class="card">
      `
      if (data.remaining === 0) {
        drawBtn.disabled = true

        if (compScore > myScore) {
          headerTextEl.innerText = "💻🔋The Computer Won the Game!🔋💻"
        } else if (compScore < myScore) {
          headerTextEl.innerText = "🎉🏆You Won the Game!🥇🎉"
        } else {
          headerTextEl.innerText = "⚔️No Winner - War⚔️"
        }
      }
    })
}

function determineCardWinner(c1, c2) {
  const cardOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"
  ]
  const card1ValueIndex = cardOptions.indexOf(c1.value)
  const card2ValueIndex = cardOptions.indexOf(c2.value)

  if (card1ValueIndex > card2ValueIndex) {
    compScore++
    compScoreEl.textContent = `Computer Score: ${compScore}`
    return `Computer Wins!`
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++
    myScoreEl.textContent = `Your Score: ${myScore}`
    return `You Win!`
  } else {
    return `War!`
  }
}

deckBtn.addEventListener('click', handleClick)
drawBtn.addEventListener('click', drawNewCards)