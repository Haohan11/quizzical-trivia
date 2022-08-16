import React, { useState, useEffect } from "react"

import Question from "./Question"
import QuestionSkeleton from "./QuestionSkeleton"

export default function QuizPage() {
    
    // localStorage.removeItem('questions')
    
    const [questions, setQuestions] = useState( () =>
        JSON.parse(localStorage.getItem('questions')) || []
    )
    const [submitMessage, setSubmitMessage] = useState('')
    const [answerChecked, setAnswerChecked] = useState(false)
    
    // console.log(questions)
    async function getQuestions() {
        const res = await fetch("https://opentdb.com/api.php?amount=5")
        const data = await res.json()
        const questions = data.results.map( data => {
            let answers = [data.correct_answer, ...data.incorrect_answers]
            answers = data.type === 'boolean' ? ["True", "False"] : arrange(answers)
            const correct_answer = answers.findIndex( answer => answer === data.correct_answer)
            return {
                question: data.question,
                correct_answer: correct_answer,
                answers: answers,
                selected_answer: -1,
            }
        } )
        return questions
    }
    
    function arrange(array) {
        const [...newArray] = array
        return newArray.sort().sort((item1, item2) => item1 - item2)
    }
    
    useEffect(() => {
        async function getNewQuestions() {
            const questions = await getQuestions()
            setQuestions(questions)
        }
        if(questions.length === 0) getNewQuestions()
    }, [questions])
    
    function handleSelect(number, answer_index) {
        if(answerChecked) return
        setQuestions( preQuestions => {
            const [...questions] = preQuestions
            questions[number].selected_answer = answer_index
            return questions
        })
    }
    
    function handleStyleColor(number, index) {
        const {correct_answer, selected_answer} = questions[number]
        if(!answerChecked) 
            return index === selected_answer ? "selected" : ""
        
        if(index === correct_answer)
            return 'green'
            
        return index === selected_answer ? 'red' : 'lightblue'
    }
    
    function handleSubmit() {
        if(!questions.every( question => question.selected_answer >= 0 ))
        return setSubmitMessage("Please answer all questions")
        
        setSubmitMessage(`You scored ${getScore()}/5 correct answers`)
        
        if(!answerChecked)
            return setAnswerChecked(true)
            
        setSubmitMessage('')
        setAnswerChecked(false)
        setQuestions([])
    }
    
    function getScore() {
        let score = 0
        questions.forEach( question => {
            if(question.selected_answer === question.correct_answer)
                score ++
        })
        return score
    }
    
    const skeletons = (() => {
        const components = []
        for(let i = 0; i < 4; i ++){
            components.push(<QuestionSkeleton key={i} />)
        }
        return components
    })()
    
    return (
        <div className="quizpage">
            {questions.length === 0 && skeletons}
            {questions.map( (question, index) => 
                <Question  
                    key={index}
                    {...question}
                    number={index}
                    handleSelect={handleSelect}
                    handleStyleColor={handleStyleColor}
                />
            )}
            {questions.length !== 0 && 
                <div className="submit-field">
                    <h2 className="submit-message">
                        {submitMessage}
                    </h2>
                    <button className="submit-button"
                            onClick={handleSubmit}
                    >{answerChecked ? 'Play again' : 'Check answers'}</button>
                </div>
            }
        </div>
    )
}