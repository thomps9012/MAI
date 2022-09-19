import StateChecker from "./stateChecker";

const ButtonSelect = ({ questionInfo, state_details, updateState }: any) => {
    const { id, question, detail, state, answers } = questionInfo;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        state_details[name] = value
        updateState(state_details)
        StateChecker(state_details)
    }
    return (
        <div key={id} id='btn-group'>
            <div className="col">
                <h3>{question}</h3>
                <span>{detail ?? ''}</span>
            </div>
            <div className="col">
                {/* {answerChoices.map((choice: string) => {
                    return (
                        <div key={`${choice}${state}`} style={{ margin: 2, padding: 2, display: 'flex' }}>
                            <input type='radio' name={state} value={choice} onClick={handleChange} />
                            <label>{choice}</label>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default ButtonSelect;