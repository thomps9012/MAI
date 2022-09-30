import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function BasePage() {
    const user_data = useSelector((state: any) => state.user)
    const open_caches = async () => {   
        await caches.open('user')
        await caches.open('interviews')
        await caches.delete('clients')
        await caches.open('gift_cards')
        await caches.open('answers')
        await caches.open('questions')
    }
    useEffect(() => {open_caches()}, [])
    return <main className="landing">
        <Link href='/interview' ><a className="landing-link" onClick={() => sessionStorage.clear()}>Begin New Interview</a></Link>
        {user_data.admin && <>
            <Link href='/gift_card/records'><a className="landing-link">Disperse Gift Card</a></Link>
            <Link href='/admin/interviews'><a className="landing-link">Review Interviews</a></Link>
            <Link href='/admin/clients'><a className="landing-link">Review Clients</a></Link>
        </>}
    </main>
}
