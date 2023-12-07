//hooks
import { useState, useEffect } from "react";

//methods
import dbTip from "../db methods/dbTip";

//components
import TipHTML from "../presentations/TipHTML";

function TipCtrl(props) {

    //decides whether to show the tip thingy or not
    const [showInput, setShowInput] = useState(false);
    //contains the user input
    const [amount, setAmount] = useState(0);

    //state to control database request
    const [requestTip, setRequestTip] = useState(false);

    const [me] = props.whichCookies();
    const you = props.target;

    //effect hook to do the tipping
    useEffect(() => {
        async function tip() {
            if (requestTip) {
                const [uid, key] = props.whichCookies();

                try {
                    if (!Number.isInteger(parseInt(amount))) {
                        alert("You didn't enter in a number.");
                    } else {
                        //tip
                        const error = await dbTip(uid, key, props.target, parseInt(amount));

                        //if successful, do these behaviors
                        if (error == null) {
                            setAmount(0); //reset field
                            alert("Tipped.");

                            //trigger a refresh
                            props.triggerGetUserInfo();
                        } else {
                            alert("Error: " + error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestTip(false);
                }
            }
        }
        tip();
    }, [requestTip]);

    //function that triggers the add balance effect
    function triggerTip() {
        setRequestTip(true);
    }


    function toggleShowInput() {
        setShowInput((prev) => !prev);
    }

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    return (
        <>
            <TipHTML showInput={showInput} toggleShowInput={toggleShowInput}
                amount={amount} handleAmountChange={handleAmountChange}
                triggerTip={triggerTip} 
                me={me} you={you}/>
        </>
    )
}

export default TipCtrl;