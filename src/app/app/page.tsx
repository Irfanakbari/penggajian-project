'use client'
import React, {useState} from "react";
import {message} from "antd";
import Alert from "antd/es/alert/Alert";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    return (
       <>
           {
               contextHolder
           }
           <div className={'w-full gap-3 flex flex-col overflow-y-scroll h-full no-scrollbar'}>
               <Alert
                   message="The data display in this dashboard is in the development stage, there are some data that may not be accurate."
                   banner
                   closable
               />

           </div>
       </>
    );
};

export default App;