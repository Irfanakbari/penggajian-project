import {DatePicker, Form, FormProps, Input, message, Modal, Select, SelectProps} from "antd";
import {postKaryawan} from "@/app/db/queries/karyawan";

export default function AddKaryawan({modalOpen, setModalOpen, fetchData}: {
    modalOpen: boolean,
    setModalOpen: any,
    fetchData: () => Promise<void>
}) {
    const options: SelectProps['options'] = [
        {
            label: 'Admin',
            value: 'ADMIN',
        },
        {
            label: 'Operator',
            value: 'OPERATOR',
        },
        {
            label: 'Designer',
            value: 'DESIGNER',
        },
        {
            label: 'Produksi',
            value: 'PRODUKSI',
        },
        {
            label: 'Customer Service',
            value: 'CS',
        },
    ];
    const options2: SelectProps['options'] = [
        {
            label: 'SD',
            value: 'SD',
        },
        {
            label: 'SMP',
            value: 'SMP',
        },
        {
            label: 'SMA',
            value: 'SMA',
        },
        {
            label: 'S1',
            value: 'S1',
        },
        {
            label: 'S2',
            value: 'S2',
        },
        {
            label: 'S3',
            value: 'S3',
        },
    ];
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        try {
            console.log(values)
            const result = await postKaryawan({
                ...values,
            })
            if (result) messageApi.open({
                type: 'success',
                content: 'Berhasil Menambahkan Data',
            });
            else messageApi.open({
                type: 'error',
                content: 'Gagal Menambahkan Data',
            });
        } catch {
            messageApi.open({
                type: 'error',
                content: 'Gagal Menambahkan Data',
            });
        } finally {
            await fetchData()
            setModalOpen(false);
        }
    };

    return (
        <>
        {
            contextHolder
        }
        <Modal
            title="Input Data Karyawan"
            centered
            width={1000}
            open={modalOpen}
            onOk={() => form.submit()}
            onCancel={() => setModalOpen(false)}
        >
            <Form
                layout={'vertical'}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item label="NIK" name={'nik'}>
                    <Input placeholder="Input Nomor Induk Karyawan"/>
                </Form.Item>
                <Form.Item label="Name" name={'name'}>
                    <Input placeholder="Input Nama"/>
                </Form.Item>

                <div className={`flex flex-row gap-4`}>
                    <Form.Item className={`w-full`} label="Email" name={'email'}>
                        <Input className={`w-full`} placeholder="Input Email"/>
                    </Form.Item>
                    <Form.Item className={`w-full`} label="Start Work" name={'startWork'}>
                        <DatePicker className={`w-full`}/>
                    </Form.Item>
                </div>
                <div className={`flex flex-row gap-4`}>
                    <Form.Item className={`w-full`} label="Birth Date" name={'birthDate'}>
                        <DatePicker className={`w-full`}/>
                    </Form.Item>
                    <Form.Item className={`w-full`} label="Base Salary" name={'baseSalary'}>
                        <Input className={`w-full`} type={'number'} min={0} placeholder="Input Base Salary"/>
                    </Form.Item>
                </div>
                <div className={`flex flex-row gap-4`}>
                    <Form.Item className={`w-full`} label="Pendidikan Terakhir" name={'lastEducation'}>
                        <Select
                            className={`w-full`}
                            allowClear
                            // style={{ width: '100%' }}
                            placeholder="Please select"
                            options={options2}
                        />
                    </Form.Item>
                    <Form.Item className={`w-full`} label="Phone Number" name={'phoneNumber'}>
                        <Input className={`w-full`} type={'number'} min={0} placeholder="Input Phone Number"/>
                    </Form.Item>
                </div>
                <div className={`flex flex-row gap-4`}>
                    <Form.Item className={`w-full`} label="Level Karyawan" name={'level'}>
                        <Input className={`w-full`} placeholder="Input Level Karyawan"/>
                    </Form.Item>
                    <Form.Item className={`w-full`} label="Role Karyawan" name={'role'}>
                        <Select
                            className={`w-full`}
                            allowClear
                            // style={{ width: '100%' }}
                            placeholder="Please select"
                            options={options}
                        />
                    </Form.Item>
                </div>
                <Form.Item label="Alamat" name={'address'}>
                    <Input.TextArea placeholder="Input Alamat Karyawan"/>
                </Form.Item>
                <Form.Item label="Password" name={'password'}>
                    <Input.Password placeholder="Input Password"/>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}