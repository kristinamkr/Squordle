/*
 * User.js
*/

import classes from "./style/User.module.css";

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function User(props)
{
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState('');
    const user = props.user;

    const handleSubmit = (event) => {
        event.preventDefault();
        // signIn();
        signUp();
    }

    function signUp() {
        let data = { user: username,
                     pass: pwd,
                     pokeDollars: localStorage.pokeDollars };
 
        console.log(JSON.stringify(data));

        async function postUser() {
            return await fetch(`http://localhost:3000/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json());
        }

        var jsonResponse = postUser();
        console.log("PostUSER-Return: "+jsonResponse);
    }

    function signIn() {
        async function fetchUser() {
            return await fetch(`http://localhost:3000/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, pwd}),
            }).then(res => res.json())
               .catch((err) => console.error(err));
        }

        fetchUser().then(function(result) {
            props.userHandler(result[0]);
        }).catch(err => {
            console.log("User DNE");
        });
    }

    function saveData()
    {
    /*
        let data = { name: user.name,
                     region: localStorage.region,
                     pokeDollars: Number(localStorage.pokeDollars),
                     shuckleInfo: JSON.parse(localStorage.shuckleInfo),
                     inventory: JSON.parse(localStorage.inventory) };
    */

        async function updateUserInfo() {
            const response = await fetch(`http://localhost:3000/saveData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name: user.name })
            });

            const content = await response.json(); 
            console.log(content);
        }

        if (updateUserInfo) console.log("Successfully saved user info!");
        else console.log("Something wrong :( x2");
    } 

    console.log(user.name);

	return (
        <> {user.name === "guest" &&
            <form onSubmit={handleSubmit}>
                <label> username:
                    <input
                       value = {username} 
                       onChange = {(e) => setUsername(e.target.value)}
                    />
                </label>
                <br/>
                <label> password:
                    <input
                        value = {pwd}
                        onChange = {(e) => setPwd(e.target.value)}
                    />
                </label>
                <br/>
                <input type = "submit" 
                       onClick = {() => signIn}
                />
            </form>}
        {!(user.name === "guest") && 
            <> <h1> WELCOME {user.name} ! </h1>
			<button onClick = {saveData}> Save </button>
            </>
        }
    </>
    );
}

export default User;
