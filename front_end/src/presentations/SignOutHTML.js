function SignOutHTML(props) {
    return (
        <>
            <button className="main-button" onClick={props.signOut}>
                Log Out
            </button>
        </>
    )
}

export default SignOutHTML;