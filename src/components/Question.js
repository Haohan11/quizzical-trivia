import React from "react"

export default function Question(props) {
    const { question, answers, handleSelect, number, handleStyleColor } = props
    
    return (
        <div className="question">
            <h2 
                className="question--text"
                dangerouslySetInnerHTML={{__html: question}}
            ></h2>
            { answers.map( (answer, index) => 
                <button 
                    key={index}
                    onClick={() => handleSelect(number, index)}
                    dangerouslySetInnerHTML={{__html: answer}}
                    className={handleStyleColor(number, index)}
                ></button>
            )}
            
        </div>
    )
}