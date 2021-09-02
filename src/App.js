import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

const options = [
  { name: "General knowlegde", id: 9 },
  { name: "Entertainment books", id: 10 },
  { name: "Entertainment film", id: 11 },
  { name: "Entertainment music", id: 12 },
  { name: "Entertainment musical & theatres", id: 13 },
  { name: "Entertainment television", id: 14 },
  { name: "Entertainment video games", id: 15 },
  { name: "Entertainment board games", id: 16 },
  { name: "Science and nature", id: 17 },
  { name: "Science and computers", id: 18 },
  { name: "Science and mathematics", id: 19 },
  { name: "Mythology", id: 20 },
  { name: "Sports", id: 21 },
  { name: "Geography", id: 22 },
  { name: "History", id: 23 },
  { name: "Politics", id: 24 },
  { name: "Entertainment cartoons and animations", id: 32 },
  { name: "Celebrities", id: 26 },
  { name: "Animals", id: 27 },
  { name: "Vehicles", id: 28 },
]

function App() {
  const [ques, setQues] = useState([])
  const [one, setOne] = useState("")
  const [checkbox, setCheckbox] = useState("")
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [select, setSelect] = useState("")

  const shuffle = one => {
    if (one) {
      for (var i = one.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))

        var temp = one[i]
        one[i] = one[j]
        one[j] = temp
      }

      setOne(one)
    }
  }

  const checkifTrue = () => {
    if (checkbox === ques[i]?.correct_answer) {
      setScore(score + 10)
    } else {
      setScore(score)
    }
  }

  const handle = e => {
    e.preventDefault()
    setOne("")
    if (i <= ques.length) {
      setI(i + 1)
      let x = ques[i + 1]?.incorrect_answers
      let y = ques[i + 1]?.correct_answer
      x?.push(y)
      shuffle(x)
    }
    checkifTrue()
    setCheckbox("")
  }

  const handleChange = e => {
    setCheckbox(e.target.value)
  }
  const handleSelect = e => {
    setSelect(e.target.value)
  }

  useEffect(() => {
    if (select) {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${select}&difficulty=medium&type=multiple`
      )
        .then(res => res.json())
        .then(data => {
          setQues(data.results)
          let x = data.results[i]?.incorrect_answers
          let y = data.results[i]?.correct_answer
          x?.push(y)
          shuffle(x)
        })
    } else {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple`
      )
        .then(res => res.json())
        .then(data => {
          setQues(data.results)
          let x = data.results[i]?.incorrect_answers
          let y = data.results[i]?.correct_answer
          x?.push(y)
          shuffle(x)
        })
    }
  }, [select])

  return (
    <div className="App">
      <div className="select">
        <select
          name=""
          id="gategory"
          onChange={e => handleSelect(e)}
          disabled={i >= 1 && true}
        >
          <option value="">Any Gategory</option>

          {options.map(item => (
            <option key={uuidv4()} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="container">
        <p id="question">{ques[i]?.question}</p>
        {one &&
          i <= 9 &&
          one?.map((item, id) => (
            <div className="choices" key={uuidv4()}>
              <input
                onChange={handleChange}
                type="radio"
                name="radio"
                value={item}
              />
              <div className="answer">
                <span>{item}</span>
              </div>
            </div>
          ))}

        {i > 9 ? (
          <p id="score">{`your score is ${score}`}</p>
        ) : (
          <>
            <h4>{`question ${i + 1} of 10`}</h4>
            <button onClick={handle} disabled={!checkbox}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
