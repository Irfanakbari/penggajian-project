'use client'

import {Breadcrumb, message, Table} from "antd";
import React, {Key, useEffect, useState} from "react";
import {IoMdAdd, IoMdRefresh, IoMdTrash} from "react-icons/io";
import ToolbarWrapper from "@/app/components/ToolbarWrapper";
import ButtonToolbar from "@/app/components/ButtonToolbar";
import dayjs from "dayjs";
import {deleteLoan, getLoan, Loan} from "@/app/db/queries/loan";
import AddPinjaman from "@/app/components/server_component/loan/add_modal";

const MasterPinjaman = () => {
    const [data, setData] = useState<Loan[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<Loan[]>([]);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getLoan()
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
    const deleteData = async (id: number) => {
        try {
            setLoading(true);
            await deleteLoan(id)
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
        onChange: (selectedRowKeys: Key[], selectedRows: Loan[]) => {
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record: Loan) => ({
            kode: record.id,
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
            title: "NIK",
            dataIndex: ["Karyawan", "nik"],
            key: "nik",
        },
        {
            title: "Nama Karyawan",
            dataIndex: ["Karyawan", "name"],
            key: "name",
        },
        {
            title: "Total Pinjaman",
            dataIndex: "totalLoan",
            key: "totalLoan",
            render: (totalLoan: number) => formatRupiah(totalLoan),
        },
        {
            title: "Jumlah Bulan",
            dataIndex: "monthLoan",
            key: "monthLoan",
        },
        {
            title: "Sisa Pinjaman",
            dataIndex: "remainingLoan",
            key: "remainingLoan",
            render: (remainingLoan: number) => formatRupiah(remainingLoan),
        },
        {
            title: "Lunas",
            dataIndex: "lunas",
            key: "lunas",
            render: (lunas: boolean) => (lunas ? "Yes" : "No"),
        },
        {
            title: "Dibuat",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: Date) =>
                dayjs(createdAt).locale("id").format("DD MMMM YYYY"),
        },
        {
            title: "Update Terakhir",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: Date) =>
                dayjs(updatedAt).locale("id").format("DD MMMM YYYY"),
        },
    ];
    return (
        <div>
            {
                contextHolder
            }
            <AddPinjaman modalOpen={modalOpen} setModalOpen={setModalOpen} fetchData={fetchData} />
            <Breadcrumb
                items={[
                    {
                        title: 'Master',
                    },
                    {
                        title: 'Pinjaman',
                    },
                ]}
            />
            <ToolbarWrapper>
                <ButtonToolbar title={'Baru'} icon={<IoMdAdd size={16}/>} onClick={() => setModalOpen(true)}/>
                <ButtonToolbar title={'Refresh'} icon={<IoMdRefresh size={16}/>} onClick={() => fetchData()}/>
                <ButtonToolbar enable={selectedRows.length> 0} title={'Hapus'} icon={<IoMdTrash size={16}/>}
                               onClick={() => deleteData(selectedRows[0].id)}/>
            </ToolbarWrapper>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                scroll={{y: '62vh'}}
                pagination={false}
                loading={loading} size={'small'} dataSource={data} columns={columns} rowKey={'id'} />
        </div>
    );
};

export default MasterPinjaman;