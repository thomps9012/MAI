import DefaultHeader from "./defaultHeader";
import NavBar from "./navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <DefaultHeader />
      <NavBar />
      {children}
    </>
  );
}
