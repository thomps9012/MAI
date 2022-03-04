import { useEffect, useState } from "react";
import attitudeQs from '../questionData/adult/attitude-knowledge.json';
import ButtonSelect from "../utils/button-select";
import StateChecker from "../utils/stateChecker";

export default function Attitudes() {
    const [risk_attitudes, setAttitude] = useState({
        tobacco_use: '',
        binge_alcohol_use: '',
        marijuana_use: '',
        shared_needle_use: '',
        nonprescription_opioid: '',
        prescription_opioid: '',
        unprotected_sex: '',
        sex_under_influence: '',
        could_refuse_unprotected_sex: ''
    })
    useEffect(() => {
        const risk_state = { ...risk_attitudes }
        StateChecker(risk_state)
    })
    const Submit = async (risk_attitudes: {}) => {
        sessionStorage.setItem('risk_attitudes', JSON.stringify(risk_attitudes));
        window.location.assign('/behavior_info')
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="riskInfo">
            <h1 className="title">Attitudes and Knowledge</h1>
            <h3>What level of risk do you think people have of harming themselves physically or in other ways when ...</h3>
            {attitudeQs.map((questionInfo): any => {
                const { id } = questionInfo;
                return (
                    <ButtonSelect
                        key={id}
                        questionInfo={questionInfo}
                        updateState={setAttitude}
                        state_details={risk_attitudes}
                    />
                )
            })
            }
            <div className="submitBtns">
                <button onClick={() => Submit(risk_attitudes)}>Continue Interview</button>
            </div>
        </div>
    )
}