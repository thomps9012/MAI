import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function NavBar() {
    const router = useRouter();
    const [activeLink, setActiveLink] = useState("")
    const [show, setShow] = useState(false);
    const user_info = useSelector((state: any) => state.user);
    const setEditNav = (e: any) => {
        const link = e.target.value;
        link === '' && router.push('/')
        router.push(`/admin/${link}`)
        setActiveLink("")
    }
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
                <li className="nav-link"><Link href="/admin/users/manage"><a>Manage Users</a></Link></li>
                <select value={activeLink} className="nav-select" onChange={setEditNav}>
                    <option className="nav-link" value="" disabled hidden>Edit...</option>
                    <option className="nav-link" value="gift_cards">Gift Cards</option>
                    <option className="nav-link" value="questions">Questions</option>
                    <option className="nav-link" value="answer_choices">Answers</option>
                </select>
            </>}
        </ul>
        <a className="mobile-menu" onClick={() => setShow(!show)}><p>Menu</p></a>
        <ul className={`mobile-nav-${show ? 'show' : 'hide'}`} onMouseLeave={() => setShow(false)}>
            <li className="nav-link" onClick={() => setShow(false)}><Link href="/"><a>Home</a></Link></li>
            <li className="nav-link"><Link href="/interview"><a>Begin Interview</a></Link></li>
            {user_info.admin && <>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/clients"><a>Review Clients</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/gift_card/records"><a>Gift Card Records</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/interviews"><a>Interview Data</a></Link></li>
            </>}
            {user_info.editor && <>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/users/manage"><a>Manage Users</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/gift_cards"><a>Edit Gift Card Options</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/questions"><a>Question Options</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)}><Link href="/admin/answer_choices"><a>Answer Options</a></Link></li>
            </>}
        </ul>
    </nav>
}