import s from "../static/css/sign-in.css"
import { useState } from "react";
import tempPfp from '../static/images/anon-pfp.jpg';
//presentational component for the signing in/up widget
function SignInHTML(props) {
    let [ordClicked, setOrdClick] = useState(true);
    let [corpClicked, setCorpClick] = useState(false);
    //raw content
    let loginHead = "Log In";
    let signupHead = "Sign Up";

    let loginQuestion = "Don't have an account?";
    let signupQuestion = "Already have an account?";

    let loginPrompt = "Sign up.";
    let signupPrompt = "Log in.";

    let loginButton = "Sign In";
    let signupButton = "Create Account";
    //display logic
    let heading = props.hasAccount ? loginHead : signupHead;
    let question = props.hasAccount ? loginQuestion : signupQuestion;
    let prompt = props.hasAccount ? loginPrompt : signupPrompt;
    let button = props.hasAccount ? loginButton : signupButton;

    //function logic
    let buttonLogic = props.hasAccount ? props.signIn : props.signUp;
    
    //document.getElementById('ordinary-btn').style = "";
    const buttonChange = (e)=>{
        console.log(e.target.id);
        if(e.target.id == 'ordinary-btn'){
            if(!ordClicked){
                e.target.style = "border-radius: 20px; box-shadow: none; margin-left:3px; margin-top:3px";
                document.getElementById('corp-btn').style = "";
                setCorpClick(false);
                setOrdClick(true);
                props.handleUserTypeChange("ORDINARY");
            }
        }
        else if(e.target.id == 'corp-btn'){
            if(!corpClicked){
                e.target.style = "border-radius: 20px; box-shadow: none; margin-left:3px; margin-top:3px";
                document.getElementById('ordinary-btn').style = "";
                setCorpClick(true);
                setOrdClick(false);
                props.handleUserTypeChange("CORPORATE");
            }
        }
    }
    
    //login panel content
    let panel = (
        <>
            {/* The border of login panel */}
            <div className='wrapper' >
                {/* The heading */}
                <div>
                    <h1>{heading}</h1>
                </div>

                {/* The input fields */}
                <div className='input-area'>
                    <label>Username</label>
                    <input value={props.email} onChange={props.handleEmailChange}/>
                    <br />
                    <label>Password</label>
                    <input value={props.password} onChange={props.handlePasswordChange} />
                    {heading == 'Sign Up'?
                    <>
                    <br/>
                    <label>User Type</label>
                    <div className="user-type-container">
                        <button value="ORDINARY" onClick={buttonChange} style={{borderRadius:"20px", boxShadow:"none", marginLeft:"3px", marginTop:"3px"}} className="main-button user-button" id='ordinary-btn'>Ordinary</button>
                        <button value="CORPORATE" onClick={buttonChange} className="main-button user-button" id="corp-btn">Corporate</button>
                    </div>
                    <br/>
                    {/* THIS IS THE PFP ICON, SAVE FOR EDITING YOUR PROFILE
                    <label>Profile Pic</label>
                        <input style={{opacity:"0%"}}accept="image/*" onChange={props.handlePfpChange} type="file" name="img" id="img-upload"hidden/>
                        <label style={{marginBottom:"0px"}} for='img-upload' className="pfp-container">
                            <img for='img-upload' className="pfp-img" src={props.pfpView}></img>
                        </label>*/
                    }
                    <label>Bio</label>
                    <textarea value={props.bio} onChange={props.handleBioChange}></textarea>
                    <br/>
                    </>
                    :null}
                </div>

                {/* The additional prompts */}
                <div>
                    {question} &#160;
                    <button className='fake-link' onClick={props.toggleHasAccount}>{prompt}</button>
                    <br />
                    <button className='fake-link' onClick={props.processForgotPassword}>Forgot password?</button>
                </div>

                <br />

                {/* Submit/cancel */}
                <div>
                    <button onClick={buttonLogic}>{button}</button>
                    <button>Cancel</button>
                </div>
            </div>
        </>
    )

    return (
        <>
            <div className="main-button-container">
                <button className="main-button" onClick={props.toggleShowPanel}>Sign In</button>
            </div>
            {props.showPanel ? panel : <></>}
        </>
    );
}

export default SignInHTML;