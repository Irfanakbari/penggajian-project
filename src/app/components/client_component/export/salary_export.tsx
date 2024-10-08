import React, {forwardRef} from "react";
import {Table} from "antd";
import dayjs from "dayjs";
import {Salary} from "@/app/db/queries/salary";

const currentDate = dayjs(); // Ambil tanggal dan waktu saat ini
const formattedDate = currentDate.format('DD MMMM YYYY HH:mm [WIB]');

const SalaryExport = forwardRef<HTMLDivElement, { datas: Salary[] }>((props, ref) => {
    const columns: any = [
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
        <div ref={ref} className={`w-full p-3 gap-3 text-sm mb-2 flex-grow`}>
            <div className={`text-black text-sm`}>
                <div className="w-full flex flex-col">
                    <div className={`flex  justify-center items-center w-full mb-3`}>
                        <img className={'w-1/2 text-center'} src={'/images/img.png'} alt={'Logo'} width={100} height={70} />
                    </div>
                    <Table
                        bordered
                        style={{
                            width: "100%",
                        }}
                        rowKey={'id'}
                        columns={columns}
                        components={{
                            body: {
                                cell: (props: any) => {
                                    return <td {...props} style={{padding: '4px 8px'}} />;
                                },
                            },
                        }}
                        rowClassName={'text-[12px]'}
                        dataSource={props.datas}
                        pagination={false}
                        size={'small'} />

                    {/* Bagian TTD */}
                    <div className="mt-6 flex justify-between w-full">
                        <div className="text-center">
                            <p>Disetujui oleh:</p>
                            <div className="h-16"></div> {/* Ruang untuk tanda tangan */}
                            <p>______________________</p>
                            <p>Manajer</p>
                        </div>
                        <div className="text-center">
                            <p>Diperiksa oleh:</p>
                            <div className="h-16"></div> {/* Ruang untuk tanda tangan */}
                            <p>______________________</p>
                            <p>HRD</p>
                        </div>
                    </div>

                    {/* Tanggal */}
                    {/*<div className="text-right mt-4">*/}
                    {/*    <p>{formattedDate}</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
});

SalaryExport.displayName = "SalaryExport";

export default SalaryExport;
