//hooks
import { useState } from "react";

//components
import PageHTML from "../presentations/PageHTML";

function PageCtrl(props) {
  //cookies

  const [page, setPage] = useState("ForYou") //This determines what part of the page we render. EX: For you page or Job List page

  //function that changes which page to display
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
        whichCookies={props.whichCookies}/>
    </>
  )
}

export default PageCtrl;