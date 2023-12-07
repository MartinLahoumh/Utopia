import OtherProfile from "../components/others-profile";

function SuggestHTML(props) {
    console.log("HTML gets:", props.usersInfo);

    return (
        <>
            {props.usersInfo.map((user, index) => {

                console.log(user);
                return (
                    <OtherProfile author={user['username']}
                                  pfp={user['avatar']}
                                  target={props.users[index]}
                                  whichCookies={props.whichCookies}
                                  info={props.info}
                                  triggerGetUserInfo={props.triggerGetUserInfo}/>
                );
            })}
        </>
    )
}

export default SuggestHTML;