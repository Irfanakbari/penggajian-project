import {Card, Divider} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {formatRupiah} from "@/app/utils"; // Import icons for visual enhancement

// Add this component to the section where salary details are displayed
const SalaryDetails = ({
                           baseSalary,
                           mealAllowancePerDay,
                           totalMealAllowance,
                           bonusSalary,
                           grossSalary,
                           deductions,
                           netSalary,
                       }: {
    baseSalary: number;
    mealAllowancePerDay: number;
    totalMealAllowance: number;
    bonusSalary: number;
    grossSalary: number;
    deductions: number;
    netSalary: number;
}) => (
    <Card title="Detail Perhitungan Gaji" bordered={true} style={{ marginTop: 20 }}>
        <ul style={{ padding: 0, listStyle: "none" }}>
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Base Salary:</span>
                <span>{formatRupiah(baseSalary)}</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Uang Makan Per Hari:</span>
                <span>{formatRupiah(mealAllowancePerDay)}</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Total Uang Makan:</span>
                <span>{formatRupiah(totalMealAllowance)}</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <PlusCircleOutlined style={{ marginRight: 8 }} />
                <span>Bonus:</span>
                <span>{formatRupiah(bonusSalary)}</span>
            </li>
            <Divider style={{ margin: "10px 0" }} />
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Total Gaji Kotor:</span>
                <span>{formatRupiah(grossSalary)}</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <MinusCircleOutlined style={{ marginRight: 8 }} />
                <span>Total Potongan (Alpha):</span>
                <span>{formatRupiah(deductions)}</span>
            </li>
            <Divider style={{ margin: "10px 0" }} />
            <li style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>Total Gaji Bersih:</span>
                <span style={{ color: "#52c41a" }}>{formatRupiah(netSalary)}</span>
            </li>
        </ul>
    </Card>
);

export default SalaryDetails;
