import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../utils/userReducer";

export default function Footer() {
    const user_info = useSelector((state: any) => state.user)
    const dispatch = useDispatch();
    const router = useRouter()
    console.log('user info', user_info)
    const signIn = () => { }
    const Logout = () => { dispatch(logoutUser('')) }
    if (!user_info.loggedIn) {
        return <footer>
            <a onClick={() => router.push('/sign_in')}>Sign In</a>
            <a onClick={() => router.push('/sign_up')}>Sign Up</a>
        </footer>
    } else {
        return <footer>
            <p>Welcome, {user_info.name}
                <br />
                <a onClick={Logout}>Logout</a>
            </p>
        </footer>
    }
}