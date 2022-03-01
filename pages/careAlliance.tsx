import { useState } from "react"
import careAllianceQs from '../questionData/care-alliance.json';
import ButtonSelect from "../utils/button-select";
// possibly add and delete these questions by absorbing them into other areas

export default function CareAlliance() {
    const [care_alliance, setCareAlliance] = useState({
        injected_drugs_annual: '',
        employment_status: '',
        safe_in_relationship: '',
        partner_sexual_pressure: ''
    })
    const Submit = async (care_alliance: {}) => {
        sessionStorage.setItem('care_alliance', JSON.stringify(care_alliance));
        window.location.replace('/dataReview')
    }
    return (
        <div>
            {careAllianceQs.map((questionInfo): any => {
                const { state, id } = questionInfo;
                return (
                    <ButtonSelect
                        key={id}
                        questionInfo={questionInfo}
                        updateState={setCareAlliance}
                        state_details={care_alliance}
                    />
                )
            })}
            <button onClick={() => Submit(care_alliance)}>Finish Interview</button>
        </div>
    )
}