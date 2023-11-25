import { useState, memo } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"

import { BsFillEyeFill } from "react-icons/bs";

import "./index.css"


const Login = () => {

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [isError, updateIsError] = useState(false)
    const [errMsg, updateErrMsg] = useState('')
    const [passwordInputEl, changePasswordInputEl] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault()
        const userDetails = {
            username,
            password
        }
        const url = `https://stg.dhunjam.in/account/admin/login`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        }
        const fetchUser = await fetch(url, options)
        console.log(fetchUser)
        const response = await fetchUser.json()
        console.log(response)
        if (!fetchUser.ok) {
            updateIsError(true)
            updateErrMsg(response.ui_err_msg)
        } else {
            const { data } = response
            const { id, token } = data
            Cookies.set('id',id,{expires:10})
            console.log(id, token)
        }
        changeUsername('')
        changePassword('')
    }

    if(Cookies.get('id')){
        return <Navigate to="/"/>
    }
    
    

    return (
        <div className="login-container">
            <h1 className="login-heading">Venue Admin Login</h1>
            <form onSubmit={submitForm}>
                <input type="text" className="username" placeholder="Username" value={username} onChange={(e) => changeUsername(e.target.value)} />
                <div className="password-container">
                    {
                        passwordInputEl ? <input type="text" className="password" placeholder="Password" value={password} onChange={(e) => changePassword(e.target.value)} /> :
                            <input type="password" className="password" placeholder="Password" value={password} onChange={(e) => changePassword(e.target.value)} />
                    }
                    <button type="button" className="eye-icon-button" onClick={() => changePasswordInputEl(!passwordInputEl)}>
                        <BsFillEyeFill className="eye-icon" />
                    </button>
                </div>
                <button type="submit" className="sign-in-button">Sign In</button>
                <p className="new-registration">New Registration ?</p>
                {isError && <p className="submit-error">*{errMsg}</p>}
            </form>
        </div>
    )
}

export default memo(Login)