import Link from "next/link";
import { useRouter } from "next/router"
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function BasePage() {
    const { data: adult_questions, error: adult_err } = useSWR('/api/adult_questions', fetcher)
    const { data: youth_questions, error: youth_err } = useSWR('/api/youth_questions', fetcher)
    const { data: answers, error: answer_err } = useSWR('/api/answers', fetcher)
    if (adult_err || youth_err || answer_err) return <div>Failed to load</div>
    adult_questions?.map((question: any) => question.answer_choices = answers?.find((answer: any) => answer._id === question.answers))
    youth_questions?.map((question: any) => question.answer_choices = answers?.find((answer: any) => answer._id === question.answers))
    console.log('answers', answers)
    console.log('adult questions', adult_questions)
    console.log('youth questions', youth_questions)
    const router = useRouter();
    return <main>
        <button><Link href='/interview'>Begin Interview</Link></button>
    </main>
}
