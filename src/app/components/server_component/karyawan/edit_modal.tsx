import {DatePicker, Form, FormProps, Input, message, Modal, Select, SelectProps} from "antd";
import {Karyawan, updateKaryawan} from "@/app/db/queries/karyawan";
import {useEffect} from "react";
import dayjs from "dayjs";

export default function EditKaryawan({ modalOpen, setModalOpen, fetchData, karyawan }: {
    modalOpen: boolean,
    setModalOpen: any,
    fetchData: () => Promise<void>,
    karyawan?: Karyawan,
}) {
    const options: SelectProps['options'] = [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Operator', value: 'OPERATOR' },
        { label: 'Designer', value: 'DESIGNER' },
        { label: 'Produksi', value: 'PRODUKSI' },
        { label: 'Customer Service', value: 'CS' },
    ];
    const options2: SelectProps['options'] = [
        { label: 'SD', value: 'SD' },
        { label: 'SMP', value: 'SMP' },
        { label: 'SMA', value: 'SMA' },
        { label: 'S1', value: 'S1' },
        { label: 'S2', value: 'S2' },
        { label: 'S3', value: 'S3' },
    ];

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        try {
            // Logging for debugging
            console.log(values);

            const result = await updateKaryawan({
                ...values,
                startWork: values.startWork ? dayjs(values.startWork).toISOString() : null,
                birthDate: values.birthDate ? dayjs(values.birthDate).toISOString() : null,
                baseSalary: parseInt(values.baseSalary, 10),
                mealAllowance: parseInt(values.mealAllowance, 10),
            });

            if (result) {
                messageApi.open({ type: 'success', content: 'Berhasil Memperbarui Data' });
            } else {
                messageApi.open({ type: 'error', content: 'Gagal Memperbarui Data' });
            }
        } catch (error) {
            messageApi.open({ type: 'error', content: 'Gagal Memperbarui Data' });
        } finally {
            await fetchData();
            setModalOpen(false);
        }
    };

    useEffect(() => {
        if (karyawan) {
            // Pre-fill the form if karyawan data is available
            form.setFieldsValue({
                ...karyawan,
                startWork: karyawan.startWork ? dayjs(karyawan.startWork) : null,
                birthDate: karyawan.birthDate ? dayjs(karyawan.birthDate) : null,
            });
        } else {
            // Reset form if no karyawan data is provided
            form.resetFields();
        }
    }, [karyawan, form]);

    return (
        <>
            {contextHolder}
            <Modal
                title="Update Data Karyawan"
                centered
                width={1000}
                open={modalOpen}
                onOk={() => form.submit()}
                onCancel={() => setModalOpen(false)}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item label="NIK" name="nik" rules={[{ required: true, message: 'NIK wajib diisi' }]}>
                        <Input disabled placeholder="Input Nomor Induk Karyawan" />
                    </Form.Item>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Nama wajib diisi' }]}>
                        <Input placeholder="Input Nama" />
                    </Form.Item>

                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Email" name="email">
                            <Input placeholder="Input Email" />
                        </Form.Item>
                        <Form.Item className="w-full" label="Mulai Bekerja" name="startWork">
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Tanggal Lahir" name="birthDate">
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item className="w-full" label="Gaji Pokok" name="baseSalary" rules={[{ required: true, message: 'Gaji Pokok wajib diisi' }]}>
                            <Input type="number" placeholder="Input Gaji Pokok" />
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Pendidikan Terakhir" name="lastEducation">
                            <Select
                                className="w-full"
                                placeholder="Pilih Pendidikan"
                                options={options2}
                            />
                        </Form.Item>
                        <Form.Item className="w-full" label="Nomor Ponsel" name="phoneNumber">
                            <Input type="number" placeholder="Input Nomor Ponsel" />
                        </Form.Item>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Form.Item className="w-full" label="Uang Makan" name="mealAllowance" rules={[{ required: true, message: 'Uang Makan wajib diisi' }]}>
                            <Input type="number" placeholder="Input Uang Makan" />
                        </Form.Item>
                        <Form.Item className="w-full" label="Role Karyawan" name="role">
                            <Select
                                className="w-full"
                                placeholder="Pilih Role"
                                options={options}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item label="Alamat" name="address">
                        <Input.TextArea placeholder="Input Alamat Karyawan" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password placeholder="Input Password (Opsional)" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
