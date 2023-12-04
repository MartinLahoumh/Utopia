const SelfProfileHTML = (props) => {
    console.log(props.info);

    return (
        <>
            <div className='pfp-container'>
                <img className='pfp-img' src={props.pfp} alt="deez" />
            </div>
            <div className="card">
                Profile!
                <br />
                Playing MapleStory <br />
                I am broke. <br/>
                {Object.keys(props.info).map((key) => (
                    <>
                        {key}: {props.info[key]} <br/>
                    </>
                ))}
            </div>
        </>
    )
}

export default SelfProfileHTML;