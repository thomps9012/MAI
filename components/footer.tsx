import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../utils/userReducer";

export default function Footer() {
    const user_info = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const router = useRouter()
    const Logout = async () => { 
        await caches.delete('user')
        await caches.delete('interviews')
        await caches.delete('clients')
        await caches.delete('gift_cards')
        await caches.delete('answers')
        await caches.delete('questions')
        dispatch(logoutUser()) 
    }
    if (!user_info.logged_in) {
        return <footer>
            <a className="nav-link" onClick={() => router.push('/sign_in')}>Sign In</a>
            <a className="nav-link" onClick={() => router.push('/sign_up')}>Sign Up</a>
        </footer>
    } else {
        return <footer>
            <a className="nav-link" onClick={() => router.push(`/admin/users/${user_info.user?._id}`)}>Welcome, {user_info.user?.full_name}</a>
            <a className="nav-link" onClick={Logout}>Logout</a>
        </footer>
    }
}