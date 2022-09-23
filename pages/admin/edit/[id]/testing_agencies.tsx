import Link from "next/link";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../../utils/mongodb";
import titleCase from "../../../../utils/titleCase";

export default function BasePage({ answer_id, agencies }: { agencies: any, answer_id: string }) {
    const router = useRouter();
    const saveEdits = async () => {
        const agency_names = document.getElementsByClassName('agency_name')
        let agency_arr = [];
        for (let i = 0; i < agency_names.length; i++) {
            const name = (agency_names[i] as HTMLInputElement).value.toUpperCase().split(" ").join("_")
            agency_arr.push(name)
        }
        const response = await fetch('/api/answers/edit', {
            headers: { 'answer_id': answer_id },
            body: JSON.stringify({
                type: 'TESTING_AGENCIES',
                choices: agency_arr
            })
        }).then(res => res.json())
        response.acknowledged && router.push('/admin/answer_choices')
    }
    return <main className="container">
        <h1>Current Testing Agencies</h1>
        {agencies.choices.map((agency: string) => <input className='agency_name' key={agency} defaultValue={titleCase(agency.split("_").join(" "))} />)}
        <a className="button" onClick={saveEdits}>Save Changes</a>
        <Link href="/admin/add/testing_agency">Add New Agency</Link>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const { db } = await connectToDatabase();
    const agencies = await db.collection('answers').findOne({ _id: ctx.params.id })
    return {
        props: {
            agencies: agencies ? JSON.parse(JSON.stringify(agencies)) : {},
            answer_id: ctx.params.id ? ctx.params.id : ""
        }
    }
}