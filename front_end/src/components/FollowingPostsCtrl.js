import React, { useState, useEffect } from 'react';
import FollowingPostsHTML from './FollowingPostsHTML';
import { useCookies } from 'react-cookie';

// Assuming dbGetPosts, dbGetPostInfo, dbCheckFollow, and dbGetUserInfo are available
import { dbGetPosts, dbGetPostInfo, dbCheckFollow, dbGetUserInfo } from '../db methods';

function FollowingPostsCtrl(props) {
    const [cookies] = useCookies();
    const [posts, setPosts] = useState([]);
    const [requestGetPostInfo, setRequestGetPostInfo] = useState(false);

    // Fetch initial posts and filter them based on follow status
    useEffect(() => {
        async function fetchAndFilterPosts() {
            if (props.requestGetInitialPosts) {
                const [uid, key] = props.whichCookies();
                try {
                    const [allPosts, beforeResult, error] = await dbGetPosts(uid, key, 10, null, ["POST"]);
                    if (error) {
                        throw new Error(error);
                    }

                    // Filter posts based on follow status
                    const followedPosts = await filterFollowedPosts(uid, key, allPosts);
                    setPosts(followedPosts);
                    setRequestGetPostInfo(true); // Trigger the next useEffect to get post info
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        }
        fetchAndFilterPosts();
    }, [props.requestGetInitialPosts, props.whichCookies]);

    // Function to filter posts based on is user is following post's author
    async function filterFollowedPosts(uid, key, allPosts) {
        let followedPosts = [];
        for (const post of allPosts) {
            const isFollowed = await dbCheckFollow(uid, key, post.author);
            if (isFollowed) {
                followedPosts.push(post);
            }
        }
        return followedPosts;
    }
        //same useEffect as ForYouCtrl
    useEffect(() => {
        async function handleGetPostsInfo() {
            if (requestGetPostInfo) {
                const [uid, key] = props.whichCookies();
                try {
                    let newPostsInfo = [];
                    let newUsersInfo = [];
                    for (const postid of posts) {
                        const postInfo = await dbGetPostInfo(uid, key, postid);
                        newPostsInfo.push(postInfo);
                        const userInfo = await dbGetUserInfo(uid, key, postInfo[0]['author']);
                        newUsersInfo.push(userInfo);
                    }
                    setPostsInfo(newPostsInfo);
                    setUsersInfo(newUsersInfo);
                } catch (error) {
                    console.log(error)
                } finally {
                    setRequestGetPostInfo(false);
                }
            }
        }
        handleGetPostsInfo();
    }, [requestGetPostInfo, posts, props]);

    return (
        <FollowingPostsHTML postsInfo={postsInfo} usersInfo={usersInfo} />
    );
}

export default FollowingPostsCtrl;
