import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/userReducer";

export default function NavBar() {
    const router = useRouter();
    const dispatch = useDispatch();
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
    const logout = async () => {
        await caches.delete('user')
        await caches.delete('interviews')
        await caches.delete('clients')
        await caches.delete('gift_cards')
        await caches.delete('answers')
        await caches.delete('questions')
        dispatch(logoutUser(''))
    }
    useEffect(() => {
        console.log(active_route)
        console.log('full_route', full_route)
        const links = document.getElementsByClassName('nav-link') as unknown as Array<HTMLElement>
        const links2 = document.getElementsByClassName('hidden-link') as unknown as Array<HTMLElement>
        const all_links = [...links, ...links2]
        for (let i = 0; i < all_links.length; i++) {
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
        <div className="mobile-menu">
            <a onClick={() => setShow(!show)}><p>Menu</p></a>
            {user_info.loggedIn && <a onClick={() => router.push(`/admin/users/${user_info.id}`)}><p>{user_info.name}</p></a>}
            {user_info.loggedIn && <a onClick={logout}><p>Logout</p></a>}
        </div>
        <ul className={`mobile-nav-${show ? 'show' : 'hide'}`} onMouseLeave={() => setShow(false)}>
            <li className="nav-link" onClick={() => setShow(false)} id="/"><Link href="/"><a>Home</a></Link></li>
            <li className="nav-link" onClick={() => setShow(false)} id="/interview"><Link href="/interview"><a>Begin Interview</a></Link></li>
            {!user_info.loggedIn && <li className="nav-link" onClick={() => setShow(false)} id="/sign_in"><Link href="/sign_in"><a>Logn</a></Link></li>}
            {!user_info.loggedIn && <li className="nav-link" onClick={() => setShow(false)} id="/sign_up"><Link href="/sign_up"><a>Sign Up</a></Link></li>}
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

