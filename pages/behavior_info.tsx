import { useEffect, useState } from "react";
import drugBehaviorQs from '../questionData/adult/drug-behavior.json'
import sexualBehaviorQs from '../questionData/adult/sexual-behavior.json'
import ButtonSelect from "../utils/button-select";
import DropDownSelect from "../utils/drop-down-select";
import MultipleSelect from "../utils/multiple-select";
import NumberInput from "../utils/number-input";
import StateChecker from "../utils/stateChecker";

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
        inject_drugs: 0,
        share_needles: 0,
        inject_drugs_annual: 0
    })
    const [sexual_behavior, setSexualBehavior] = useState({
        sexual_partners: '',
        unprotected_partners: [],
        exchanged_sex_for_goods: '',
        relationship_abuse: '',
        partner_sexual_pressure: '',
        safe_in_relationship: ''
    })
    const behavior_info = { drug_behavior, sexual_behavior }
    const behavior_state = {...sexual_behavior}
    useEffect(() => {
        StateChecker(behavior_state)
    }, [behavior_state])
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
                const { multiple, state, drop_down } = questionInfo;
                if (multiple) {
                    return (
                        <MultipleSelect
                            key={state}
                            questionInfo={questionInfo}
                            updateState={setSexualBehavior}
                            state_details={sexual_behavior}
                        />
                    )
                } else if (drop_down) {
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