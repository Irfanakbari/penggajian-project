import {Form, FormProps, Input, message, Modal} from "antd";
import {useEffect, useState} from "react";
import {Loan, postLoan} from "@/app/db/queries/loan";

// Function to format numbers to Rupiah currency
const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

export default function AddPinjaman({
                                        modalOpen,
                                        setModalOpen,
                                        fetchData,
                                    }: {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    fetchData: () => Promise<void>;
}) {
    const [form] = Form.useForm<Loan>();
    const [messageApi, contextHolder] = message.useMessage();
    const [monthlyDeduction, setMonthlyDeduction] = useState<number | null>(null);

    // Calculate the monthly deduction whenever totalLoan or monthLoan changes
    const calculateMonthlyDeduction = () => {
        const totalLoan = form.getFieldValue("totalLoan");
        const monthLoan = form.getFieldValue("monthLoan");
        if (totalLoan && monthLoan) {
            setMonthlyDeduction(totalLoan / monthLoan);
        } else {
            setMonthlyDeduction(null);
        }
    };

    useEffect(() => {
        calculateMonthlyDeduction();
    }, [form.getFieldValue("totalLoan"), form.getFieldValue("monthLoan")]);

    const onFinish: FormProps<Loan>["onFinish"] = async (values) => {
        try {
            const result = await postLoan(values);
            if (result) {
                messageApi.open({ type: "success", content: "Berhasil Menambahkan Data" });
            } else {
                messageApi.open({ type: "error", content: "Gagal Menambahkan Data" });
            }
        } catch {
            messageApi.open({ type: "error", content: "Gagal Menambahkan Data" });
        } finally {
            await fetchData();
            setModalOpen(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Input Data Pinjaman"
                centered
                width={800}
                open={modalOpen}
                onOk={() => form.submit()}
                onCancel={() => setModalOpen(false)}
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        label="NIK Karyawan"
                        name="karyawanNik"
                        rules={[{ required: true, message: "Please input Karyawan NIK!" }]}
                    >
                        <Input placeholder="Input Nomor Induk Karyawan" />
                    </Form.Item>

                    <Form.Item
                        label="Total Loan"
                        name="totalLoan"
                        rules={[{ required: true, message: "Please input total loan amount!" }]}
                    >
                        <Input
                            type="number"
                            min={0}
                            placeholder="Input Total Loan"
                            onChange={calculateMonthlyDeduction}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Month Loan"
                        name="monthLoan"
                        rules={[{ required: true, message: "Please input month loan duration!" }]}
                    >
                        <Input
                            type="number"
                            min={1}
                            placeholder="Input Month Loan"
                            onChange={calculateMonthlyDeduction}
                        />
                    </Form.Item>

                    <span>
            Total Pinjaman Anda Sebesar: <b>{formatRupiah(form.getFieldValue("totalLoan") || 0)}</b>,
            Dengan Durasi: <b>{form.getFieldValue("monthLoan") || 0} Bulan</b>, Maka Potongan Bulanan Anda Sebesar :
                        <b> {monthlyDeduction ? formatRupiah(monthlyDeduction) : "0"}/Bulan</b>
          </span>
                </Form>
            </Modal>
        </>
    );
}
