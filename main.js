addEventListener('DOMContentLoaded', () => {
  const DIE = 'die'
  const dies = [`first-${DIE}`, `second-${DIE}`, `third-${DIE}`]
  const diceResults = []

  const firstDie = document.getElementById(dies[0])
  const secondDie = document.getElementById(dies[1])
  const thirdDie = document.getElementById(dies[2])
  const resultText = document.getElementById('result')
  const resetButton = document.getElementById('reset-button')


  firstDie.addEventListener('input', (updateValue) => {
    setResults(0, updateValue)
  })

  secondDie.addEventListener('input', (updateValue) => {
    setResults(1, updateValue)
  })

  thirdDie.addEventListener('input', (updateValue) => {
    setResults(2, updateValue)
  })

  resetButton.addEventListener('click', () => resetFields())

  function setResults(index, updateValue) {
    const value = Number(updateValue.target.value)
    console.log(Number.isInteger(value))
    if (!Number.isNaN(value) && Number.isInteger(value) && Number.isInteger(value)) {
      console.log(Number.isInteger(value))
      diceResults[index] = value
      if (diceResults.length === 3 && diceResults.every(diceResult => diceResult < 7)) {
        resultText.textContent = getResult()
      }
    } else {
      resultText.textContent = 0
    }
  }

  function getResult() {
    const tripleNumber = getTripleNumber()
    switch (tripleNumber) {
      case 6:
        return 6
      case 5:
        return 5
      case 4:
        return 4
      case 3:
        return 3
      case 2:
        return 2
      case 1:
        return 7
      default:
        break;
    }

    const doubleNumber = getDoubleNumber()

    if (doubleNumber === 1) {
      if (diceResults.includes(6)) {
        return 6
      }
      if (diceResults.includes(5)) {
        return 5
      }
      if (diceResults.includes(4)) {
        return 4
      }
      if (diceResults.includes(3)) {
        return 3
      }
      if (diceResults.includes(2)) {
        return 2
      }
    }

    if (diceResults.includes(4) && diceResults.includes(2) && diceResults.includes(1)) {
      return 10
    }

    if (diceResults.includes(1) && diceResults.includes(2) && diceResults.includes(3)) {
      return 2
    }

    if (diceResults.includes(2) && diceResults.includes(3) && diceResults.includes(4)) {
      return 2
    }

    if (diceResults.includes(4) && diceResults.includes(5) && diceResults.includes(6)) {
      return 2
    }

    if (diceResults.includes(3) && diceResults.includes(4) && diceResults.includes(5)) {
      return 2
    }

    return 1
  }

  function getTripleNumber() {
    const count = {}

    for (const die of diceResults) {
      count[die] = (count[die] || 0) + 1
    }

    const triple = Object.entries(count).find(([_, count]) => count >= 3)

    return triple ? Number(triple[0]) : null
  }

  function getDoubleNumber() {
    const count = {}

    for (const die of diceResults) {
      count[die] = (count[die] || 0) + 1
    }

    const triple = Object.entries(count).find(([_, count]) => count >= 2)

    return triple ? Number(triple[0]) : null
  }

  function resetFields() {
    firstDie.value = ''
    secondDie.value = ''
    thirdDie.value = ''
    resultText.textContent = 0
  }
})
