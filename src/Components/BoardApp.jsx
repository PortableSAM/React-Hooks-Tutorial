import React, { useState, useEffect } from "react";
import Firebase from "../Firebase/Firebase";

function BoardApp() {
    const [post, setPost] = useState([]);
    console.log(post)

    return (
        <div>
            <h2>This is BoardApp</h2>
        </div>
    );
}

export default BoardApp;
