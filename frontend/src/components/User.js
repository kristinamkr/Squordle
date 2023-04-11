/*
 * User.js
*/

import classes from "./style/User.module.css";

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function User(props)
{
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');
    const user = props.user;

    const handleSubmit = (event) => {
        event.preventDefault();
        signIn();
        // signUp();
    }

    function signUp() {
        async function postUser() {
            return await fetch(`http://localhost:3000/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password}),
            }).then(res => res.json());
        }

        if (postUser) console.log("Successfully added user!");
        else console.log("Something wrong :(");
    }

    function signIn() {
        async function fetchUser() {
            return await fetch(`http://localhost:3000/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password}),
            }).then(res => res.json())
               .catch((err) => console.error(err));
        }

        fetchUser().then(function(result) {
            console.log(result[0]);
            props.userHandler(result[0]);
        }).catch(err => {
            console.log("User DNE");
        });
    }

    function saveData()
    {
        console.log("DATA SAVED");
    }    

	return (
        <> {!user &&
        <form onSubmit={handleSubmit}>
            <label> username:
                <input
                   value = {name} 
                   onChange = {(e) => setName(e.target.value)}
                />
            </label>
            <br/>
            <label> password:
                <input
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </label>
            <br/>
            <input type = "submit" 
                   onClick = {() => signIn}
            />
        </form>}
        {user && 
            <> <h1> WELCOME {props.user.name} ! </h1>
			<button onClick = {saveData}> Save </button>
            </>
        }
    </>
    );
}

export default User;
