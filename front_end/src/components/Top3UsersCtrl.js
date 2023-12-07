
//hooks
import { useState, useEffect } from "react";

//methods
import dbTop3Users from "../db methods/dbTop3Users";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//componenets
import Top3UsersHTML from "../presentations/Top3UsersHTML";

function Top3UsersCtrl(props) {
    const [users, setUsers] = useState([]);
    const [usersInfo, setUsersInfo] = useState([])

    const [requestTop3Users, setRequestTop3Users] = useState(false);
    const [requestGetUserInfo, setRequestGetUserInfo] = useState(false);

    //effect that makes db req for top 3 users
    useEffect(() => {
        async function handleTop3Users() {
            if (requestTop3Users) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //make the req
                    const [usersResult, error] = await dbTop3Users(uid, key);
                    

                    //console.log("soc ool", usersResult);

                    if (error == null) {
                        setUsers(usersResult);
                        triggerGetUserInfo(); //turn the result into info
                    } else {
                        alert("Error: " + error);
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestTop3Users(false);
                }
            }
        }
        handleTop3Users();
    }, [requestTop3Users])

    //effect that triggers request on load
    useEffect(() => {
        setRequestTop3Users(true);
    }, [])

    //USER INFO

    //effect to get user info
    useEffect(() => {
        async function handleGetUserInfo() {
            if (requestGetUserInfo) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    let newUsersInfo = [];

                    for (const user of users) {
                        const [info, error] = await dbGetUserInfo(uid, key, user);

                        if (error == null) {
                            newUsersInfo.push(info);
                        } else {
                            alert("Error: " + error);
                        }
                    }

                    setUsersInfo(newUsersInfo);


                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestGetUserInfo(false);
                }
            }
        }
        handleGetUserInfo();
    }, [requestGetUserInfo])

    //effect trigger user info
    function triggerGetUserInfo() {
        setRequestGetUserInfo(true);
    }

    return (
        <>
            <Top3UsersHTML usersInfo={usersInfo}/>
        </>
    )
}

export default Top3UsersCtrl;