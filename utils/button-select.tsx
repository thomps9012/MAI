const ButtonSelect = ({ questionInfo, state_details, updateState }: any) => {
    const { id, question, detail, state, answerChoices } = questionInfo;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        state_details[name] = value
        updateState(state_details)
    }
    return (
        <div key={id} id='btn-group' className={answerChoices.length === 2 ? 'multiButton' : 'twoButton'}>
            <h2>{question}</h2>
            <span>{detail ?? ''}</span>
            {answerChoices.map((choice: string) => {
                return (
                    <div key={`${choice}${state}`} style={{ fontSize: 'large', margin: 5, padding: 5, display: 'flex' }}>
                        <input type='radio' name={state} value={choice} onClick={handleChange} />
                        <label>{choice}</label>
                    </div>
                )
            })}
        </div>
    )
}

export default ButtonSelect;