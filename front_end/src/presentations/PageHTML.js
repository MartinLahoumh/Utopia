//components
import JobsCtrl from '../components/JobsCtrl';
import ForYouCtrl from "../components/ForYouCtrl";
import AccountPage from '../components/account-page';
function PageHTML(props) {
    //display logic

    const suggested_users = [] //Get from the backend and fill it here
    const trending_users = [] //Get from the backend and fill it here

    let pageContent = <></>;
    if (props.page == 'ForYou') {
        pageContent = <ForYouCtrl searchItem={props.searchItem} info={props.info} whichCookies={props.whichCookies} triggerGetUserInfo={props.triggerGetUserInfo}/>
    }
    else if (props.page == "Following") {
        //pageContent = <FollowingCtrl info={props.info} whichCookies={props.whichCookies} triggerGetUserInfo={props.triggerGetUserInfo}/>;
    }
    else if (props.page == 'Jobs') {
        pageContent = <JobsCtrl whichCookies={props.whichCookies}/>
    }
    else if(props.page == 'Account'){
        pageContent = (
        <>
            <AccountPage />
        </>
        )
    }
    return (
        <>
            <div className="posts-container">
                <div className="main-filters">
                    <h4 id="ForYou" className="filter-option" onClick={props.changePage}>For You.</h4>
                    <h4 id="Following" className="filter-option" onClick={props.changePage}>Following.</h4>
                    <h4 id="Jobs" className="filter-option" onClick={props.changePage}>Jobs.</h4>
                </div>
                {pageContent}
            </div>
        </>
    )
}

export default PageHTML;