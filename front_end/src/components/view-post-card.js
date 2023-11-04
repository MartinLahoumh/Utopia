import '../static/css/post-card.css';
import heart from '../static/images/heart.png';
const ViewCard = (props)=> {
    
  return (
    <>
        <div className='card'>
            <div className='card-header'>
                <img className='card-pfp-img' src={props.pfp}/>
                <div className='card-author-container'>
                    <h4 className='card-author'>{props.author}</h4>
                </div>
                <div className="tags">

                </div>
                <img className="card-pfp-img likes" src={heart}/>
                <p className="like-count">{props.likes}</p>
                
            </div>
            <div style={{backgroundColor: props.color}} className='card-body'>
                <h3>{props.body}</h3>
            </div>
        </div>
    </>
  );
}

export default ViewCard;