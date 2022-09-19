import { useState } from "react";
import drugBehaviorQs from "../../../question_data/youth/drug-behavior.json"
import sexualBehaviorQs from "../../../question_data/youth/sexual-behavior.json"
import ButtonSelect from "../../../utils/button-select";
import DropDownSelect from "../../../utils/drop-down-select";
import NumberInput from "../../../utils/number-input";

export default function Behavior() {
    const [drug_behavior, setDrugBehaviors] = useState({
        smoke_cigarettes: 0,
        tobacco_products: 0,
        electronic_vapor: 0,
        alcohol: 0,
        binge_drink: 0,
        marijuana: 0,
        prescription_opioid: 0,
        prescription_drugs: 0,
        nonprescription_opioids: 0,
        illegal_drugs: 0,
        inject_drugs: 0
    })
    const [sexual_behavior, setSexualBehavior] = useState({
        sexual_partners: '',
        sex_under_influence: '',
        unprotected_sex: '',
        relationship_abuse: '',
        partner_sexual_pressure: '',
        safe_in_relationship: ''
    })
    const behavior_info = { drug_behavior, sexual_behavior }
    const Submit = async (behavior_info: {}) => {
        sessionStorage.setItem('behavior_info', JSON.stringify(behavior_info))
        window.location.assign('/dataReview')
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className='behaviorInfo'>
            <h1>Over the past 30 days how many days, if any did you ...</h1>
            {drugBehaviorQs.map((questionInfo: any) => {
                const { state } = questionInfo;
                return (
                    <NumberInput
                        key={state}
                        questionInfo={questionInfo}
                        updateState={setDrugBehaviors}
                        state_details={drug_behavior}
                    />
                )

            })}
            {sexualBehaviorQs.map((questionInfo: any) => {
                const { state, drop_down } = questionInfo;
                if (drop_down) {
                    return (
                        <DropDownSelect
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setSexualBehavior}
                            state_details={sexual_behavior}
                        />
                    )
                } else {
                    return (
                        <ButtonSelect
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setSexualBehavior}
                            state_details={sexual_behavior}
                        />
                    )
                }
            })}
            <div className="submitBtns">
                <button onClick={() => Submit(behavior_info)}>Finish Interview</button>
            </div>
        </div>
    )
}