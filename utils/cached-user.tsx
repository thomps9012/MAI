import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./userReducer";

export default function CachedUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cached_user = async () =>
      await (await caches.open("user"))
        .match("/current")
        .then((res) => res?.json());
    cached_user().then((res) => {
      if (res?._id) {
        dispatch(
          loginUser({
            id: res._id,
            full_name: res.full_name,
            admin: res.admin,
            editor: res.editor,
          })
        );
      }
    });
  }, []);
  return <></>;
}
