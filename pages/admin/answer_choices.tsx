import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";
export default function AnswersPage() {
    const { data, error } = useSWR('/api/answers/all', fetcher)
    if (error) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    return <main className="container">
        <h1>Answer Choices</h1>
        <h1><Link href='/admin/add/answer_choice'><a>Add New Answer Option</a></Link></h1>
        {data?.map((answer: any) => <div className="answer_choice_section">
            <h3>Type - {titleCase(answer.type.split("_").join(" "))}</h3>
            <h3>Choices</h3>
            {answer.choices.map((choice: string) => <p>{choice}</p>)}
            <Link href={`/admin/edit/${answer._id}/answer_choice`}>Edit Answer</Link>
            <hr />
        </div>)}
    </main>
}