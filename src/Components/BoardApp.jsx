import React, { useState, useEffect } from "react";
import fire_Config from "../Firebase/Firebase";

const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");
//Initalize Firebase
firebase.initializeApp(fire_Config)


function BoardApp() {
    const [post, setPost] = useState([]);
    console.log(post)
    useEffect(() => {
        firebase.firestore().collection('Boards').onSnapshot((querySnapshot) => {
            const newPost = []
            querySnapshot.forEach((doc) => {
                newPost.push({
                    key: doc.id,
                    ...doc.data()
                })
                console.log(newPost)
                setPost(newPost)
            })
        })
    }, [])



    return (
        <section>
            <div>
                <h2>This is BoardApp</h2>
            </div>
        </section>
    )
}
export default BoardApp;
