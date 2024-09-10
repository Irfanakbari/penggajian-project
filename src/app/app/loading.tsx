import {Spin} from "antd";
import React from "react";

export default function Loading() {
    return <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="text-center">
            <img src="/images/logo2.png" width={200} alt="App Logo" className="mb-4"/>
            <Spin size="default"/>
        </div>
    </div>
}