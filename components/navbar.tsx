import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    const active_route = router.route
    const full_route = router.pathname
    useEffect(() => {
        console.log(active_route)
        console.log('full_route', full_route)
        const links = document.getElementsByClassName('nav-link') as unknown as Array<HTMLElement>
        const links2 = document.getElementsByClassName('hidden-link') as unknown as Array<HTMLElement>
        const all_links = [...links, ...links2]
        for (let i=0; i< all_links.length; i++){
            const link = all_links[i] as HTMLElement
            console.log(link.id === active_route)
            link.id === active_route ? link.setAttribute('class', 'hidden-link') : link.setAttribute('class', 'nav-link')
        }
    }, [active_route])
    return <nav>
        <ul className="web-nav">
            <li className="nav-link" id="/"><Link href="/"><a>Home</a></Link></li>
            <li className="nav-link" id="/interview"><Link href="/interview"><a>Begin Interview</a></Link></li>
            {user_info.admin && <>
                <li className="nav-link" id="/admin/clients"><Link href="/admin/clients"><a>Review Clients</a></Link></li>
                <li className="nav-link" id="/gift_card/records"><Link href="/gift_card/records"><a>Gift Card Records</a></Link></li>
                <li className="nav-link" id="/admin/interviews"><Link href="/admin/interviews"><a>Interview Data</a></Link></li>
            </>}
            {user_info.editor && <>
                <li className="nav-link" id="users"><Link href="/admin/users/manage"><a>Manage Users</a></Link></li>
                <select value={activeLink} className="nav-select" onChange={setEditNav}>
                    <option className="nav-link" value="" disabled hidden>Edit...</option>
                    <option className="nav-link" value="gift_cards" id="/admin/gift_cardss">Gift Cards</option>
                    <option className="nav-link" value="questions" id="/admin/questions">Questions</option>
                    <option className="nav-link" value="answer_choices" id="/admin/answers">Answers</option>
                </select>
            </>}
        </ul>
        <a className="mobile-menu" onClick={() => setShow(!show)}><p>Menu</p></a>
        <ul className={`mobile-nav-${show ? 'show' : 'hide'}`} onMouseLeave={() => setShow(false)}>
            <li className="nav-link" onClick={() => setShow(false)} id="/"><Link href="/"><a>Home</a></Link></li>
            <li className="nav-link" onClick={() => setShow(false)} id="/interview"><Link href="/interview"><a>Begin Interview</a></Link></li>
            {user_info.admin && <>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/clients"><Link href="/admin/clients"><a>Review Clients</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)} id="/gift_card/records"><Link href="/gift_card/records"><a>Gift Card Records</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/interviews"><Link href="/admin/interviews"><a>Interview Data</a></Link></li>
            </>}
            {user_info.editor && <>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/users/manage"><Link href="/admin/users/manage"><a>Manage Users</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/gift_cards"><Link href="/admin/gift_cards"><a>Edit Gift Card Options</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/questions"><Link href="/admin/questions"><a>Question Options</a></Link></li>
                <li className="nav-link" onClick={() => setShow(false)} id="/admin/answer_choices"><Link href="/admin/answer_choices"><a>Answer Options</a></Link></li>
            </>}
        </ul>
    </nav>
}