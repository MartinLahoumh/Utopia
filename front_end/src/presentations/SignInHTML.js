import s from "../styles/SignIn.module.css";

//presentational component for the signing in/up widget
function SignInHTML(props) {

    //styles
    const wrapper = s["wrapper"];
    const fakeLink = s["fake-link"];
    const inputArea = s["input-area"]

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
            <div className={wrapper}>
                {/* The heading */}
                <div>
                    <h1>{heading}</h1>
                </div>

                {/* The input fields */}
                <div className={inputArea}>
                    <div>Email: <input value={props.email} onChange={props.handleEmailChange} /> </div>
                    <br />
                    <div>Password: <input value={props.password} onChange={props.handlePasswordChange} /> </div>
                </div>

                {/* The additional prompts */}
                <div>
                    {question} &#160;
                    <button className={fakeLink} onClick={props.toggleHasAccount}>{prompt}</button>
                    <br />
                    <button className={fakeLink} onClick={props.processForgotPassword}>Forgot password?</button>
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