//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//assets
import tempPfp from '../static/images/anon-pfp.jpg';

//methods
import { dbSignIn } from "../db methods/dbSignIn";
import { dbSignUp } from "../db methods/dbSignUp";
import { dbCreateBalance } from "../db methods/dbCreateBalance";

//components
import SignInHTML from "../presentations/SignInHTML";

function SignInCtrl(props) {
    //STATES**********************************************************************************

    //state that determines whether to display the login panel or not
    const [showPanel, setShowPanel] = useState(false);
    //state that determines whether to display a login prompt (if true) or a signup prompt (if false) in the panel
    const [hasAccount, setHasAccount] = useState(true);
    //states that remember what was typed into the email and password field
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pfp, setPfp] = useState(tempPfp);
    const [pfpView, setPfpView] = useState(tempPfp);
    const [bio, setBio] = useState("");
    const [userType, setUserType] = useState("ORDINARY");
    //states that act as the trigger for database requests
    const [requestSignUp, setRequestSignUp] = useState(false);
    const [requestSignIn, setRequestSignIn] = useState(false);

    //cookies
    const [cookies, setCookie, removeCookie] = useCookies();

    //EFFECTS**********************************************************************************

    //helper function that sets cookies and generates alerts for signing in and up
    function doLoginBehavior(error, uid, password_hash, successAlert, failureAlert) {
        if (error == null) {
            //these two are needed for db queries
            setCookie("uid", uid);
            setCookie("key", password_hash);
            //this is needed for front end renders. If this cookie is null (doesn't exist), then the user is not logged in.
            setCookie("loggedIn", true);

            //reset fields after processing
            setEmail("");
            setPassword("");
            alert(successAlert);
        } else {
            alert(failureAlert);
        }
    }

    //effect that handles the signing in process
    useEffect(() => {
        async function handleSignIn() {
            if (requestSignIn) {
                try {
                    //ping the signin endpoint
                    const [uid, password_hash, error] = await dbSignIn(password, email);
                    //try to set the cookies based on response data, if it was successful
                    doLoginBehavior(error, uid, password_hash, "Successfully signed in.", "Sign in failed. Error: " + error);

                    // if the signin was successful, refresh the user info of the logged in user
                    if (error == undefined) {
                        props.triggerGetUserInfo();
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestSignIn(false); //finish the request
                }
            }
        }

        handleSignIn();
    }, [requestSignIn, password, email, setCookie]);

    //effect that handles the signing up process
    useEffect(() => {
        async function handleSignUp() {
            if (requestSignUp) {
                try {
                    //ping the create user endpoint
                    const [uid, password_hash, error] = await dbSignUp(password, email, pfp, bio, userType);


                    //try to set the cookies based on response data, if it was successful
                    doLoginBehavior(error, uid, password_hash, "Account Successfully Created! Have Fun!", "Error creating user: " + error)

                    //next, create a balance for the user
                    const error2 = await dbCreateBalance(uid, password_hash);
                    //console.log("balance creation", error2);

                    // if the signin was successful, refresh the user info of the logged in user
                    if (error == undefined) {
                        props.triggerGetUserInfo();
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestSignUp(false); //finish the request
                }
            }
        }

        handleSignUp();
    }, [requestSignUp, password, email, bio, pfp, userType]);


    //FUNCTIONS THAT UPDATE STATES**********************************************************************************

    //function that toggles the hasAccount state
    function toggleHasAccount() {
        setHasAccount((prev) => !prev);
    };

    //function that toggles the showPanel state
    function toggleShowPanel() {
        setShowPanel((prev) => !prev);
    }

    //function that updates email on event
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    //function that updates password on event
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleBioChange(e) {
        setBio(e.target.value)
    }

    const handlePfpChange = (e) => {
        console.log(e.target.files);
        setPfp(e.target.files[0]);
        setPfpView(URL.createObjectURL(e.target.files[0]));
    }

    const handleUserTypeChange = (type) => {
        setUserType(type);
    }
    //FUNCTIONS THAT PROCESS USER ACTIONS**********************************************************************************

    //function that signs in once the user presses Sign In
    const triggerSignIn = (e) => {
        e.preventDefault();
        setRequestSignIn(true); //trigger the handling of sign in
    }

    //function that signs up once the user presses Create Account
    const triggerSignUp = (e) => {
        e.preventDefault();
        setRequestSignUp(true); //trigger the handling of sign up
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
                triggerSignIn={triggerSignIn} triggerSignUp={triggerSignUp}
                email={email} handleEmailChange={handleEmailChange}
                password={password} handlePasswordChange={handlePasswordChange}
                pfp={pfp} handlePfpChange={handlePfpChange}
                pfpView={pfpView}
                bio={bio} handleBioChange={handleBioChange}
                handleUserTypeChange={handleUserTypeChange}
                processForgotPassword={processForgotPassword} />
        </>
    );

}

export default SignInCtrl;