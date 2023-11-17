import s from "../static/css/sign-in.css"

//presentational component for the signing in/up widget
function SignInHTML(props) {

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

    //login panel content
    let panel = (
        <>
            {/* The border of login panel */}
            <div className='wrapper'>
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
            <div>
                <button onClick={props.toggleShowPanel}>Sign In</button>
            </div>
            {props.showPanel ? panel : <></>}
        </>
    );
}

export default SignInHTML;