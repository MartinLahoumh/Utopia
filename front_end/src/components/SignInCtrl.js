import { useState } from "react";
import SignInHTML from "../presentations/SignInHTML";

function SignInCtrl() {

    //state that determines whether to display the login panel or not
    const [showPanel, setShowPanel] = useState(false);
    //state that determines whether to display a login prompt (if true) or a signup prompt (if false) in the panel
    const [hasAccount, setHasAccount] = useState(true);
    //states that remember what was typed into the email and password field
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //FUNCTIONS THAT UPDATE STATES**********************************************************************************

    //function that toggles the hasAccount state
    function toggleHasAccount() {
        setHasAccount((prev) => !prev);
        console.log(hasAccount); //placeholder
    };

    //function that toggles the showPanel state
    function toggleShowPanel() {
        setShowPanel((prev) => !prev);
        console.log(showPanel); //placeholder
    }

    //function that updates email on event
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    //function that updates password on event
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    //FUNCTIONS THAT PROCESS USER ACTIONS**********************************************************************************

    //function that signs in once the user presses Sign In
    function signIn() {
        console.log("Sign in"); //placeholder
        console.log(email, password); //placeholder

        //reset fields after processing
        setEmail("");
        setPassword("");
    }

    //function that signs up once the user presses Create Account
    function signUp() {
        console.log("Sign up"); //placeholder
        console.log(email, password); //placeholder

        //reset fields after processing
        setEmail("");
        setPassword("");
    }

    //function that allows the user to reset password once the user presses Forgot Password?
    function processForgotPassword() {
        console.log("Forgot password"); //placeholder
    }

    return (
        <>
            <SignInHTML 
                showPanel={showPanel} toggleShowPanel={toggleShowPanel}
                hasAccount={hasAccount} toggleHasAccount={toggleHasAccount}
                signIn={signIn} signUp={signUp}
                email={email} handleEmailChange={handleEmailChange}
                password={password} handlePasswordChange={handlePasswordChange}
                processForgotPassword={processForgotPassword}/>
        </>
    );

}

export default SignInCtrl;