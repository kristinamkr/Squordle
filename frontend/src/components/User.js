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
        signIn();
        //signUp();
    }

    function signUp() {
        let data = { user: username,
                     pass: pwd,
                     inventory: JSON.parse(localStorage.inventory),
                     pokeDollars: Number(localStorage.pokeDollars),
                     region: localStorage.region,
                     shuckleInfo: JSON.parse(localStorage.shuckleInfo) };
 
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
                body: JSON.stringify({user: username, pass: pwd}),
            }).then(res => res.json())
               .catch((err) => console.error(err));
        }

        fetchUser().then(function(result) {
            console.log("RESULTS", result[0]);
            props.userHandler(result[0]);
        }).catch(err => {
            console.log("User DNE");
        });
    }

    function saveData()
    {
        let data = { user: localStorage.user,
                     inventory: JSON.parse(localStorage.inventory),
                     pokeDollars: Number(localStorage.pokeDollars),
                     region: localStorage.region,
                     shuckleInfo: JSON.parse(localStorage.shuckleInfo) };
 
        console.log("DATA:",data);

        async function updateUserInfo() {
            const response = await fetch(`http://localhost:3000/saveData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const content = await response.json(); 
            console.log(content);
        }

        console.log(updateUserInfo());
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
