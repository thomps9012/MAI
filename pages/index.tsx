import Link from "next/link";
export default function BasePage() {
    return <main className="landing">
        <a className="landing-link"><Link href='/interview'>Begin New Interview</Link></a>
        <a className="landing-link"><Link href='/admin/interviews'>Review Interviews</Link></a>
        <a className="landing-link"><Link href='/admin/clients'>Review Clients</Link></a>
        <a className="landing-link"><Link href='/gift_card/records'>Disperse Gift Card</Link></a>
    </main>
}
