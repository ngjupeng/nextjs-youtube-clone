import firebase from "./initFirebase";

export const saveUserData = async(user) => {
    const { uid, displayName, email, photoURL } = user;
    const check = await firebase.firestore().collection("users").doc(uid).get();
    if (!check.exists) {
        // not exist
        const info = {
            uid,
            displayName,
            email,
            photoURL,
            likes: [],
            history: [],
            videos: [],
        };
        await firebase.firestore().collection("users").doc(uid).set(info);
        window.location.replace("/");
    } else {
        window.location.replace("/");
    }
};