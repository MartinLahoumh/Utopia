//hooks
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//assets
import biden_pfp from '../static/images/biden-pfp.jpg';
import kojima_pfp from '../static/images/kojima-pfp.jpg';
import mario_pfp from '../static/images/mario-pfp.jpg';

//methods
import { dbGetPosts } from "../db methods/dbGetPosts";

//components
import PageHTML from "../presentations/PageHTML";

function PageCtrl(props) {
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  const [page, setPage] = useState("ForYou") //This determines what part of the page we render. EX: For you page or Job List page

  const [jobs, setJobs] = useState([{}]); //Set Job Info Here

  //These are all temp values. In reality, this wont be filled up like this, you fill it up from back end. This stores all our posts
  const [tempPosts, setTempPosts] = useState([{
    "pfp": biden_pfp,
    "author": "Jo Biden",
    "date": "July 4, 2023",
    "body": "I am the president yo",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }, {
    "pfp": kojima_pfp,
    "author": "Hideo Kojima",
    "date": "July 4, 2023",
    "body": "Hey, have you played metal gear? Do you know what metal gear is? Let me know if you played it ok? Yes? metal gear.",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }, {
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }, {
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }, {
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }])

  //state that contains post ids
  const [posts, setPosts] = useState([]);
  const [before, setBefore] = useState(null);

  //state that triggers getting posts
  const [requestGetPosts, setRequestGetPosts] = useState(false);

  //Account Info
  const [accountOption, setAccountOption] = useState("account-post");

  //effect hook that populates the posts
  useEffect(() => {
    async function handleGetPosts() {
      if (requestGetPosts) {
        try {
          const [posts, beforeResult, error] = await dbGetPosts(cookies['uid'], cookies['key'], 5, before);
          
          if (error == null) {
            setBefore(beforeResult);
            setPosts(posts);
          }
        } catch(error) {
          console.log(error);
        } finally {
          setRequestGetPosts(false);
        }
      }
    }
    handleGetPosts();
  }, [requestGetPosts]);

  //effect hook that triggers getting posts on component refresh
  useEffect(() => {
    setRequestGetPosts(true);
  }, [])


  const changePage = (e) => {
    if (e.target.id == "ForYou") {
      setPage("ForYou");
    }
    else if (e.target.id == "Following") {
      setPage("Following");
    }
    else if (e.target.id == "Jobs") {
      setPage("Jobs");
    }
    else if(e.target.id == "Account"){
      setPage("Account")
    }
  }

  return (
    <>
      <PageHTML info={props.info}
        page={page} changePage={changePage}
        posts={tempPosts} 
        test={posts}/>
    </>
  )
}

export default PageCtrl;