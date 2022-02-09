// The Profile Page contains information regarding the user, 
// or if not logged in, contains a section allowing the user to login

import Login from "../containers/KeyCloak/Login";
import React from "react";

export default function ProfilePage() {
// let isLoggedIn = useSelector((state: RootState) => state.signIn.isLoggedIn);
// let displayName = useSelector((state: RootState) => state.signIn.displayName);
    return (
        <Login />
    );
}