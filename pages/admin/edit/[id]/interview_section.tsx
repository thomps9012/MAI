import Link from "next/link"

export default function BasePage({ section_name }: { section_name: string }) {
    const saveEdits = async (item_id: string) => {

    }
    return <main className="container">
    <h1>Current Interview Section</h1>
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