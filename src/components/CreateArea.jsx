import React, { useState } from "react";
import Axios from 'axios';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    createdAt: new Date()
  });
  const [isExpanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });

    Axios.post('http://localhost:8080/notes/', {
      title : note.title,
      content : note.content,
      username : props.username
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log('Error: ' + err);
    });

    
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />)}
        
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
