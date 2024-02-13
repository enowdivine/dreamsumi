import React, { createContext, useState, useEffect } from "react";
import { decodeToken } from "react-jwt";

export const UserContext = createContext();

export default ({ children }) => {
    const [userId, setUserId] = useState("");
    const [userToken, setUserToken] = useState("");
    const [userCredit, setUserCredit] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [dream, setDream] = useState("")
    const [dreamObject, setDreamObject] = useState("")
    const [dreamLocation, setDreamLocation] = useState("")
    const [dreamAction, setDreamAction] = useState("")
    const [dreamMode, setDreamMode] = useState("")
    const [aspectRatio, setAspectRatio] = useState("")
    const [generatedPrompt, setGeneratedPrompt] = useState("")
    const [artStyle, setArtStyle] = useState("")

    const [generatingImage, setGeneratingImage] = useState(false)

    const [selectedImage, setSelectedImage] = useState("")

    const token = localStorage.getItem("dreamsumiai-user");
    const credit = localStorage.getItem("dreamsumiai-usercredit")

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            setUserId(decodedToken?.id);
            setUserToken(JSON.parse(token))
            setUserCredit(credit)
            setUserEmail(decodedToken?.email)
            setAuthenticated(true);
        }
    }, [token, credit]);

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,

                userEmail,
                setUserEmail,

                userToken,
                authenticated,

                setUserToken,
                setAuthenticated,

                dream,
                dreamObject,
                dreamLocation,
                dreamAction,
                dreamMode,
                aspectRatio,
                generatedPrompt,
                artStyle,

                setDream,
                setDreamObject,
                setDreamLocation,
                setDreamAction,
                setDreamMode,
                setAspectRatio,
                setGeneratedPrompt,
                setArtStyle,

                generatingImage,
                setGeneratingImage,

                selectedImage,
                setSelectedImage,

                userCredit,
                setUserCredit
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
