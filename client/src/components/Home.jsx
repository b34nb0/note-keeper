import React, { useState, useEffect }  from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";


function Home() {

    const [notes, setNotes] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if(user) {
            // Authenticate user
            Axios.get(`/api/users/username/${user.username}`)
                .then(res => { 
                    const doc = (res.data);
                    if(user.password === doc.password) {
                        loadData();
                    } else {
                        window.location.replace('/login');
                    }
                    
                })
                .catch(err => {
                    console.log('Error: ' + err);
                });

        } else {
            window.location.replace('/login');
        }

    }, []);
    


    function loadData() {
        Axios.get(`/api/users/user/${user.username}/notes`)
            .then(res => { 
                console.log(res.data);           
                setNotes(res.data);
            })
            .catch(err => {
                console.log('Error: ' + err);
            });
    }

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter(noteItem => {
                return noteItem._id !== id;
            });
        });
        
        Axios.delete(`/api/notes/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log('Error: ' + err));
        
    }

    
    return (
        <div>
        <Header username={user && user.username}/>
        <CreateArea onAdd={addNote} username={user && user.username}/>
        {notes.map((noteItem, index) => {
            return (
            <Note
                key={index}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                createdAt={noteItem.createdAt}
                onDelete={deleteNote}
            />
            );
        })}
        
        <Footer />
        </div>
    );
    
}

export default Home;