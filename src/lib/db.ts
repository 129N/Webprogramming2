import * as fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

import {argon2id, hash, verify} from "argon2";

const dbpath = "src/lib/userDB.db";

let exist = fs.existsSync(dbpath);


export const db = await open(
    {
        filename:dbpath,
        driver:sqlite3.Database
    }
)

if(!exist) {

    try{
        await db.exec(
            `CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            );
              
            CREATE TABLE sessions (
                id TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                expires_at DATETIME NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );`);

    } catch(err){
        console.log("Table creation failed:", err);
        process.exit(1); // Crash if tables can't be created
    }
}

//Password helper function.
export async function hashPassword(password:string){
    return await hash(password, {type: argon2id});
}

export async function verifyPassword(hash: string, password:string){
    return await verify(hash, password);
}