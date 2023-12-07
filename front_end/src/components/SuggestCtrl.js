//hooks
import { useState, useEffect } from "react";

//methods
import dbSuggest from "../db methods/dbSuggest";
import { dbGetUserInfo } from "../db methods/dbGetUserInfo";

//componenets
import SuggestHTML from "../presentations/SuggestHTML";

function SuggestCtrl(props) {
    const [users, setUsers] = useState([]);
    const [usersInfo, setUsersInfo] = useState([])

    const [requestGetSuggested, setRequestGetSuggested] = useState(false);
    const [requestGetUserInfo, setRequestGetUserInfo] = useState(false);


    //effect that makes db req for top 3 users
    useEffect(() => {
        async function handleGetSuggested() {
            if (requestGetSuggested) {
                //get the right cookies
                const [uid, key] = props.whichCookies();

                try {
                    //make the req
                    const [usersResult, error] = await dbSuggest(uid, key);


                    //console.log("suggest", usersResult);

                    //slice the array because it's too large
                    const newUsers = usersResult.slice(0, 5);

                    if (error == null) {
                        setUsers(newUsers);
                        triggerGetUserInfo(); //turn the result into info
                    } else {
                        alert("Error: " + error);
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestGetSuggested(false);
                }
            }
        }
        handleGetSuggested();
    }, [requestGetSuggested])

    //effect that triggers request on load
    useEffect(() => {
        setRequestGetSuggested(true);
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

    console.log("suggested users", usersInfo);

    return (
        <>
            <SuggestHTML usersInfo={usersInfo} users={users} 
                         whichCookies={props.whichCookies}
                         info={props.info}
                         triggerGetUserInfo={props.triggerGetUserInfo}/>
        </>
    );
}

export default SuggestCtrl;