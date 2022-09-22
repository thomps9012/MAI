import Link from "next/link"
import { useRouter } from "next/router"

export default function BasePage({ section_name }: { section_name: string }) {
    const router = useRouter();
    const saveEdits = async () => {
        const response = await fetch('/api/edit_section', {
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