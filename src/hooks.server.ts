import { db } from "$lib/db.js";
import type { Handle } from "@sveltejs/kit";
import * as cookie from "cookie";

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get("cookie") || "");

    if (cookies.session_id) {
        try {
            const session = await db.get(
                `SELECT user_id FROM sessions 
                 WHERE id = ? 
                 AND expires_at > datetime('now', 'localtime')`,
                cookies.session_id
            );

            if (session?.user_id) {
                const user = await db.get(
                    "SELECT id, username FROM users WHERE id = ?",
                    session.user_id
                );
                
                if (user) {
                    event.locals.user = {
                        id: user.id,
                        username: user.username
                    };
                }
            }
        } catch (err) {
            console.error("Session validation error:", err);
        }
    }

    return resolve(event);
};