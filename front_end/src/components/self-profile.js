const SelfProfile = (props) => {
    return (
        <>
            <div className='pfp-container'>
                <img className='pfp-img' src={props.pfp} alt="deez" />
            </div>
            <div className="card">
                Profile!
                <br />
                Playing MapleStory <br />
                I am broke.
            </div>
        </>
    )
}

export default SelfProfile;