function Top3UsersHTML(props) {
    console.log("userinfo", props.usersInfo);

    return (
        <>
            Follow these guys!!! (Top 3 trending)

            <ul>
                {props.usersInfo.map((userinfo, index) => {
                    console.log("user contnet", userinfo);

                    return (
                        <>
                            <li key={index}>{userinfo['username']}</li>
                        </>
                    );
                })}
            </ul>
        </>
    );
}

export default Top3UsersHTML;