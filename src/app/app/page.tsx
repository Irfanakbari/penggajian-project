'use client'
import React from "react";

const App = () => {
    return (
        <>
            <div
                className="w-full gap-3 flex flex-col overflow-y-scroll h-full no-scrollbar justify-center items-center backdrop-blur-lg bg-white/20"
                style={{
                    backdropFilter: 'blur(30px)', // Menambahkan efek blur
                    WebkitBackdropFilter: 'blur(30px)', // Mendukung browser yang menggunakan prefix Webkit
                }}
            >
                <img src={'images/logo3.jpg'} alt={'Logo'} width={700} height={700}/>
            </div>
        </>
    );
};

export default App;