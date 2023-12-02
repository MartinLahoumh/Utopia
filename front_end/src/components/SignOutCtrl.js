//hooks
import { useCookies } from "react-cookie";


//components
import SignOutHTML from "../presentations/SignOutHTML";

function SignOutCtrl() {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //function that removes cookies to reflect sign out behavior
    function signOut() {
        removeCookie("uid");
        removeCookie("key");
        setCookie("loggedIn", false);
    }

    return (
        <>
            <SignOutHTML signOut={signOut}/>
        </>
    )
}

export default SignOutCtrl;