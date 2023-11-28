import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from 'react-cookie';
import './App.css';
import logo from './static/images/utopia-logo.png';
import biden_pfp from './static/images/biden-pfp.jpg';
import kojima_pfp from './static/images/kojima-pfp.jpg';
import mario_pfp from './static/images/mario-pfp.jpg';
import Header from './components/header';
import ViewCard from './components/view-post-card';

function App() {

  const temp_info1 = {
    "pfp": biden_pfp,
    "author": "Jo Biden",
    "date": "July 4, 2023",
    "body": "I am the president yo",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA", "USA", "USA", "USA", "USA"]
  }

  const temp_info2 = {
    "pfp": kojima_pfp,
    "author": "Hideo Kojima",
    "date": "July 4, 2023",
    "body": "Hey, have you played metal gear? Do you know what metal gear is? Let me know if you played it ok? Yes? metal gear.",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
  }

  const temp_info3 = {
    "pfp": mario_pfp,
    "author": "Mario",
    "date": "July 4, 2023",
    "body": "Elaphant",
    "likes": "50",
    "reposts": "60",
    "tags": ["President", "America", "USA"]
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
            <h4 className="filter-option">For You.</h4>
            <h4 className="filter-option">Anon.</h4>
            <h4 className="filter-option">Following.</h4>
          </div>
          <ViewCard pfp={temp_info1["pfp"]} author={temp_info1["author"]} body={temp_info1["body"]} color={"#fa000055"} likes={temp_info1["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info2["pfp"]} author={temp_info2["author"]} body={temp_info2["body"]} color={"#0000fa55"} likes={temp_info2["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info3["pfp"]} author={temp_info3["author"]} body={temp_info3["body"]} color={"#00ff005b"} likes={temp_info3["likes"]} tags={temp_info1["tags"]} />
          <ViewCard pfp={temp_info3["pfp"]} author={temp_info3["author"]} body={temp_info3["body"]} color={"#ffff0055"} likes={temp_info3["likes"]} tags={temp_info1["tags"]} />
        </div>

      </div>
    </CookiesProvider>
  );
}

export default App;
