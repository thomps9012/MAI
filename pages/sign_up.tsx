import { useRouter } from "next/router";
import { useDispatch } from "react-redux"
import { loginUser } from "../utils/userReducer";

export default function SignUp() {
    const dispatch = useDispatch();
    const router = useRouter();
    const passwordCheck = () => {
        const firstPW = (document.querySelector('.pw1') as HTMLInputElement).value
        const secondPW = (document.querySelector('.pw2') as HTMLInputElement).value
        firstPW != secondPW && alert('must have matching passwords')
    }
    const createUser = async () => {
        const firstPW = (document.querySelector('.pw1') as HTMLInputElement).value
        const secondPW = (document.querySelector('.pw2') as HTMLInputElement).value
        const userName = (document.querySelector('.username') as HTMLInputElement).value
        const fullName = (document.querySelector('.full_name') as HTMLInputElement).value
        if (firstPW != secondPW) {
            alert('must have matching passwords')
            return
        }
        const user_res = await fetch('/api/user/add', {
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                password: firstPW,
                full_name: fullName
            })
        }).then(res => res.json())
        console.log(user_res)
        if (user_res.acknowledged) {
            const user_id = user_res.insertedId
            const user_cache = await caches.open('user');
                user_cache.put('info', await fetch('/api/user/add', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: userName,
                        password: firstPW,
                        full_name: fullName
                    })
                }))
            dispatch(loginUser({
                id: user_id,
                full_name: fullName,
                admin: false,
                editor: false
            }))
            router.push('/')
        } else {
            alert(`there was a network error while logging into your account \n\n ${user_res.error}`)
        }

    }
    return <div className="landing">
        <form>
            <h1>Sign Up</h1>
            <input type='username' name='username' className='username' placeholder="Enter Username" />
            <input type='text' name='name' className='full_name' placeholder="Enter Full Name" />
            <input type='text' name='password' className='pw1' placeholder="Enter Password" />
            <input type='text' name='password' className='pw2' onBlur={passwordCheck} placeholder="Re-enter Password" />
            <a className="button" onClick={createUser}>Create Account</a>
        </form>
    </div>
}