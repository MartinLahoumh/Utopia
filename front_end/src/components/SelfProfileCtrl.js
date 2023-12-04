//components
import SelfProfileHTML from "../presentations/SelfProfileHTML";

function SelfProfileCtrl(props) {

  return (
    <>
      <SelfProfileHTML info={props.info}/>
    </>
  );
}

export default SelfProfileCtrl;