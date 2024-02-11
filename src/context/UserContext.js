import React, { createContext, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { isExpired, decodeToken } from "react-jwt";

export const UserContext = createContext();

export default ({ children }) => {
    const [userToken, setUserToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [dreamObject, setDreamObject] = useState("")
    const [dreamLocation, setDreamLocation] = useState("")
    const [dreamAction, setDreamAction] = useState("")
    const [dreamMode, setDreamMode] = useState("")
    const [aspectRatio, setAspectRatio] = useState("")
    const [generatedPrompt, setGeneratedPrompt] = useState("")
    const [artStyle, setArtStyle] = useState("")

    const [generatingImage, setGeneratingImage] = useState(false)

    const [selectedImage, setSelectedImage] = useState("")



    // const { stateUser } = useSelector((state) => ({
    //     user: state.auth.user,
    // }));
    // const user = localStorage.getItem("deonicode-user");
    // //
    // const { discount } = useSelector((state) => ({
    //     discount: state.discount.discount,
    // }));
    // const localDiscount = JSON.parse(
    //     localStorage.getItem("deonicode-discount-token")
    // );
    // const discountToken = localDiscount?.token;

    // useEffect(() => {
    //     if (stateUser || user) {
    //         const decodedToken = decodeToken(stateUser || user);
    //         if (decodedToken != null) {
    //             setUserId(decodedToken.id);
    //             setUsername(decodedToken.username);
    //             setUseremail(decodedToken.email);
    //             setAuthenticated(true);
    //         }
    //     }
    // }, [user]);

    // useEffect(() => {
    //     if (discount || discountToken) {
    //         const decodedToken = decodeToken(discountToken || discount?.token);
    //         const isMyTokenExpired = isExpired(discountToken || discount?.token);
    //         setExpiredToken(isMyTokenExpired);
    //         if (!isMyTokenExpired) {
    //             setDiscountId(localDiscount?._id);
    //             setDiscountAmount(decodedToken.amount);
    //             setExpiryDate(new Date(decodedToken.expiryDate));
    //         }
    //     }
    // }, [discount, discountToken]);

    return (
        <UserContext.Provider
            value={{
                userToken,
                authenticated,

                setUserToken,
                setAuthenticated,

                dreamObject,
                dreamLocation,
                dreamAction,
                dreamMode,
                aspectRatio,
                generatedPrompt,
                artStyle,

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
                setSelectedImage
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
