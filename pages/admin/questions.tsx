import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import NoDuplicates from "../../utils/remove-duplicates";
import titleCase from "../../utils/titleCase";
export default function QuestionsPage() {
    const { data, error } = useSWR('/api/questions', fetcher)
    if (error) return <h1>Trouble Connecting to the Database... <br /> Check Your Internet or Cellular Connection</h1>
    const adult_questions = data?.filter((question: any) => question.adult)
    const youth_questions = data?.filter((question: any) => question.adult === false)
    const agnostic_questions = data?.filter((question: any) => question.adult === null)
    const question_sections = data && NoDuplicates(data?.map((question: any) => question.section))
    return <main className="container">
        <section className="interview_question_section">
            <h1>Sections</h1>
            {question_sections?.map((section: string) => <div className="interview_section_detail" key={section}>
                <p>{titleCase(section.split("_").join(" "))}</p>
                <Link href={`/admin/edit/${section}/interview_section`}>Edit Section</Link>
            </div>)}
            <Link href="/admin/add/interview_section"><a>Add New Section</a></Link>
        </section>
        <section className="interview_question_section">
            <h1>Adult Questions</h1>
            {adult_questions?.map((question: any) => <div className="interview_question_detail" key={question._id}>
                <p>{titleCase(question.section.split("_").join(" "))}</p>
                <p>{question.question}</p>
                {question.detail && <p>{question.detail}</p>}
                <Link href={`/admin/edit/${question._id}/question`}>Edit Question</Link>
            </div>)}
            <Link href="/admin/add/interview_question"><a>Add New Question</a></Link>
        </section>
        <section className="interview_question_section">
            <h1>Youth Questions</h1>
            {youth_questions?.map((question: any) => <div className="interview_question_detail" key={question._id}>
                <p>{titleCase(question.section.split("_").join(" "))}</p>
                <p>{question.question}</p>
                {question.detail && <p>{question.detail}</p>}
                <Link href={`/admin/edit/${question._id}/question`}>Edit Question</Link>
            </div>)}
            <Link href="/admin/add/interview_question"><a>Add New Question</a></Link>
        </section>
        <section className="interview_question_section">
            <h1>Agnostic Questions</h1>
            {agnostic_questions?.map((question: any) => <div className="interview_question_detail" key={question._id}>
                <p>{titleCase(question.section.split("_").join(" "))}</p>
                <p>{question.question}</p>
                {question.detail && <p>{question.detail}</p>}
                <Link href={`/admin/edit/${question._id}/question`}>Edit Question</Link>
            </div>)}
            <Link href="/admin/add/interview_question"><a>Add New Question</a></Link>
        </section>
    </main>
}