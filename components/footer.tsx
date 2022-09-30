import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../utils/userReducer";

export default function Footer() {
    const user_info = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const router = useRouter()
    console.log('user info', user_info)
    const Logout = async () => { 
        await caches.delete('user')
        await caches.delete('interviews')
        await caches.delete('client_info')
        await caches.delete('gift_cards')
        dispatch(logoutUser('')) 
    }
    if (!user_info.loggedIn) {
        return <footer>
            <a className="nav-link" onClick={() => router.push('/sign_in')}>Sign In</a>
            <a className="nav-link" onClick={() => router.push('/sign_up')}>Sign Up</a>
        </footer>
    } else {
        return <footer>
            <a className="nav-link" onClick={() => router.push('/')}>Welcome, {user_info.name}</a>
            <a className="nav-link" onClick={Logout}>Logout</a>
        </footer>
    }
}