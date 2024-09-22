'use server'
import * as bcrypt from 'bcrypt';
import {db} from "@/app/db";
import {Role} from "@prisma/client";

export type Karyawan = {
    nik: string
    name: string
    email?: string | null,
    birthDate?: Date | null
    baseSalary: number
    lastEducation?: string | null
    phoneNumber?: string | null
    pict?: string | null
    level?: string | null
    address?: string | null
    startWork?: Date | null
    mealAllowance?: number
    role: Role
    password?: string|null
}
export async function getKaryawan(): Promise<Karyawan[]> {
    // Function to fetch all posts from the database.
    return db.karyawan.findMany({
        select: {
            nik: true,
            name: true,
            email: true,
            baseSalary: true,
            birthDate: true,
            phoneNumber: true,
            lastEducation: true,
            mealAllowance: true,
            pict: true,
            level: true,
            address: true,
            startWork: true,
            role: true,
        },
    });
}

export async function getOneKaryawan(nik: string): Promise<Karyawan|null> {
    // Function to fetch all posts from the database.
    return db.karyawan.findFirst({
        where: {
            nik: nik
        },
        select: {
            nik: true,
            name: true,
            email: true,
            baseSalary: true,
            birthDate: true,
            phoneNumber: true,
            lastEducation: true,
            mealAllowance: true,
            pict: true,
            level: true,
            address: true,
            startWork: true,
            role: true,
        },
    });
}


export async function postKaryawan(karyawan: Karyawan): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        const hashedPass = await bcrypt.hash(karyawan?.password ?? 'default', 10)
        const result = await db.karyawan.create({
            data: {
                ...karyawan,
                baseSalary: parseInt(karyawan.baseSalary.toString()),
                password: hashedPass,
                mealAllowance: parseInt(karyawan.mealAllowance ? karyawan.mealAllowance.toString(): '30000'),
            },
        })
        return !!result;
    } catch (error) {
        console.log("Failed Add Employee : " + error)
        return false
    }
}

export async function updateKaryawan(karyawan: Karyawan): Promise<boolean> {
    try {
        // Initialize updateData with other fields except password
        const updateData: Partial<Karyawan> = {
            ...karyawan,
            baseSalary: parseInt(karyawan.baseSalary.toString()),
            mealAllowance: parseInt(karyawan.mealAllowance ? karyawan.mealAllowance.toString() : '30000'),
        };

        // Only hash and update the password if it's provided
        if (karyawan.password) {
            updateData.password = await bcrypt.hash(karyawan.password, 10);
            const result = await db.karyawan.update({
                where: {
                    nik: karyawan.nik,
                },
                data: {
                    name: karyawan.name,
                    email: karyawan.email,
                    birthDate: karyawan.birthDate,
                    baseSalary: parseInt(karyawan.baseSalary.toString()),
                    lastEducation: karyawan.lastEducation,
                    phoneNumber: karyawan.phoneNumber,
                    mealAllowance: karyawan.mealAllowance,
                    role: karyawan.role,
                    address: karyawan.address,
                    startWork: karyawan.startWork,
                    password: updateData.password,
                },
            });

            return !!result;
        } else {
            const result = await db.karyawan.update({
                where: {
                    nik: karyawan.nik,
                },
                data: {
                    name: karyawan.name,
                    email: karyawan.email,
                    birthDate: karyawan.birthDate,
                    baseSalary: parseInt(karyawan.baseSalary.toString()),
                    lastEducation: karyawan.lastEducation,
                    phoneNumber: karyawan.phoneNumber,
                    mealAllowance: karyawan.mealAllowance,
                    role: karyawan.role,
                    address: karyawan.address,
                    startWork: karyawan.startWork,
                },
            });

            return !!result;
        }
    } catch (error) {
        console.log("Failed to update Employee: " + error);
        return false;
    }
}

export async function deleteKaryawan(nik: string): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        await db.karyawan.delete({
            where: {
                nik: nik
            }
        })
        return true
    } catch {
        return false
    }
}