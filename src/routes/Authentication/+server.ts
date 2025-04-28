import {db, hashPassword, verifyPassword} from "$lib/db.js";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import {v4 as uuid }from "uuid";

import * as cookie from "cookie";


//Registration 
export const POST: RequestHandler = async ({request} ) => {
    const {username, password} = await request.json();
    console.log("Registration attempt:", { username }); // Log input

    try{
        const password_hash = await hashPassword(password);
        console.log("Generated hash:", password_hash); // Verify hashing works

        const result = await db.run(   
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
           [ username,password_hash]
        );
        console.log("DB insertion result:", result);


        return json({success: true}, {status:201});
    } catch(err){
      
        console.error("Registration error:", err); 
        return json({error : "Registration failed"}, {status: 400} );
    }
};


//login 
export const PUT: RequestHandler = async ( {request}) => {
    const {username, password} = await request.json();

    try{
        const user = await db.get(
            "SELECT id, username, password_hash FROM users WHERE username = ?",
            [username] // FIX 3: Use array parameter binding
        );
    
    if(!user || !(await verifyPassword(user.password_hash, password) ) ) {
        return json({error: "Invalid login"}, {status: 401} );
    }

    const session_ID = uuid();
    const session_expired = new Date(Date.now()  +  1000 * 60 * 60 * 24 * 7); // 1week

    await db.run(
        "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
       [ session_ID, user.id,session_expired.toISOString()]
    );

    return json(
        {user:{id: user.id, username: user.username}},
        {
            headers: {
                "Set-Cookie": cookie.serialize("session_id", session_ID, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    expires: session_expired,
                    secure: process.env.NODE_ENV === "production"
                })
            }
        }
    );}
    catch(err){
        console.error("Login error:", err);
        return json({ error: "Login failed" }, { status: 500 });
    }
};


export const DELETE: RequestHandler = async ( {request}) => {
    const cookies = cookie.parse(request.headers.get("cookie") || "" );
  try{ { if(cookies.session_ID){
        await db.run(
            "DELETE FROM sessions WHERE id = ?", 
           [ cookies.session_id]
        );
    }}

    return json(
        {success: true }, 
        {headers: {
            "Set-Cookie": cookie.serialize("session_id", "", {
                path: "/",
                expires: new Date(0)
        })
    }
}
    );} catch(err){
        console.error("Logout error:", err);
        return json({ error: "Logout failed" }, { status: 500 });
    }
}