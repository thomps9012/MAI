import Link from "next/link";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";
export default function AnswersPage() {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.admin) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const { data, error } = useSWR('/api/answers/all', fetcher)
    if (error) return <main className="landing"><h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1></main>
    return <main className="container">
        <h1>Edit Answers</h1>
        <h1><Link href='/admin/add/answer_choice'><a>Add New Option</a></Link></h1>
        {data?.map((answer: any) => <div className="answer_choice_section">
            <h3>Type - {titleCase(answer.type.split("_").join(" "))}</h3>
            <h3>Choices</h3>
            {answer.choices.map((choice: string) => <p>{choice}</p>)}
            {user_data.editor && <Link href={`/admin/edit/${answer._id}/answer_choice`}>Edit Answer</Link>}
            <hr />
        </div>)}
    </main>
}