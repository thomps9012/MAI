import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { connectToDatabase } from "../../../utils/mongodb";

export default function EditUser({ user }: any) {
    const user_data = useSelector((state: any) => state.user)
    console.log(user)
    const router = useRouter();
    if (!user_data.editor && user_data.id != user._id) {
        return <main className="landing">
            <h1>You are Unauthorized to View this Page</h1><br />or<br /> <h1>Not Signed in</h1><hr /><Link href='/sign_in'>Login</Link><br /><Link href='/sign_up'>Sign Up</Link>
        </main>
    }
    const [full_name, setFullName] = useState(user.full_name)
    const [username, setUserName] = useState(user.username)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(user.email)
    const [admin, setAdmin] = useState(user.admin)
    const [editor, setEditor] = useState(user.editor)
    const saveEdits = async () => {
        const username_exists = await fetch(`/api/user/username_exists?username=${username}`)
        if (username_exists) return
        const email_exists = await fetch(`/api/user/email_exists?email=${email}`)
        if (email_exists) return
        if (password === '') {
            const res = await fetch('/api/user/edit', {
                method: 'POST',
                body: JSON.stringify({
                    id: user._id,
                    full_name: full_name,
                    username: username,
                    email: email,
                    admin: admin,
                    editor: editor
                })
            }).then(response => response.json())
            res.acknowledged && router.push('/admin/users/manage')
        } else {
            const res = await fetch('/api/user/edit', {
                method: 'POST',
                body: JSON.stringify({
                    id: user._id,
                    full_name: full_name,
                    username: username,
                    password: password,
                    email: email,
                    admin: admin,
                    editor: editor
                })
            }).then(response => response.json())
            console.log(res)
            res.acknowledged && router.push('/admin/users/manage')
        }
    }
    return <main className="landing">
        <h1>Edit {full_name}</h1>
        <form className="container">
            <p>Full Name</p>
            <input type="text" name="full_name" defaultValue={full_name} onChange={(e: any) => setFullName(e.target.value)} />
            <p>Username</p>
            <input type="text" name="username" defaultValue={username} onChange={(e: any) => setUserName(e.target.value)} />
            <p>Email</p>
            <input type="email" name="email" defaultValue={email} onChange={(e: any) => setEmail(e.target.value)} />
            <p>Password</p>
            <input type="password" name="password" placeholder="New Password..." onChange={(e: any) => setPassword(e.target.value)} />
            {user_data.editor && <>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <h3>Admin</h3>
                    <input
                        onChange={() => setAdmin(!admin)}
                        checked={admin}
                        type="checkbox"
                        className="checkbox"
                        name="admin"
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <h3>Editor</h3>
                    <input
                        onChange={() => setEditor(!editor)}
                        checked={editor}
                        type="checkbox"
                        className="checkbox"
                        name="editor"
                    />
                </div>
            </>}
            <a className="button" onClick={saveEdits}>Save Edits</a>
        </form>
    </main>
}

export async function getServerSideProps(ctx: any) {
    const user_id = ctx.query.id;
    console.log(user_id)
    const { db } = await connectToDatabase();
    const user_info = await db.collection('users').findOne({ _id: new ObjectId(user_id) })
    console.log(user_info)
    return {
        props: {
            user: JSON.parse(JSON.stringify(user_info))
        }
    }
}