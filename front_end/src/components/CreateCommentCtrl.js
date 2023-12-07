//hooks
import { useEffect, useState } from "react";

//methods
import { dbCreateComment } from "../db methods/dbCreateComment";

//components
import CreateCommentHTML from "../presentations/CreateCommentHTML";

function CreateCommentCtrl(props) {
    //state stores the text the user types
    const [body, setBody] = useState("");
    //state that controls whether to send a db request
    const [requestCreateComment, setRequestCreateComment] = useState(false);

    //effect hook that calls the db stuff
    useEffect(() => {
        async function handleCreateComment() {
            if (requestCreateComment) {
                const [uid, key] = props.whichCookies();

                try {
                    //make the db request
                    const [id, cost, error] = await dbCreateComment(uid, key, body, props.parent);

                    //reset the field afterwards, if successful
                    if (error == null) {
                        setBody("");
                        alert("Comment created.");
                        props.triggerGetInitialComments();
                    } else {
                        alert("Error: " + error);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setRequestCreateComment(false);
                }
            }
        }
        handleCreateComment();
    }, [requestCreateComment])

    //function that triggers the db request to create comment
    function triggerCreateComment() {
        setRequestCreateComment(true);
    }

    //function that updates body on user input
    function handleBodyChange(e) {
        setBody(e.target.value);
    }

    return (
        <>
            <CreateCommentHTML body={body} handleBodyChange={handleBodyChange}
                triggerCreateComment={triggerCreateComment} />
        </>
    );
}

export default CreateCommentCtrl;