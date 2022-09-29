import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserAdmin, setUserEditor, setUserID, setUserLoggedIn, setUserName } from "./userReducer";

export default function CachedUser(){
    const dispatch = useDispatch();
    useEffect(() => {
        const cached_user = async () => (await (await caches.open('user')).match('/info').then(res => res?.json()));
        cached_user().then(res => {
            if (res?._id) {
                dispatch(setUserLoggedIn(true))
                dispatch(setUserID(res._id))
                dispatch(setUserName(res.full_name))
                dispatch(setUserAdmin(res.admin))
                dispatch(setUserEditor(res.editor))
            }
        })
    }, [])
    return <></>
}