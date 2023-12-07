//hooks
import { useState } from "react";

//assets
import '../static/css/browse.css';
import '../static/css/post-card.css';
import heart from '../static/images/heart.png';

//components
import SuggestCtrl from "./SuggestCtrl";

const Browse = (props) => {
    let [open, setOpen] = useState(false); //Determines if the tab is open or not

    /* These are temp values. You will need to  GET the topics from backend and fill it out*/
    const trendingTopics = ['mario', 'biden', 'trump']
    /* I dont show it here but do the same thing for user profiles 
    Because the tab is closed at the start, I do not think we need to acess the backend info with a useEffect*/


    //Function that changes the open state. Looking back at it, I dont think I needed to do something like this but eh, wut can u do
    const browseOpen = (e) => {
        console.log(e.target.id);
        if (open == false) {
            setOpen(true);
        }
        else if (open == true) {
            setOpen(false);
        }
    }

    //Determines what to render based on the open state
    const isOpen = (open) => {
        if (open == true) {
            return (
                <>
                    {/*This is a container that will contain all the SUGGESTED content. Basically everything in yellow. */}
                    <div className='sub-container' style={{ backgroundColor: '#ffff0055', borderBottomStyle: 'solid', borderBottomColor: 'black', borderBottomWidth: '5px', borderTopStyle: 'solid', borderTopColor: 'black', borderTopWidth: '5px' }}>
                        <h2>Suggested</h2>
                        <div className='item-container'> {/* Will contain all the posts */}
                            <SuggestCtrl info={props.info} whichCookies={props.whichCookies} triggerGetUserInfo={props.triggerGetUserInfo}/>
                        </div>
                    </div>
                    {/*This is a container that will contain all the TRENDING content. Basically everything in red. */}
                    <div className='sub-container' style={{ backgroundColor: '#fa000055' }}>
                        <h2>Trending Topics</h2>
                        <div className='item-container'>
                            <ul>
                                {trendingTopics.map((topic) => (
                                    <>
                                        <li>{topic}</li>
                                        <br />
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )
        }
        else if (open == false) {
            return (<></>)
        }
    }

    return (
        <div className='browse-container-comp' id='browse-container-comp'>
            {/* This is the header of the comp. The section where it says 'Browse' */}
            <div className='browse-title-container' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={browseOpen}>
                <h1 className='browse-title'>Browse</h1>
            </div>
            {isOpen(open)}
        </div>
    );
}

export default Browse;