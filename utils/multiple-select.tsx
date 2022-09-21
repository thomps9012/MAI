import { useState } from "react";

const MultipleSelect = ({ question, id, setCurrentQuestion }: any) => {
    const { state, answer_choices } = question;
    const [question_state, setQuestionState] = useState([''])
    const handleChange = () => {
        let selected = document.getElementsByName(state);
        let inputArr = [];
        try {
            for (const item in selected) {
                const inputEl = selected[item] as HTMLInputElement;
                if (inputEl.checked) inputArr.push(inputEl.value)
            }
        } finally {
            setQuestionState(inputArr)
            setCurrentQuestion(parseInt(id.split('_')[1]) + 1)
        }
    }
    return <div className='section_question' id={id}>
        <h2>{question.question}</h2>
        <span>{question.detail && question.detail}</span>
        <select onBlur={handleChange} multiple id={state} name={state}>
            {answer_choices?.map((choice: string) => (
                <option value={choice} key={choice}>{choice}</option>
            ))}
        </select>
    </div >
}

export default MultipleSelect;