import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from 'react-cookie';
import './App.css';
import logo from './static/images/utopia-logo.png';
import biden_pfp from './static/images/biden-pfp.jpg';
import kojima_pfp from './static/images/kojima-pfp.jpg';
import mario_pfp from './static/images/mario-pfp.jpg';
import Header from './components/header';
import ViewCard from './components/view-post-card';
import PostCard from './components/post-card';
import ProfileCard from './components/profile-view-card';
import Browse from './components/browse';
import JobCard from "./components/job-card";


function App() {
  let [page, setPage] = useState("ForYou") //This determines what part of the page we render. EX: For you page or Job List page
  //These are all temp values. In reality, this wont be filled up like this, you fill it up from back end. This stores all our posts
  let [posts, setPosts] = useState([{ 
    "pfp": biden_pfp,
    "author": "Jo Biden",
    "date": "July 4, 2023",
    "body": "I am the president yo",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  },{
    "pfp": kojima_pfp,
    "author": "Hideo Kojima",
    "date": "July 4, 2023",
    "body": "Hey, have you played metal gear? Do you know what metal gear is? Let me know if you played it ok? Yes? metal gear.",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  },{
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  },{
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  },{
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }])

  let [jobs, setJobs] = useState([{}]); //Set Job Info Here
  const suggested_users = [] //Get from the backend and fill it here
  const trending_users = [] //Get from the backend and fill it here

  const tempRequirments = ['Good work ethic', 'team player'];

  const changePage = (e)=>{
    if(e.target.id == "ForYou"){
      setPage("ForYou");
    }
    else if(e.target.id == "Following"){
      setPage("Following");
    }
    else if(e.target.id == "Jobs"){
      setPage("Jobs");
    }
  }

  const Page = (page)=>{
    if(page == 'ForYou'){
      const colors = ["#fa000055","#0000fa55","#00ff005b", "#ffff0055"]
      return(
        <>
          <PostCard pfp={biden_pfp} author='Biden' /> {/*Temp values. Replace with users pfp and name */}
          {posts.map((post) =>(
            <ViewCard pfp={post["pfp"]} author={post["author"]} body={post["body"]} color={colors[Math.floor(Math.random() * (4))]} likes={post["likes"]} tags={post["tags"]} />
          ))}
        </>
      )
    }
    else if(page == 'Jobs'){
      return(
        <div className="job-posts-container">
          {/*Like with users, once you get the jobs, map it. I just made it temp values for demonstration purposes */}
          <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments}/>
          <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments}/>
          <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments}/>
          <JobCard jobIcon={biden_pfp} position="President" requirements={tempRequirments}/>
        </div>
      )
    }
  }

  return (
    // wrapping the app component in a CookiesProvider allows cookies to be visible within the whole component
    <CookiesProvider>
      <div className="header-container">
        <Header />
      </div>
      <div className="App">
        <div className="posts-container">
          <div className="main-filters">
            <h4 id="ForYou" className="filter-option" onClick={changePage}>For You.</h4>
            <h4 id="Following" className="filter-option" onClick={changePage}>Following.</h4>
            <h4 id="Jobs" className="filter-option" onClick={changePage}>Jobs.</h4>
          </div>
          {/*<PostCard pfp={temp_info1["pfp"]} author={temp_info1["author"]} />
          <ViewCard pfp={temp_info1["pfp"]} author={temp_info1["author"]} body={temp_info1["body"]} color={"#fa000055"} likes={temp_info1["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info2["pfp"]} author={temp_info2["author"]} body={temp_info2["body"]} color={"#0000fa55"} likes={temp_info2["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info3["pfp"]} author={temp_info3["author"]} body={temp_info3["body"]} color={"#00ff005b"} likes={temp_info3["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info3["pfp"]} author={temp_info3["author"]} body={temp_info3["body"]} color={"#ffff0055"} likes={temp_info3["likes"]} tags={temp_info1["tags"]} />*/}
          {Page(page)}
          {/*<div className="job-posts-container">
            <JobCard requirements={tempRequirments}/>
            <JobCard requirements={tempRequirments}/>
            <JobCard requirements={tempRequirments}/>
            <JobCard requirements={tempRequirments}/>
          </div> */}

        </div>
      </div>
      <div className='header-container browse-container'>
        <Browse />
      </div>
    </CookiesProvider>
  );
}

export default App;
