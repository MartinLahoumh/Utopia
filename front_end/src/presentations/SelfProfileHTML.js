const SelfProfileHTML = (props) => {
    

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
                
                <button className="main-button" onClick={props.triggerAddBalance}>Add Balance</button>
                <input type="number" id="balance-amount" name="balance-amount" step="1" onChange={props.handleBalanceChange} value={props.amount}/>
            </div>
        </>
    )
}

export default SelfProfileHTML;