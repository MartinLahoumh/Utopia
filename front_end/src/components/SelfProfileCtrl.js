//hooks
import { useEffect, useState } from "react";

//methods
import dbAddBalance from "../db methods/dbAddBalance";

//components
import SelfProfileHTML from "../presentations/SelfProfileHTML";

function SelfProfileCtrl(props) {

  //state to keep track of the user input
  let [amount, setAmount] = useState(0);

  //state to control database request
  const [requestAddBalance, setRequestAddBalance] = useState(false);

  //effect hook to add balance to the user's account
  useEffect(() => {
    async function addBalance() {
      if (requestAddBalance) {
        const [uid, key] = props.whichCookies();

        try {
          if (!Number.isInteger(parseInt(amount))) {
            alert("You didn't enter in a number.");
          } else {
            //add the balance
            const error = await dbAddBalance(uid, key, parseInt(amount));

            //if successful, do these behaviors
            if (error == null) {
              setAmount(0); //reset field
              alert("Balance added.");

              //trigger a refresh
              props.triggerGetUserInfo();
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setRequestAddBalance(false);
        }
      }
    }
    addBalance();
  }, [requestAddBalance]);

  //function that triggers the add balance effect
  function triggerAddBalance() {
    setRequestAddBalance(true);
  }

  const handleBalanceChange = (e) => {
    setAmount(e.target.value);
  }

  return (
    <>
      <SelfProfileHTML info={props.info} amount={amount}
        handleBalanceChange={handleBalanceChange}
        triggerAddBalance={triggerAddBalance} />
    </>
  );
}

export default SelfProfileCtrl;