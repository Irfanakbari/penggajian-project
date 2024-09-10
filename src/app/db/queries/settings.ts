'use server'
import {db} from "@/app/db";
import {Setting} from "@prisma/client";

export async function getSetting(): Promise<Setting | null> {  // Function to fetch all posts from the database.
    return db.setting.findFirst({
        where: {
            id: 1
        }
    })
}
