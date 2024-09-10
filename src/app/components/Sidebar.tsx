'use client'
import React, {useEffect, useState} from "react";
import {Button, Layout, Menu, theme} from "antd";
import Image from "next/image";
import {DashboardFilled, DropboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {Footer} from "antd/es/layout/layout";
import {PiSignOutDuotone} from "react-icons/pi";
import menulist from "@/app/constant/menu_list";
import {useAuth} from "@/app/contexts/AuthContext";
import Loading from "@/app/app/loading";

const { Header, Sider, Content } = Layout;

export default function SideBarSC({
                                      children,
                                      title
                                  }: {
    children: React.ReactNode,
    title?: string
}) {
    const { roles,name, nik} = useAuth();

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const showLoader = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    useEffect(()=>{
        showLoader()
    },[])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const clickMenu = (item: any) => {
        const url = menulist[item.key];
        if (url) {
            router.push(url);
        }
    }
    const generateMenuItems = () => {
        const items: any = [];
        if (roles.includes('ADMIN')) {
            items.push({
                key: '1',
                label: 'Dashboard',
                icon: <DashboardFilled />,
            })
        }
        if (roles.includes('ADMIN')) {
            items.push({
                key: '2',
                label: 'Data Karyawan',
                icon: <DropboxOutlined />,
            });
            items.push({
                key: '3',
                label: 'Data Pinjaman',
                icon: <DropboxOutlined />,
            });
            items.push({
                key: '4',
                label: 'Data Penggajian',
                icon: <DropboxOutlined />,
            });
            items.push({
                key: '5',
                label: 'Pengaturan',
                icon: <DropboxOutlined />,
            });
        }
        if(!roles.includes('ADMIN')){
            items.push({
                key: '6',
                label: 'Profile',
                icon: <DropboxOutlined />,
            });
            items.push({
                key: '7',
                label: 'Salary Report',
                icon: <DashboardFilled />,
            })
        }
        return items;
    };
    return (
        <>
            {
                loading ? <Loading/> : <>
                    <Sider
                        width={300}
                        theme={'dark'}
                        className={'overflow-y-scroll hidden-scrollbar'}
                        trigger={null} collapsible collapsed={collapsed}>
                        <div className={`justify-center items-center flex p-5 w-full h-fit bg-gray-100`}>
                            <Image src={'/images/logo2.png'} alt={'Logo Vuteq'} width={170} height={100}/>
                        </div>
                        <Menu
                            className={'w-full'}
                            theme="dark"
                            mode="inline"
                            onClick={clickMenu}
                            defaultSelectedKeys={['1']}
                            items={generateMenuItems()}
                        />
                    </Sider>
                    <Layout>
                        <Header className={'flex'} style={{padding: 0}}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    color: 'white'
                                }}
                            />
                            <div className={`flex justify-between items-center w-full pr-10`}>
                                <span>Hello, {name ?? '-'}</span>
                                {/*<Image src={'/images/vuteq.png'} alt={'Logo Vuteq'} width={100} height={100}/>*/}
                                <div className={'flex flex-row gap-5'}>
                                    <PiSignOutDuotone
                                        size={22}
                                        onClick={() => router.replace('/')}
                                        className={'text-xl hover:cursor-pointer hover:text-red-500 transition duration-300 ease-in-out'}
                                    />
                                </div>
                            </div>
                        </Header>
                        <Content
                            className={'h-full overflow-y-scroll no-scrollbar'}
                            style={{
                                margin: '20px 16px',
                                padding: 24,
                                minHeight: 300,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {
                                children
                            }
                        </Content>
                        <Footer style={{
                            textAlign: 'center',
                            marginBottom: '0px'
                        }}>
                            <span className={`text-white font-semibold`}>CV Berkah Abadi © 2024</span>
                        </Footer>
                    </Layout>
                </>

            }
        </>
    )
}