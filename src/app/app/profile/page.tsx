'use client';

import {Breadcrumb, DatePicker, Form, Input, message,} from 'antd';
import React, {useEffect, useState} from 'react';
import AddSalary from '@/app/components/server_component/salary/add_modal';
import {useAuth} from '@/app/contexts/AuthContext';
import {getOneKaryawan, Karyawan} from '@/app/db/queries/karyawan';
import dayjs from "dayjs";
import {formatRupiah} from "@/app/utils";

const ProfilePage = () => {
    const [data, setData] = useState<Karyawan | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const { nik } = useAuth();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        if (nik) {
            fetchData();
        }
    }, [nik]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getOneKaryawan(nik ?? '');
            if (response) {
                setData(response);
                form.setFieldsValue({
                    nik: response.nik,
                    name: response.name,
                    email: response.email || '-',
                    birthDate: response.birthDate ? dayjs(response.birthDate) : null,
                    startWork: response.startWork ? dayjs(response.startWork) : null,
                    phoneNumber: response.phoneNumber || '-',
                    address: response.address || '-',
                    baseSalary: formatRupiah(response.baseSalary) || '-',
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Gagal Mendapatkan Data',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <AddSalary modalOpen={modalOpen} setModalOpen={setModalOpen} fetchData={fetchData} />
            <Breadcrumb
                items={[
                    {
                        title: 'Master',
                    },
                    {
                        title: 'Profile',
                    },
                ]}
            />
            <br />
            <Form form={form} layout="vertical">
                <Form.Item label="NIK" name="nik">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Name" name="name">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Birth Date" name="birthDate">
                    <DatePicker disabled />
                </Form.Item>

                <Form.Item label="Start Work" name="startWork">
                    <DatePicker disabled />
                </Form.Item>

                <Form.Item label="Phone Number" name="phoneNumber">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Address" name="address">
                    <Input.TextArea disabled />
                </Form.Item>
                <Form.Item label="Base Salary" name="baseSalary">
                    <Input disabled />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfilePage;
