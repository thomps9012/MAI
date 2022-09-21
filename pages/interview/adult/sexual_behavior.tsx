import { useEffect, useState } from "react";
import drugBehaviorQs from "../../../question_data/youth/drug-behavior.json"
import sexualBehaviorQs from "../../../question_data/youth/sexual-behavior.json"
import ButtonSelect from "../../../utils/button-select";
import DropDownSelect from "../../../utils/drop-down-select";
import fetcher from "../../../utils/fetcher";
import NumberInput from "../../../utils/number-input";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import MultipleSelect from "../../../utils/multiple-select";
import InterviewHeader from "../../../components/interview-header";

export default function SexualBehavior() {
    const [current_question, setCurrentQuestion] = useState(0);
    const interview_data = useSelector((state: any) => state.interview)
    const router = useRouter();
    const { data: questions, error: question_err } = useSWR('/api/adult_sexual_behavior', fetcher)
    const { data: answers, error: answer_err } = useSWR('/api/answers', fetcher)
    if (question_err || answer_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    questions?.map((question: any) => question.answer_choices = answers?.find((answer: any) => answer._id === question.answers)?.choices)
    console.log(questions)
    useEffect(() => {
        document.getElementById(`question_${current_question}`)?.setAttribute('style', 'display: flex; flex-direction: column;')
        current_question > questions?.length - 1 && document.querySelector('#page_submit')?.setAttribute('style', 'display: flex; flex-direction: column;');
    }, [current_question, questions])
    const pageSubmit = async (e: any) => {
        e.preventDefault();
        let section = 'sexual_behavior'
        const state = questions.map((question: any) => question.number_input ? [question.state, 0] : question.multiple ? [question.state, []] : [question.state, ''])
        let section_info = Object.fromEntries(state);
        console.log(section_info)
        questions.map((question: any) => {
            if (question.multiple) {
                let options = document.getElementById(question.state)?.children as HTMLCollection;
                let inputArr = [];
                for (let i = 0; i < options?.length; i++) {
                    (options[i] as HTMLOptionElement).selected && inputArr.push((options[i] as HTMLOptionElement).value)
                }
                section_info[question.state] = inputArr
            } else if (question.number_input) {
                section_info[question.state] = parseInt((document.getElementById(question.state) as HTMLInputElement).value)
            }
            else {
                section_info[question.state] = (document.getElementById(question.state) as HTMLInputElement).value
            }
        })
        sessionStorage.setItem(section, JSON.stringify(section_info))
        const res = await fetch('/api/update_section', {
            method: 'POST',
            headers: { 'interview_section': section, 'interview_type': interview_data.type, 'record_id': interview_data.id },
            body: JSON.stringify(section_info)
        }).then(response => response.json())
        res.acknowledged ? router.push('/interview/adult/drug_behavior')
            : (confirm('Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.') && router.push('/'))
    }
    return (
        <main className="container">
            <InterviewHeader section={3} />
            <h1 className="title">Sexual Behavior</h1>
            <h3>Over the past 30 days how many days, if any did you ...</h3>
            <form className="section_questions" onSubmit={pageSubmit}>
                {questions?.map((question: any, i: number) => {
                    if (question.multiple) {
                        return <MultipleSelect question={question} id={`question_${i}`} key={question._id} setCurrentQuestion={setCurrentQuestion} />
                    }
                    else if (question.number_input) {
                        return <NumberInput question={question} id={`question_${i}`} key={question._id} setCurrentQuestion={setCurrentQuestion} />
                    }
                    else if (question.drop_down) {
                        return <DropDownSelect question={question} id={`question_${i}`} key={question._id} setCurrentQuestion={setCurrentQuestion} />
                    }
                    else {
                        return <ButtonSelect question={question} id={`question_${i}`} key={question._id} setCurrentQuestion={setCurrentQuestion} />
                    }
                })}
                <br />
                <hr />
                <br />
                <button type="submit" className='page_button' id="page_submit">Continue Interview</button>
            </form >
        </main>
    )
}