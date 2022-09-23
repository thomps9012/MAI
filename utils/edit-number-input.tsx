import StateChecker from "./stateChecker";

const EditNumberInput = ({ question, id, defaultValue }: any) => {
    const { state } = question;
    console.log('number default value', defaultValue)
    const handleChange = (e: any) => {
        document.getElementById(id)?.setAttribute('class', 'finished-question')
    }
    return <div id={id} className='edit_section_question'>
        <h2>{question.question}</h2>
        <span>{question.detail && question.detail}</span>
        <input
            defaultValue={defaultValue}
            className='number-input'
            type='number'
            min={0}
            name={state}
            id={state}
            onChange={handleChange}
        />
        <div className="unknown-checkbox">
            <input
                id={state}
                type='checkbox'
                name={state}
                onClick={handleChange}
                value='0'
            />
            <label>{"Don't know or can't say"}</label>
        </div>
    </div>
}

export default EditNumberInput;