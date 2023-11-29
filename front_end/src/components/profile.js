const Profile = (props) => {
    return (
      <div className='pfp-container'>
        Profile <br/>
        <img className='pfp-img' src={props.pfp} />
      </div>
    )
  }

export default Profile;