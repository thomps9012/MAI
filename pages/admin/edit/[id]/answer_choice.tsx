import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../../utils/mongodb";

export default function BasePage({ answer_id, answer_choice }: { answer_choice: any, answer_id: string }) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const saveEdits = async () => {
        const answer_choices = document.getElementsByClassName('answer_choice')
        let choice_arr = [];
        for (let i = 0; i < answer_choices.length; i++) {
            const choice = (answer_choices[i] as HTMLInputElement).value
            choice != '' && choice_arr.push(choice)
        }
        const response = await fetch('/api/answers/edit', {
            headers: { 'answer_id': answer_id },
            body: JSON.stringify({
                type: answer_choice.type,
                choices: choice_arr
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
    }
    return <main className="container">
        <h1>Current Answer Choices</h1>
        {answer_choice.choices.map((choice: string) => <input className='answer_choice' key={choice} defaultValue={choice} />)}
        <h1>New Choices</h1>
        <span>Add Up to Five in One Update</span>
        <input className='answer_choice' />
        <input className='answer_choice' />
        <input className='answer_choice' />
        <input className='answer_choice' />
        <input className='answer_choice' />
        <a className="button" onClick={saveEdits}>Save Changes</a>
        <Link href="/admin/add/answer_choice">Add New Answer Option</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const answer_choice = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            answer_choice: answer_choice ? JSON.parse(JSON.stringify(answer_choice)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}