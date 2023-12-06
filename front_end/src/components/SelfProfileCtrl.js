//components
import SelfProfileHTML from "../presentations/SelfProfileHTML";
import { useEffect, useState } from "react";
function SelfProfileCtrl(props) {
  let [tipAmmount, setTipAmmount] = useState(0);
  let [usersBlocked, setUsersBlocked] = useState(0);
  let [totalMoney, setTotalMoney] = useState(0);

  const handleValueSubmit = (e)=>{
    if(e.target.id == 'tip-amount'){
      alert(`SENT ${tipAmmount} TO THE USER`);
    }
    else if(e.target.id == 'balance-amount'){
      alert(`YOU HAVE ${totalMoney} AMOUNT OF MONEY BROKIE!`);
    }
  }


  const handleTipChange = (e)=>{
    setTipAmmount(e.target.value);
  }

  const handleBalanceChange = (e)=>{
    setTotalMoney(e.target.value)
  }
  return (
    <>
      <SelfProfileHTML info={props.info} amtBalance={totalMoney} amtTip={tipAmmount} handleTipChange={handleTipChange} handleBalanceChange={handleBalanceChange} handleValueSubmit={handleValueSubmit}/>
    </>
  );
}

export default SelfProfileCtrl;