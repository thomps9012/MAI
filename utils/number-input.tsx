import StateChecker from "./stateChecker";

const NumberInput = (({ questionInfo, state_details, updateState }: any) => {
    const { id, question, definition, state } = questionInfo;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        state_details[name] = parseInt(value)
        updateState(state_details)
        StateChecker(state_details)
    }
    return (
        <div key={id} className="numberButton">
            <h3>{question}</h3>
            <span>{definition ?? ''}</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, textAlign: 'center' }}>
                <input
                    style={{ textAlign: 'center', width: 150 }}
                    type='number'
                    name={state}
                    onChange={handleChange}
                />
                <div className="row" style={{display: 'flex'}}>
                    <input
                        type='checkbox'
                        name={state}
                        onClick={handleChange}
                        value='0'
                    />
                    <label>{"Don't know or can't say"}</label>
                </div>
            </div>
        </div>
    )

})

export default NumberInput;