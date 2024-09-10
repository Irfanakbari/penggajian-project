'use server'
import * as bcrypt from 'bcrypt';
import {db} from "@/app/db";
import {Role} from "@prisma/client";
import {setCookie} from "cookies-next";
import {cookies} from "next/headers";
import * as jwt from 'jsonwebtoken'

export async function login(username: string, password: string): Promise<boolean> {  // Function to fetch all posts from the database.
    if (!username && !password) return false;
    const user = await db.karyawan.findFirst({
        where: {
            nik: username,
        },
    });
    if (!user) return false
    const isMatch = await bcrypt.compare(
        password,
        user.password,
    );
    if (!isMatch) return false
    const token = jwt.sign({
        nik: user.nik,
        role: user.role,
        name: user.name,
        email: user.email
    }, 'nosystemissafe');
    setCookie('access-token', token, {
        cookies,
    });
    return true
}

export async function register(username: string, password: string, name: string, role: Role): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        const hashedPass = await bcrypt.hash(password, 10)
        await db.karyawan.create({
            data: {
                nik: username,
                password: hashedPass,
                name: name,
                role: role
            }
        })
        return true
    } catch {
        return false
    }
}