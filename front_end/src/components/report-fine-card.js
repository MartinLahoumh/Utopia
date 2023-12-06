import '../static/css/post-card.css';
import '../static/css/make-post-card.css';
import '../static/css/reports.css';
import heart from '../static/images/heart.png';
import mario from '../static/images/mario-pfp.jpg';
import { useState } from "react";
import { useCookies } from 'react-cookie';

const ReportFineCard = (props)=> {
    let [disputeText, setDisputeText] = useState("");
    let [disputeClick, setDisputeClick] = useState("Dispute");
    const handleDisputeClickChange = ()=>{
        if(disputeClick == "Dispute"){
            setDisputeClick("Send");
        }
        else if(disputeClick == "Send"){
            setDisputeClick("Dispute");
        }
    }

    const handleDisputeTextChange = (e)=>{
        setDisputeText(e.target.value);
    }
    
  return (
    <div className='report-card-container'>
    <div className='report-fine-container'>
        <div style={{backgroundColor:"red", width:"50%"}}>You Dumb</div>
        <div className='report-buttons'>
            <div style={{width:"100%"}} className='follow-button-post'>Pay</div>
            <div style={{width:"100%"}} className='follow-button-post' onClick={handleDisputeClickChange}>{disputeClick}</div>
        </div>
    </div>
        {disputeClick == "Send"?
        <>
        <textarea className="dispute-text" type="text-area" value={disputeText} onChange={handleDisputeTextChange}></textarea>
        </>:null}
    </div>
  );
}

export default ReportFineCard;