import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router"
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
    if (!user_data.user?.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1><br />or<br /> <h1>Not Signed in</h1><hr /><Link href='/sign_in'>Login</Link><br/><Link href='/sign_up'>Sign Up</Link>
        </main>
    }
    const router = useRouter();
    const { _id, behaviors, type } = interview_record
    const { drug } = behaviors;
    const { data: questions, error: question_err } = useSWR('/api/questions/drug_behavior', fetcher)
    const { data: answers, error: answer_err } = useSWR('/api/answers/all', fetcher)
    if (question_err || answer_err) return <main className="landing"><h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1></main>
    questions?.map((question: any) => question.answer_choices = answers?.find((answer: any) => answer._id === question.answers)?.choices)
    const pageSubmit = async (e: any) => {
        e.preventDefault();
        let section = 'drug_behavior'
        const state = questions.map((question: any) => question.number_input ? [question.state, 0] : question.multiple ? [question.state, []] : [question.state, ''])
        let section_info = Object.fromEntries(state);
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
        const interview_cache = await caches.open('interviews');
        const client_cache = await caches.open('clients')
        client_cache.put(`interview/${interview_record.id}/PID/${interview_record.PID}/type/${interview_record.type}`, await fetch(`/api/interviews/find?record_id=${interview_record.id}&interview_type=${interview_record.type}`))
        interview_cache.put(`${interview_record.id}/type/${interview_record.type}`, await fetch(`/api/interviews/find?record_id=${interview_record.id}&interview_type=${interview_record.type}`))
        res.acknowledged ? router.push(`/admin/interview_detail/${type}/edit/${adult}/${_id}/success`)
            : (confirm('Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help.') && router.push('/'))
    }
    return <main className='container'>
        <h1 className="title">Edit Drug Behavior</h1>
        <InterviewHeader section={4} edit={true} />
        <h3>Over the past 30 days how many days, if any did you ...</h3>
        <form className="section_questions" onSubmit={pageSubmit}>
            {questions?.map((question: any, i: number) => {
                if (question.multiple) {
                    return <EditMultipleSelect question={question} id={`question_${i}`} key={question._id} defaultValue={drug[question.state]} />
                }
                else if (question.number_input) {
                    return <EditNumberInput question={question} id={`question_${i}`} key={question._id} defaultValue={drug[question.state]} />
                }
                else if (question.drop_down) {
                    return <EditDropDownSelect question={question} id={`question_${i}`} key={question._id} defaultValue={drug[question.state]} />
                }
                else {
                    return <EditButtonSelect question={question} id={`question_${i}`} key={question._id} defaultValue={drug[question.state]} />
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
    const interview_record = await db.collection(ctx.params.type).findOne({ _id: new ObjectId(ctx.params.id as string) }, { _id: 1, "behaviors.drug": 1, type: 1 })
    return {
        props: {
            interview_record: JSON.parse(JSON.stringify(interview_record)),
            adult: JSON.parse(JSON.stringify(ctx.params.adult))
        }
    }
}