import React from "react"

export default function QuestionSkeleton() {
    
    return (
        <div className="question skeleton">
            <h2 className="question--text skeleton--text"></h2>
            <h2 className="question--text skeleton--text"></h2>
            <button className="selected"></button>
            <button className="selected"></button>
            <button className="selected"></button>
            <button className="selected"></button>
        </div>
    )
}