import { useEffect, useState } from "react";
import demographicQs from '../questionData/adult/demographics.json';
import MultipleSelect from "../utils/multiple-select";
import ButtonSelect from "../utils/button-select";
import NumberInput from "../utils/number-input";
import StateChecker from "../utils/stateChecker";

export default function Demographics() {
    const [date_of_birth, setDOB] = useState(new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
    }).format(Date.now()));
    const [demographic_details, setDemographic] = useState({
        latinx: '',
        race: '',
        gender: '',
        sexual_orientation: '',
        living_situtation: '',
        college_enrolled: '',
        employment_status: '',
        military_service: '',
        arrested_in_last_month: '',
        parole_or_probation: '',
        informed_of_HIV_status: '',
        informed_of_VH_status: '',
        knowledge_of_SUD_healthcare_treatment: '',
        knowledge_of_HIV_STD_healthcare_treatment: '',
        pretax_household_income: ''
    })
    useEffect(() => {
        const demographic_state = { ...demographic_details }
        StateChecker(demographic_state)
    })
    const demographic_info = { date_of_birth, demographic_details }
    const Submit = async (demographic_info: {}) => {
        sessionStorage.setItem('demographic_info', JSON.stringify(demographic_info));
        window.location.assign('/risk_attitudes')
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="demographicInfo">
            <h1 className="title">Demographic Information</h1>
            <h2>Date of Birth</h2>
            <input type='date' onChange={(e: any) => setDOB(e.target.value)} />
            {demographicQs.map((questionInfo): any => {
                const { multiple, state, number_input } = questionInfo;
                if (multiple) {
                    return (
                        <MultipleSelect
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setDemographic}
                            state_details={demographic_details}
                        />
                    )
                } else if (number_input) {
                    return (
                        <NumberInput
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setDemographic}
                            state_details={demographic_details}
                        />
                    )
                } else {
                    return (
                        <ButtonSelect
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setDemographic}
                            state_details={demographic_details}
                        />
                    )
                }
            })}
            <div className="submitBtns">
                <button onClick={() => Submit(demographic_info)}>Continue Interview</button>
            </div>
        </div>
    )
}