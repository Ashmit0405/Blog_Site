import React from "react";
import {useDispatch} from "react-redux";
import authserv from "../../appwrite/auth.js";
import {logout} from "../../store/authslice.js"

function Logout(){
    const dispatch=useDispatch();
    const logouthandle=()=>{
        authserv.logout().then(()=>{
            dispatch(logout());
        })
    }
    return(
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-500 rounded-full" onClick={logouthandle}>
            LogOut
        </button>
    )
}

export default Logout