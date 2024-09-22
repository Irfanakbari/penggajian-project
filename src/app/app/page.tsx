'use client'
import React, {useState} from "react";
import {message} from "antd";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {
                contextHolder
            }
            <div
                className="w-full gap-3 flex flex-col overflow-y-scroll h-full no-scrollbar justify-center items-center backdrop-blur-lg bg-white/20"
                style={{
                    backdropFilter: 'blur(30px)', // Menambahkan efek blur
                    WebkitBackdropFilter: 'blur(30px)', // Mendukung browser yang menggunakan prefix Webkit
                }}
            >
                <img src={'/images/logo.png'} alt={'Logo'} width={700} height={700}/>
            </div>
        </>
    );
};

export default App;