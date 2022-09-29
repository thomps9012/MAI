import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from "react-redux";

export default function BasePage({ section_name }: { section_name: string }) {
    const user_data = useSelector((state: any) => state.user)
    if (!user_data.editor) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1>
        </main>
    }
    const router = useRouter();
    const saveEdits = async () => {
        const response = await fetch('/api/questions/edit_section', {
            headers: { 'section_name': (document.getElementById('section_name') as HTMLInputElement)?.value }
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/questions')
    }
    return <main className="container">
        <h1>Current Interview Section</h1>
        <input defaultValue={section_name} id='section_name' />
        <span>*** Warning this will update all questions within the section ***</span>
        <a className="button" onClick={saveEdits}>Save Changes</a>
        <p> -- or --</p>
        <Link href="/admin/add/interview_section">Add New Interview Section</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    return {
        props: {
            section_name: ctx.params.id ? ctx.params.id : ""
        }
    }
}