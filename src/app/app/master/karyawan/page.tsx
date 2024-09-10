'use client'

import {Breadcrumb, message, Table} from "antd";
import React, {Key, useEffect, useState} from "react";
import {IoMdAdd, IoMdRefresh, IoMdTrash} from "react-icons/io";
import ToolbarWrapper from "@/app/components/ToolbarWrapper";
import ButtonToolbar from "@/app/components/ButtonToolbar";
import AddKaryawan from "@/app/components/server_component/karyawan/add_modal";
import {deleteKaryawan, getKaryawan, Karyawan} from "@/app/db/queries/karyawan";
import dayjs from "dayjs";

const MasterKaryawan = () => {
    const [data, setData] = useState<Karyawan[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<Karyawan[]>([]);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getKaryawan()
            setData(response)
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Gagal Mendapatkan Data',
            });
        } finally {
            setLoading(false)
        }
    }
    const deleteData = async (id: string) => {
        try {
            setLoading(true);
            await deleteKaryawan(id)
            messageApi.open({
                type: 'success',
                content: 'Berhasil Menghapus Data',
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Gagal Menghapus Data',
            });
        } finally {
            fetchData()
        }
    }
    const rowSelection = {
        onChange: (selectedRowKeys: Key[], selectedRows: Karyawan[]) => {
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record: Karyawan) => ({
            kode: record.nik,
            disabled: false
        }),
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const columns = [
        {
            title: 'NIK',
            dataIndex: 'nik',
            key: 'nik',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birthDate',
            render: (_: any, record: Karyawan) => record.birthDate
                ? dayjs(record.birthDate).locale('id').format('DD MMMM YYYY')
                : '-'
        },
        {
            title: 'Base Salary',
            dataIndex: 'baseSalary',
            key: 'baseSalary',
            render: (baseSalary: number) => formatRupiah(baseSalary),
        },
        {
            title: 'Meal Allowance',
            dataIndex: 'mealAllowance',
            key: 'mealAllowance',
            render: (mealAllowance: number) => formatRupiah(mealAllowance),
        },
        {
            title: 'Last Education',
            dataIndex: 'lastEducation',
            key: 'lastEducation',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Level Jabatan',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Alamat',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Start Work',
            dataIndex: 'startWork',
            key: 'startWork',
            render: (_: any, record: Karyawan) => record.startWork
                ? dayjs(record.startWork).locale('id').format('DD MMMM YYYY')
                : '-'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ]
    return (
        <div>
            {
                contextHolder
            }
            <AddKaryawan modalOpen={modalOpen} setModalOpen={setModalOpen} fetchData={fetchData} />
            <Breadcrumb
                items={[
                    {
                        title: 'Master',
                    },
                    {
                        title: 'Karyawan',
                    },
                ]}
            />
            <ToolbarWrapper>
                <ButtonToolbar title={'New'} icon={<IoMdAdd size={16}/>} onClick={() => setModalOpen(true)}/>
                <ButtonToolbar title={'Refresh'} icon={<IoMdRefresh size={16}/>} onClick={() => fetchData()}/>
                <ButtonToolbar enable={selectedRows.length> 0} title={'Delete'} icon={<IoMdTrash size={16}/>}
                               onClick={() => deleteData(selectedRows[0].nik)}/>
            </ToolbarWrapper>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                scroll={{y: '62vh'}}
                pagination={false}
                loading={loading} size={'small'} dataSource={data} columns={columns} rowKey={'nik'} />
        </div>
    );
};

export default MasterKaryawan;