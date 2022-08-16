import React from "react"

export default function IntroPage(props) {
    
    const { startQuiz } = props
    
    return (
        <div className="intropage">
            <h1 className="intropage--title">Quizzical</h1>
            <h2 className="intropage--subtitle">
                I don't know much, but I know a little about a lot of things.
            </h2>
            <button 
                className="start-quiz-button"
                onClick={startQuiz}
            >Start quiz</button>
        </div>
    )
}