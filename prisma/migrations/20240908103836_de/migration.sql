-- CreateTable
CREATE TABLE `Karyawan` (
    `nik` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `birthDate` DATETIME(3) NULL,
    `baseSalary` INTEGER NOT NULL DEFAULT 0,
    `lastEducation` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `pict` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `startWork` DATETIME(3) NULL,
    `role` ENUM('DESIGNER', 'OPERATOR', 'ADMIN', 'PRODUKSI', 'CS') NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mealAllowance` INTEGER NOT NULL DEFAULT 30000,

    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `karyawanNik` VARCHAR(191) NOT NULL,
    `month` DATE NOT NULL,
    `baseSalary` INTEGER NOT NULL,
    `absenSalary` INTEGER NOT NULL,
    `bonusSalary` INTEGER NOT NULL,
    `foodSalary` INTEGER NOT NULL,
    `pphSalary` INTEGER NOT NULL DEFAULT 0,
    `loan` INTEGER NOT NULL DEFAULT 0,
    `totalDayWork` INTEGER NOT NULL,
    `totalAlpha` INTEGER NOT NULL,
    `totalSick` INTEGER NOT NULL,
    `totalSalary` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `generatedBy` VARCHAR(191) NOT NULL,
    `mealAllowance` INTEGER NOT NULL DEFAULT 30000,
    `absenDeduction` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `karyawanNik` VARCHAR(191) NOT NULL,
    `totalLoan` INTEGER NOT NULL DEFAULT 0,
    `monthLoan` INTEGER NOT NULL DEFAULT 0,
    `remainingLoan` INTEGER NOT NULL DEFAULT 0,
    `lunas` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Loan_karyawanNik_fkey`(`karyawanNik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `companyLogo` VARCHAR(191) NULL,
    `companyAddress` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_karyawanNik_fkey` FOREIGN KEY (`karyawanNik`) REFERENCES `Karyawan`(`nik`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_karyawanNik_fkey` FOREIGN KEY (`karyawanNik`) REFERENCES `Karyawan`(`nik`) ON DELETE RESTRICT ON UPDATE CASCADE;
