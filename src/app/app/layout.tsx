import type {Metadata} from "next";
import {Layout} from "antd";
import React from "react";
import {AuthProvider} from "@/app/contexts/AuthContext";
import SideBarSC from "@/app/components/Sidebar";

export const metadata: Metadata = {
    title: "Payroll System",
};

export default function DashboardLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <section className={'h-screen'}>
                <Layout className={`h-full`}>
                    <SideBarSC title={'Dashboard'}>
                        {
                            children
                        }
                    </SideBarSC>
                </Layout>
            </section>

        </AuthProvider>

    )
}