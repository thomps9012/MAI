import Link from "next/link";
import { useSelector } from "react-redux";
export default function BasePage() {
    const user_data = useSelector((state: any) => state.user)
    return <main className="landing">
        <a className="landing-link"><Link href='/interview'>Begin New Interview</Link></a>
        <a className="landing-link"><Link href='/gift_card/records'>Disperse Gift Card</Link></a>
        {user_data.admin && <>
            <a className="landing-link"><Link href='/admin/interviews'>Review Interviews</Link></a>
            <a className="landing-link"><Link href='/admin/clients'>Review Clients</Link></a>
        </>}
    </main>
}
