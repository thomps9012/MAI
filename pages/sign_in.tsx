import { useRouter } from "next/router";
import { useDispatch } from "react-redux"
import { loginUser } from "../utils/userReducer"

export default function SignIn() {
    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = async () => {
        const firstPW = (document.querySelector('.pw') as HTMLInputElement).value
        const userName = (document.querySelector('.username') as HTMLInputElement).value

        const user_res = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                password: firstPW
            })
        }).then(res => res.json())
        console.log(user_res)
        if (user_res.error) {
            alert(`there was a network error while logging into your account \n\n ${user_res.error}`)
        } else {
            dispatch(loginUser({
                id: user_res._id,
                full_name: user_res.full_name,
                admin: user_res.admin,
                editor: user_res.editor
            }))
            router.push('/')
        }
    }
    return <div className="landing">
        <form>
            <h1>Sign In</h1>
            <input type='text' name='text' className='username' placeholder="Enter Username" />
            <input type='text' name='password' className='pw' placeholder="Enter Password" />
            <a className="button" onClick={signIn}>Sign In</a>
        </form>
    </div>
}