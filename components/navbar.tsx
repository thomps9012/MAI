import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavBar() {
    const user_info = useSelector((state: any) => state.user);
    return <nav>
        <ul className="web-nav">
            <li className="nav-link"><Link href="/"><a>Home</a></Link></li>
            <li className="nav-link"><Link href="/interview"><a>Begin Interview</a></Link></li>
            {user_info.admin && <>
                <li className="nav-link"><Link href="/admin/clients"><a>Review Clients</a></Link></li>
                <li className="nav-link"><Link href="/gift_card/records"><a>Gift Card Records</a></Link></li>
                <li className="nav-link"><Link href="/admin/interviews"><a>Interview Data</a></Link></li>
            </>}
            {user_info.editor && <>
                <li className="nav-link"><Link href="/admin/gift_cards"><a>Edit Gift Card Options</a></Link></li>
                <li className="nav-link"><Link href="/admin/questions"><a>Question Options</a></Link></li>
                <li className="nav-link"><Link href="/admin/answer_choices"><a>Answer Options</a></Link></li>
            </>}
        </ul>
    </nav>
}