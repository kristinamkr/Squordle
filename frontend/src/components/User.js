/*
 * User.js
*/

import classes from "./style/User.module.css";

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';


function saveKeyGen() {
    return Math.floor(Math.random() * 1000000000000)
           .toString()
}

function User(props)
{
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState('');

    //An error of 0 exists when there is no error
    //1 on failed sign in (user/password incorrect)
    //2 on failed sign up (user already exists)
    //3 on successful sign up
    //4 on successful save
    //5 on successful log-out
    //6 on failed save
    const [userErr, setUserErr] = useState(0);

    const user = props.user;

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    function signUp() {
        let data = { user: username,
                     pass: pwd,
                     inventory: JSON.parse(localStorage.inventory),
                     pokeDollars: Number(localStorage.pokeDollars),
                     region: localStorage.region,
                     shuckleInfo: JSON.parse(localStorage.shuckleInfo) };

        async function postUser() {
            return await fetch(`http://localhost:3000/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json());
        }

        postUser().then(function(result) {
            if (result) {
                setUserErr(3);
            } else {
                throw 1
            }
        }).catch(err => {
            console.log("User already exists")
            setUserErr(2);
        })
    }

    function signIn() {

        //generate and store save-validating string of pseudorandom characters.
        //protects against people saving over a user's data just by changing localStorage.user and pressing save.
        var saveKey = saveKeyGen();
        window.localStorage.saveKey = saveKey;

        async function fetchUser() {
            return await fetch(`http://localhost:3000/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user: username, pass: pwd, saveKey: saveKey}),
            }).then(res => res.json())
               .catch((err) => console.error(err));
        }

        fetchUser().then(function(result) {
            if (result.length > 0) {
                setUserErr(0);
                props.setToggledGM(true);
                props.userHandler(result[0]);
            } else {
                throw 1;
            }
        }).catch(err => {
            console.log("User DNE");
            setUserErr(1);
        });
    }

    function saveData()
    {
        let data = { user: localStorage.user,
                     inventory: JSON.parse(localStorage.inventory),
                     pokeDollars: Number(localStorage.pokeDollars),
                     region: localStorage.region,
                     shuckleInfo: JSON.parse(localStorage.shuckleInfo),
                     saveKey: localStorage.saveKey };

        async function updateUserInfo() {
            return await fetch(`http://localhost:3000/saveData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
              .catch((err) => console.error(err));
        }

        updateUserInfo().then(function(result) {
            console.log(result);
            if (result) {
                console.log("TEST")
                setUserErr(4);
            } else {
                throw 1;
            }
        }).catch(err => {
            console.log("Save failed.")
            setUserErr(6);
        });
    } 

    function logOut()
    {
        localStorage.user = "guest";
        localStorage.saveKey = "";
        props.userHandler({...props.user, name: localStorage.user, saveKey: localStorage.saveKey});
        setUserErr(5);
    }

	return (
        <> 
            {userErr === 0 && user.name === "guest" && <p>Enter your login information:</p>}
            {userErr === 1 && <p>The username or password is incorrect.</p>}
            {userErr === 2 && <p>This username is already in use.</p>}
            {userErr === 3 && <p>Registered successfully, you can log in.</p>}
            {userErr === 4 && <a style = {{paddingTop: "1em"}}>Save successful.</a>}
            {userErr === 5 && user.name === "guest" && <p>Log-out successful.</p>}
            {userErr === 6 && <p>Save was not successful.</p>}

            {user.name === "guest" &&
            <form className = {classes.loginForm} onSubmit={handleSubmit}>
                <div className = {classes.typingField}>
                    <label> username:</label>
                    <input
                       value = {username} 
                       onChange = {(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className = {classes.typingField}>
                    <label> password:</label>
                    <input
                        value = {pwd}
                        onChange = {(e) => setPwd(e.target.value)}
                    />
                </div>
                <div className = {classes.submitOps}>
                    <input type = "submit"
                           value = "Log In" 
                           onClick = {signIn}
                    />
                    <input type = "submit" 
                           value = "Register"
                           onClick = {signUp}
                    />
                </div>
            </form>}
        {!(user.name === "guest") && 
            <div className = {classes.loginForm}>
                <h2> WELCOME {user.name} ! </h2>
                <form className = {classes.submitOps} onSubmit = {handleSubmit}>
                    <input type = "submit"
                           value = "Save" 
                           onClick = {saveData}
                    />
                    <input type = "submit" 
                           value = "Log Out"
                           onClick = {logOut}
                    />
                </form>
            </div>
        }
    </>
    );
}

export default User;
