import { useState, createContext, useEffect } from "react";

export const ImgurContext = createContext();

function ImgurProvider(props) {
    const [login, setLogin] = useState({});
    const [online, setOnline] = useState(false)
    const [userID, setUserID] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <ImgurContext.Provider value={{login, setLogin, online, setOnline, userID, setUserID, isLoggedIn, setIsLoggedIn}}>{props.children}</ImgurContext.Provider>

}

export default ImgurProvider;