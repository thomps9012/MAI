import { useState } from "react";

const ButtonSelect = ({ question, id, setCurrentQuestion }: any) => {
    const { state, answer_choices } = question;
    const [question_state, setQuestionState] = useState('')
    const handleChange = (e: any) => {
        setQuestionState( e.target.id)
        setCurrentQuestion(parseInt(id.split('_')[1]) + 1)
    }
    return <div id={id} className='section_question'>
        <h2>{question.question}</h2>
        <input style={{ display: 'none' }} name={state} id={state} defaultValue={question_state} />
        <span>{question.detail && question.detail}</span>
        {answer_choices?.map((choice: string) => (
            <a className="button" key={choice} onClick={handleChange} title={state} id={choice}>{choice}</a>
        ))}
    </div>
}

export default ButtonSelect;