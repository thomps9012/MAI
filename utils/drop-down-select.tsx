import StateChecker from "./stateChecker";

const DropDownSelect = ({ question, id, setCurrentQuestion }: any) => {
    const { state, answer_choices } = question;
    const handleChange = (e: any) => {
        setCurrentQuestion(parseInt(id.split('_')[1]) + 1)
        document.getElementById(id)?.setAttribute('class', 'finished-question')
    }
    return <div id={id} className='section_question'>
        <h2>{question.question}</h2>
        <span>{question.detail && question.detail}</span>
        <select name={state} id={state} onChange={handleChange}>
            <option hidden disabled>Select...</option>
            {answer_choices?.map((choice: string) => {
                return (
                    <option value={choice} key={choice}>
                        {choice}
                    </option>
                )
            })}
        </select>
    </div>
}

export default DropDownSelect;