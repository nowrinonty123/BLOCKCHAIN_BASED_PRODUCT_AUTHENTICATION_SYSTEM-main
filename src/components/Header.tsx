import React, { ReactNode, useContext } from "react"
import {useRouter} from "next/router";
import { AuthContext } from "../contexts";
import { Button } from "./Button";
import { useFirebaseLogout } from "../hooks";

export function Header(){
  const {currentUser} = useContext(AuthContext);
  const router = useRouter();
  const {logout} = useFirebaseLogout();
  const {pathname} = router;

  let component: ReactNode = null;

  if(pathname === "/login" || pathname === "/register" || pathname === "/user"){
    component = <>
      <Button variant="secondary" content="Home" onClick={()=> router.push("/")}/>
    </>
  } else if(pathname === "/manager" || pathname === "/"){
    component = currentUser ? <>
      {pathname !== "/" && <Button variant="secondary" content="Home" onClick={()=> router.push("/")}/>}
      <Button variant="secondary" content="Logout" onClick={()=> {
        logout();
      }}/>
    </> : <>
      <Button variant="secondary" content="Login" onClick={()=> router.push("/login")}/>
      <Button variant="secondary" content="Register" onClick={()=> router.push("/register")}/>
    </>
  }

  return <div className="Header flex bg-gray-900 p-2 mb-5">
    {component}
  </div>
}