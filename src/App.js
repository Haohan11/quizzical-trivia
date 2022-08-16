import React, { useState } from "react"

import IntroPage from "./components/IntroPage"
import QuizPage from "./components/QuizPage"

export default function App() {
    // localStorage.clear()
    const [quiz, setQuiz] = useState( localStorage.getItem('quiz') || false )
    
    function startQuiz() {
        setQuiz(true)
        document.documentElement.style.setProperty('--blob-size', '275px')
        // localStorage.setItem('quiz', 'true')
    } 
    
    
    return (
        <main>
            {quiz ? <QuizPage /> : <IntroPage startQuiz={startQuiz}/>}        
        </main>
    )
}