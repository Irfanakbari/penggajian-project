'use server'
import {db} from "@/app/db";
import {Karyawan} from "@/app/db/queries/karyawan";
import dayjs from "dayjs";

export type Salary = {
    id: number;
    karyawanNik: string;
    month: Date;
    baseSalary: number;
    absenSalary: number;
    bonusSalary: number;
    foodSalary: number;
    pphSalary: number;
    loan: number;
    totalDayWork: number;
    totalOff: number;
    totalSalary: number;
    createdAt: Date;
    generatedBy: string;
    Karyawan?: Karyawan | any; // Assuming Karyawan is another model/type you have defined
};

export type SalaryPost = {
    karyawanNik: string
    totalDayWork: number
    totalOff: number;
    baseSalary: number;
    mealAllowancePerDay: number;
    month: Date;
    bonusSalary: number;
    absenDeduction: number
}
export async function getSalary(nik?: string): Promise<Salary[]> {
    let whereClause;
    if (nik) whereClause = {
        karyawanNik: nik
    }
    return db.salary.findMany({
        where: {
            ...whereClause
        },
        include: {
            Karyawan: true
        }
    });
}


export async function postSalary(salaryData: SalaryPost): Promise<boolean> {
    try {
        const result = await db.$transaction(async (prisma) => {
            // Check if the employee exists
            const userInfo = await prisma.karyawan.findFirst({
                where: {
                    nik: salaryData.karyawanNik,
                },
            });

            if (!userInfo) {
                throw new Error('Karyawan not found');
            }

            // Format month to 'YYYY-MM' for strict comparison
            const formattedMonth = dayjs(salaryData.month).format('YYYY-MM');

            // Define the start and end dates of the month
            const startOfMonth = dayjs(`${formattedMonth}-01`).toDate();
            const endOfMonth = dayjs(startOfMonth).add(1, 'month').toDate();

            // Check if a salary record already exists for the same month and employee
            const existingSalary = await prisma.salary.findFirst({
                where: {
                    karyawanNik: salaryData.karyawanNik,
                    month: {
                        gte: startOfMonth,
                        lt: endOfMonth,
                    },
                },
            });

            if (existingSalary) {
                throw new Error('Salary already exists for this month');
            }

            // Check for existing loan
            const loanUser = await prisma.loan.findFirst({
                where: {
                    karyawanNik: salaryData.karyawanNik,
                    lunas: false,
                },
            });

            // Calculate salary components
            const baseSalary = userInfo.baseSalary ?? 0;
            const totalDayWork = salaryData.totalDayWork || 0;
            const bonusSalary = salaryData.bonusSalary || 0;
            const mealAllowance = salaryData.mealAllowancePerDay || 0;
            const loanDeduction = loanUser ? loanUser.totalLoan / loanUser.monthLoan : 0;

            // Calculate total salary
            const totalSalary = baseSalary + bonusSalary + totalDayWork * userInfo.mealAllowance - loanDeduction;

            // Create new salary record
            const newSalary = await prisma.salary.create({
                data: {
                    month: salaryData.month,
                    bonusSalary,
                    totalOff: salaryData.totalOff,
                    totalDayWork,
                    totalSalary,
                    mealAllowance,
                    absenDeduction: salaryData.absenDeduction,
                    karyawanNik: salaryData.karyawanNik,
                    baseSalary,
                    foodSalary: totalDayWork * mealAllowance,
                    absenSalary: 0,
                    loan: loanDeduction,
                    pphSalary: 0,
                    generatedBy: 'admin',
                },
            });

            // Update loan record if applicable
            if (loanUser) {
                const newRemainingLoan = loanUser.remainingLoan - loanDeduction;
                const isLoanPaidOff = newRemainingLoan <= 0;

                await prisma.loan.update({
                    where: {
                        id: loanUser.id,
                    },
                    data: {
                        remainingLoan: newRemainingLoan,
                        lunas: isLoanPaidOff,
                        updatedAt: new Date(),
                    },
                });
            }

            return newSalary;
        });

        console.log(result);
        return !!result;
    } catch (error) {
        console.log('Failed to add salary: ' + error);
        return false;
    }
}

export async function deleteSalary(id: number): Promise<boolean> {  // Function to fetch all posts from the database.
    try {
        await db.salary.delete({
            where: {
                id: id
            }
        })
        return true
    } catch {
        return false
    }
}