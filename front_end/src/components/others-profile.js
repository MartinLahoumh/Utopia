//hooks
import { useCookies } from 'react-cookie';

//assets
import '../static/css/post-card.css';
import '../static/css/profile-view-card.css';
import heart from '../static/images/heart.png';

//components
import FollowCtrl from './FollowCtrl';

const OtherProfile = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <>
      <div style={{ width: '70%' }} className='card'>
        <div className='card-header profile-card-header' style={{ borderBottomStyle: 'none' }}>
          <img className='card-pfp-img' src={props.pfp} />
          <div className='card-author-container'>
            <h4 className='card-author'>{props.author}</h4>
          </div>
          {cookies["loggedIn"] ? <FollowCtrl info={props.info["following"]}
                                              target={props.target}
                                              whichCookies={props.whichCookies}
                                              triggerGetUserInfo={props.triggerGetUserInfo} /> : null}
        </div>
      </div>
    </>
  );
}

export default OtherProfile;