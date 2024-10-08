'use client'

import {Breadcrumb, message, Modal, Table} from "antd";
import React, {Key, useEffect, useRef, useState} from "react";
import {IoMdAdd, IoMdRefresh, IoMdTrash} from "react-icons/io";
import ToolbarWrapper from "@/app/components/ToolbarWrapper";
import ButtonToolbar from "@/app/components/ButtonToolbar";
import dayjs from "dayjs";
import {deleteSalary, getSalary, Salary} from "@/app/db/queries/salary";
import AddSalary from "@/app/components/server_component/salary/add_modal";
import {SiMicrosoftexcel} from "react-icons/si";
import generatePDF, {Margin} from "react-to-pdf";
import {PiFilePdfDuotone} from "react-icons/pi";
import SalaryExport from "@/app/components/client_component/export/salary_export";

const MasterSalary = () => {
    const [data, setData] = useState<Salary[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<Salary[]>([]);
    const targetRef = useRef(null);
    const targetRef2 = useRef(null);
    const [modal2Open, setModal2Open] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getSalary();
            setData(response);
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Gagal Mendapatkan Data",
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (id: number) => {
        try {
            setLoading(true);
            await deleteSalary(id);
            messageApi.open({
                type: "success",
                content: "Berhasil Menghapus Data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Gagal Menghapus Data",
            });
        } finally {
            fetchData();
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys: Key[], selectedRows: Salary[]) => {
            setSelectedRows(selectedRows);
        },
        getCheckboxProps: (record: Salary) => ({
            kode: record.id,
            disabled: false,
        }),
    };

    const columns : any= [
        {
            title: "NIK",
            dataIndex: "karyawanNik",
            key: "nik",
        },
        {
            title: "Bulan",
            dataIndex: "month",
            key: "month",
            render: (date: any) => dayjs(date).format("MMM YYYY"),
        },
        {
            title: "Gaji Pokok",
            dataIndex: "baseSalary",
            key: "baseSalary",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
        {
            title: "Potongan Absen",
            dataIndex: "absenDeduction",
            key: "absenDeduction",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
        {
            title: "Bonus",
            dataIndex: "bonusSalary",
            key: "bonusSalary",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
        {
            title: "Uang Makan",
            dataIndex: "foodSalary",
            key: "foodSalary",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
        {
            title: "Potongan Pinjaman",
            dataIndex: "loan",
            key: "loan",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
        {
            title: "Total Hari Kerja",
            dataIndex: "totalDayWork",
            key: "totalDayWork",
            render: (value: any) => `${value.toLocaleString()} Hari`,
        },
        {
            title: "Total Tidak Hadir",
            key: "absenTotal",
            // dataIndex: "totalSick",
            render: (value: any) => `${(value.totalOff).toLocaleString()} Hari`,
        },
        {
            title: "Total Gaji Bersih",
            dataIndex: "totalSalary",
            key: "totalSalary",
            render: (value: any) => `Rp ${value.toLocaleString()}`,
        },
    ];

    return (
        <div>
            <Modal
                title="Print Preview"
                centered
                width={1200}
                open={modal2Open}
                onOk={() => generatePDF(targetRef2, { filename: 'page.pdf' ,page:{
                        margin: Margin.NONE,
                        orientation:'portrait'
                    }})}
                onCancel={() => setModal2Open(false)}
            >
                <SalaryExport ref={targetRef2} datas={data}/>
            </Modal>
            {contextHolder}
            <AddSalary modalOpen={modalOpen} setModalOpen={setModalOpen} fetchData={fetchData} />
            <Breadcrumb
                items={[
                    {
                        title: "Master",
                    },
                    {
                        title: "Penggajian",
                    },
                ]}
            />
            <ToolbarWrapper>
                <ButtonToolbar title={"Baru"} icon={<IoMdAdd size={16} />} onClick={() => setModalOpen(true)} />
                <ButtonToolbar title={"Refresh"} icon={<IoMdRefresh size={16} />} onClick={() => fetchData()} />
                <ButtonToolbar
                    enable={selectedRows.length > 0}
                    title={"Hapus"}
                    icon={<IoMdTrash size={16} />}
                    onClick={() => deleteData(selectedRows[0].id)}
                />
                <ButtonToolbar
                    title={"Print PDF"}
                    icon={<PiFilePdfDuotone size={16} />}
                    onClick={() => setModal2Open(true)}
                />
                <ButtonToolbar
                    title={"Export"}
                    icon={<SiMicrosoftexcel size={16} />}
                    onClick={() => generatePDF(targetRef, {filename: 'page2.pdf', page:{
                        margin: Margin.NONE,
                            orientation:'portrait'
                        }})
                }
                />
            </ToolbarWrapper>
              <div
                  ref={targetRef}
              >
                  <Table
                      rowSelection={{
                          type: "radio",
                          ...rowSelection,
                      }}
                      scroll={{ y: "62vh" }}
                      pagination={false}
                      loading={loading}
                      size={"small"}
                      dataSource={data}
                      columns={columns}
                      rowKey={"id"}
                  />
              </div>
        </div>
    );
};

export default MasterSalary;
