import {DatePicker, Form, FormProps, Input, message, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {postSalary} from "@/app/db/queries/salary";
import {getKaryawan, Karyawan} from "@/app/db/queries/karyawan";
import SalaryDetails from "@/app/components/server_component/salary/salary_card";

export default function AddSalary({
                                      modalOpen,
                                      setModalOpen,
                                      fetchData,
                                  }: {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    fetchData: () => Promise<void>;
}) {
    const [form] = Form.useForm<any>();
    const [messageApi, contextHolder] = message.useMessage();
    const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
    const [baseSalary, setBaseSalary] = useState(0);
    const [mealAllowancePerDay, setMealAllowancePerDay] = useState(0);
    const [totalMealAllowance, setTotalMealAllowance] = useState(0);
    const [grossSalary, setGrossSalary] = useState(0);
    const [deductions, setDeductions] = useState(0);
    const [netSalary, setNetSalary] = useState(0);

    useEffect(() => {
        fetchDataKaryawan();
    }, []);

    const fetchDataKaryawan = async () => {
        try {
            const response = await getKaryawan();
            setKaryawan(response);
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Gagal Mendapatkan Data",
            });
        }
    };

    const handleFormChange = () => {
        const values = form.getFieldsValue();
        const selectedKaryawan = karyawan.find((k) => k.nik === values.karyawanNik);
        const baseSalary = selectedKaryawan?.baseSalary || 0;
        const mealAllowancePerDay = selectedKaryawan?.mealAllowance || 0;
        const totalDaysWorked = values.totalDayWork || 0;
        const totalAlpha = parseInt(values.totalAlpha || 0, 10); // Pastikan ini adalah angka
        const totalSick = parseInt(values.totalSick || 0, 10);  // Pastikan ini juga angka
        const totalBonus = parseInt(String(values.bonusSalary || 0));
        const totalMealAllowance = mealAllowancePerDay * totalDaysWorked;

        const grossSalary = baseSalary + totalMealAllowance + totalBonus;
        const deductions = 100000 * (totalAlpha + totalSick);
        const netSalary = grossSalary - deductions;

        setBaseSalary(baseSalary);
        form.setFieldValue('baseSalary', baseSalary)
        setMealAllowancePerDay(mealAllowancePerDay);
        form.setFieldValue('mealAllowancePerDay', mealAllowancePerDay)
        setTotalMealAllowance(totalMealAllowance);
        setGrossSalary(grossSalary);
        setDeductions(deductions);
        setNetSalary(netSalary);
    };

    const onFinish: FormProps<any>["onFinish"] = async (values) => {
        try {
            const result = await postSalary({
                karyawanNik: values.karyawanNik,
                month: new Date(values.month),
                totalDayWork: parseInt(values.totalDayWork.toString()),
                totalAlpha: parseInt(values.totalAlpha.toString()),
                totalSick: parseInt(values.totalSick.toString()),
                bonusSalary: parseInt(values.bonusSalary.toString()),
                baseSalary: parseInt(values.baseSalary.toString()),
                absenDeduction: deductions,
                mealAllowancePerDay: parseInt(values.mealAllowancePerDay.toString())
            });
            console.log(result)
            if (result) {
                messageApi.open({ type: "success", content: "Berhasil Menambahkan Data" });
            } else {
                messageApi.open({ type: "error", content: "Gagal Menambahkan Data" });
            }
        } catch (e) {
            console.log(e)

            messageApi.open({ type: "error", content: "Gagal Menambahkan Data" });
        } finally {
            await fetchData();
            form.resetFields()
            setModalOpen(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Input Data Salary"
                centered
                width={800}
                open={modalOpen}
                onOk={() => form.submit()}
                onCancel={() => setModalOpen(false)}
            >
                <Form layout="vertical" onFinish={onFinish} form={form} onValuesChange={handleFormChange}>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Karyawan" name="karyawanNik" required>
                            <Select
                                className="w-full"
                                allowClear
                                placeholder="Please select"
                                options={karyawan.map((k) => ({
                                    label: k.name,
                                    value: k.nik,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className="w-full" label="Bulan" name="month" required>
                            <DatePicker className="w-full" picker="month"/>
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Gaji Pokok" name="baseSalary">
                            <Input disabled className="w-full" type="number" min={0} placeholder="Gaji Pokok"/>
                        </Form.Item>
                        <Form.Item className="w-full" label="Uang Makan/Hari" name="mealAllowancePerDay" required>
                            <Input disabled className="w-full" type="number" min={0} placeholder="Uang makan"/>
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Total Bonus" name="bonusSalary">
                            <Input className="w-full" type="number" min={0} placeholder="Input Total Bonus (Optional)"/>
                        </Form.Item>
                        <Form.Item className="w-full" label="Total Hari Kerja" name="totalDayWork" required>
                            <Input className="w-full" type="number" min={0} max={31} placeholder="Input Total Hari Kerja"/>
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Total Hari Alpha" name="totalAlpha" required>
                            <Input className="w-full" type="number" min={0} max={31} placeholder="Input Total Hari Alpha"/>
                        </Form.Item>
                        <Form.Item className="w-full" label="Total Hari Sakit" name="totalSick" required>
                            <Input className="w-full" type="number" min={0} max={31} placeholder="Input Total Hari Sakit"/>
                        </Form.Item>
                    </div>
                    <SalaryDetails baseSalary={baseSalary} mealAllowancePerDay={mealAllowancePerDay} totalMealAllowance={totalMealAllowance} bonusSalary={form.getFieldValue("bonusSalary") || 0} grossSalary={grossSalary} deductions={deductions} netSalary={netSalary}/>
                </Form>
            </Modal>
        </>
    );
}
