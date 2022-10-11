import { useRouter } from "next/router";

export default function BasePage() {
  const router = useRouter();
  return (
    <h1>
      This is test page on the <span>{router.pathname}</span> route with nothing
      built out yet
    </h1>
  );
}
