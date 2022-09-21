import StateChecker from "./stateChecker";

const NumberInput = ({ question, id, setCurrentQuestion }: any) => {
    const { state } = question;
    const handleChange = (e: any) => {
        setCurrentQuestion(parseInt(id.split('_')[1]) + 1)
    }
    return <div id={id} className='section_question'>
        <h2>{question.question}</h2>
        <span>{question.detail && question.detail}</span>
        <input
            style={{ textAlign: 'center', width: 150 }}
            type='number'
            min={0}
            name={state}
            id={state}
            onChange={handleChange}
        />
        <div className="row" style={{ display: 'flex' }}>
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

export default NumberInput;