//hooks
import { useCookies } from "react-cookie";


//components
import SignOutHTML from "../presentations/SignOutHTML";

function SignOutCtrl(props) {
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //function that removes cookies to reflect sign out behavior
    function signOut() {
        //console.log("signout");
        removeCookie("uid");
        removeCookie("key");
        setCookie("loggedIn", false);
        props.triggerGetAnonUserInfo();
    }

    return (
        <>
            <SignOutHTML signOut={signOut}/>
        </>
    )
}

export default SignOutCtrl;