import DefaultHeader from "./defaultHeader";
import NavBar from "./navbar";

export default function Layout(children) {
  return (
    <>
      <DefaultHeader />
      <NavBar />
      {children}
    </>
  );
}
