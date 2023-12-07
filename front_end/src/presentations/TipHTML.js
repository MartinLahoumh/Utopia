function TipHTML(props) {

    if (props.showInput) {
        return (
            <>
                <div>
                    <input type="number" id="tip-amount" name="tip-amount" step="1" 
                           onChange={props.handleAmountChange} style={{ width: "50px" }} 
                           value={props.amount} />
                    <div>
                        <button onClick={props.triggerTip}>Tip</button>
                        <button onClick={props.toggleShowInput}>Cancel</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='follow-button-post' onClick={props.toggleShowInput}>Tip</div>
        </>
    )
}

export default TipHTML;