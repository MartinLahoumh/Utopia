import { useState } from "react";
import SignInHTML from "../presentations/SignInHTML";
import axios from 'axios';
import tempPfp from '../static/images/anon-pfp.jpg';
import {sha256} from 'crypto-hash';

function SignInCtrl() {

    //state that determines whether to display the login panel or not
    const [showPanel, setShowPanel] = useState(false);
    //state that determines whether to display a login prompt (if true) or a signup prompt (if false) in the panel
    const [hasAccount, setHasAccount] = useState(true);
    //states that remember what was typed into the email and password field
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [pfp, setPfp] = useState(tempPfp);
    let [pfpView, setPfpView] = useState(tempPfp);
    let [bio, setBio] = useState("");
    let [userType, setUserType] = useState("ORDINARY");
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

    function handleBioChange(e) {
        setBio(e.target.value)
    }

    const handlePfpChange = (e)=> {
        console.log(e.target.files);
        setPfp(e.target.files[0]);
        setPfpView(URL.createObjectURL(e.target.files[0]));
    }

    const handleUserTypeChange = (type)=>{
        setUserType(type);
    }
    //FUNCTIONS THAT PROCESS USER ACTIONS**********************************************************************************

    //function that signs in once the user presses Sign In
    const signIn = async (e) =>{
        e.preventDefault();
        console.log("Sign in"); //placeholder
        const password_hashing = await sha256(password);
        const submission = {
            'username':email,
            'password_hash': password_hashing,
        }
        try {
            const response  = await axios.get('http://127.0.0.1:5000/users/signin', btoa(JSON.stringify(submission)));
            console.log(response);
            alert("Account Successfully Created! Have Fun!");
        } catch (error) {
            console.log(error);
        }
    }

    //function that signs up once the user presses Create Account
    const signUp = async (e) =>{
        e.preventDefault();
        console.log("Sign up"); //placeholder
        const password_hashing = await sha256(password);
        const submission = {
            'username':email,
            'password_hash': password_hashing,
            'avatar': pfp,
            'bio': bio,
            'user_type': userType,

        }

        try {
            const response  = await axios.post('http://127.0.0.1:5000/users/create', btoa(JSON.stringify(submission)));
            console.log(response);
            //reset fields after processing
            setEmail("");
            setPassword("");
            alert("Account Successfully Created! Have Fun!");
        } catch (error) {
            console.log(error);
        }
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
                pfp={pfp} handlePfpChange={handlePfpChange}
                pfpView={pfpView}
                bio={bio} handleBioChange={handleBioChange}
                handleUserTypeChange={handleUserTypeChange}
                processForgotPassword={processForgotPassword}/>
        </>
    );

}

export default SignInCtrl;