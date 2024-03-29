import { useRouter } from "next/router";
import { useDispatch } from "react-redux"
import { loginUser } from "../utils/userReducer"

export default function SignIn() {
    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = async () => {
        const firstPW = (document.querySelector('.pw') as HTMLInputElement).value
        const userName = (document.querySelector('.username') as HTMLInputElement).value
        const email = (document.querySelector('.email') as HTMLInputElement).value
        if (email === '' && userName === '') return;
        let device = 'Unknown Device';
        if (navigator.userAgent.indexOf('Win') != -1) { device = 'Windows Device' }
        if (navigator.userAgent.indexOf('Mac') != -1) { device = 'Mac Device' }
        if (navigator.userAgent.indexOf('Linux') != -1) { device = 'Linux Device' }
        if (navigator.userAgent.indexOf('Android') != -1) { device = 'Android Device' }
        if (navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Linux') != -1) { device = 'Android/Linux Device' }
        const user_res = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                username: userName,
                password: firstPW
            })
        }).then(res => res.json())
        const device_info = await fetch('/api/user/device_info', {
            headers: { 'device': device, 'user_info': JSON.stringify(user_res) }
        }).then(res => res.json())
        // device_info && await fetch('/api/user/email_smtp', {
        //     method: 'POST',
        //     body: JSON.stringify(device_info)
        // })
        if (user_res.error) {
            alert(`there was a network error while logging into your account \n\n ${user_res.error}`)
        } else {
            const user_cache = await caches.open('user');
            user_cache.put('current', await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    username: userName,
                    password: firstPW
                })
            }))
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
            <input type='text' name='text' className='email' placeholder="or Email..." />
            <input type='text' name='password' className='pw' placeholder="Enter Password" />
            <a className="button" onClick={signIn}>Sign In</a>
        </form>
    </div>
}