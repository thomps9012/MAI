import { ObjectId } from "mongodb";
import { useRouter } from "next/router"
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import InterviewHeader from "../../../../../../../components/interview-header";
import EditButtonSelect from "../../../../../../../utils/edit-button-select";
import EditDropDownSelect from "../../../../../../../utils/edit-drop-down-select";
import EditMultipleSelect from "../../../../../../../utils/edit-multiple-select";
import EditNumberInput from "../../../../../../../utils/edit-number-input";
import fetcher from "../../../../../../../utils/fetcher";
import { connectToDatabase } from "../../../../../../../utils/mongodb";

export default function EditInterviewPage({ interview_record, adult }: any) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const { _id, demographics, type } = interview_record;
    const { data: questions, error: question_err } = useSWR(`/api/questions/${adult ? 'adult' : 'youth'}/demographics`, fetcher)
    const { data: answers, error: answer_err } = useSWR('/api/answers/all', fetcher)
    if (question_err || answer_err) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    questions?.map((question: any) => question.answer_choices = answers?.find((answer: any) => answer._id === question.answers)?.choices)
    const [date_of_birth, setDOB] = useState(demographics.date_of_birth);
    const set_DOB = (e: any) => {
        setDOB(e.target.value)
    }
    const pageSubmit = async (e: any) => {
        e.preventDefault();
        let section = 'demographics'
        const state = questions.map((question: any) => question.number_input ? [question.state, 0] : question.multiple ? [question.state, []] : [question.state, ''])
        let section_info = Object.fromEntries(state);
        section_info = Object.assign(section_info, { 'date_of_birth': date_of_birth })
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
        const res = await fetch('/api/interviews/update', {
            method: 'POST',
            headers: { 'interview_section': section, 'interview_type': type, 'record_id': _id },
            body: JSON.stringify(section_info)
        }).then(response => response.json())
        res.acknowledged ? router.push(`/admin/interview_detail/${type}/edit/${adult}/${_id}/success`)
            : (confirm('Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.') && router.push('/'))
    }
    return <main className="container">
        <h1 className="title">Edit Demographic Information</h1>
        <InterviewHeader section={1} edit={true} />
        <hr />
        <h2>Date of Birth</h2>
        <input type='date' onChange={set_DOB} value={date_of_birth} />
        <form className="section_questions" onSubmit={pageSubmit}>
            {questions?.map((question: any, i: number) => {
                if (question.multiple) {
                    return <EditMultipleSelect question={question} id={`question_${i}`} key={question._id} defaultValue={demographics[question.state]} />
                }
                else if (question.number_input) {
                    return <EditNumberInput question={question} id={`question_${i}`} key={question._id} defaultValue={demographics[question.state]} />
                }
                else if (question.drop_down) {
                    return <EditDropDownSelect question={question} id={`question_${i}`} key={question._id} defaultValue={demographics[question.state]} />
                }
                else {
                    return <EditButtonSelect question={question} id={`question_${i}`} key={question._id} defaultValue={demographics[question.state]} />
                }
            })}
            <br />
            <hr />
            <br />
            <button type="submit" className='page_button'>Save Changes</button>
        </form >
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    console.log(ctx.params.id)
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) }, { _id: 1, demographics: 1, type: 1 })
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record)),
            adult: JSON.parse(JSON.stringify(ctx.params.adult))
        }
    }
}