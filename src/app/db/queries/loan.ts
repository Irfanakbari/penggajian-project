'use server'
import {db} from "@/app/db";
import {Karyawan} from "@/app/db/queries/karyawan";

export type Loan = {
    id: number;
    Karyawan?: Karyawan | any; // Assuming Karyawan is another model/type you have defined
    karyawanNik: string;
    totalLoan: number;
    monthLoan: number;
    remainingLoan: number;
    lunas: boolean;
    createdAt: Date;
    updatedAt: Date;
};
export async function getLoan(): Promise<Loan[]> {
    return db.loan.findMany({
        include: {
            Karyawan: true
        }
    });
}


export async function postLoan(loan: Loan): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        const result = await db.loan.create({
            data: {
                ...loan,
                totalLoan: parseInt(loan.totalLoan.toString()),
                monthLoan: parseInt(loan.monthLoan.toString()),
                remainingLoan: parseInt(loan.totalLoan.toString()),
                lunas: false,
            },
        })
        return !!result;
    } catch (error) {
        console.log("Failed Add Employee : " + error)
        return false
    }
}

export async function deleteLoan(id: number): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        await db.loan.delete({
            where: {
                id: id
            }
        })
        return true
    } catch {
        return false
    }
}