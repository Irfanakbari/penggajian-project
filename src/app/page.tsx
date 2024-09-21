'use client'
import {Button, Form, FormProps, Input, message} from "antd";
import Image from "next/image";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {login} from "@/app/db/queries/auth";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const submitLogin: FormProps['onFinish'] = async (values) => {
    setLoading(true)
    const result = await login(values.username, values.password)
    if (result) {
      messageApi.open({
        type: 'success',
        content: 'Login Success',
      });
      router.replace("/app");
    } else {
      messageApi.open({
        type: 'error',
        content: "Wrong Username or Password",
      });
    }
    setLoading(false)
  };

  return (
      <main
          className="absolute flex h-screen flex-col w-full p-24 items-center justify-center bg-cover bg-center bg-bg-image ">
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        {
          contextHolder
        }
        <div
            className="relative z-10 w-full md:w-1/2 lg:w-1/3 p-8 backdrop-blur-sm bg-white/20 rounded-lg shadow-lg mt-10 flex flex-col items-center gap-8">
          {/* Konten Login Anda di sini */}
          {/*<h2 className="text-2xl font-semibold mb-4 text-center">Selamat Datang</h2>*/}
          <Image src={'/images/logo2.png'} alt={'Logo'} width={320} height={150}/>
          <Form
              className={'w-full'}
              onFinish={submitLogin}
          >
            <label htmlFor="username" className="block text-lg font-medium text-gray-200">Username</label>
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your username (NIK)'}]}
            >
              <Input/>
            </Form.Item>
            <label htmlFor="password" className="block text-lg font-medium text-gray-200">Password</label>
            <Form.Item
                // label={'Password'}
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" className={`w-full`}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <span className={`relative z-10 text-white mt-10`}>CV Terang Jaya © 2024</span>
        <span className={`relative z-10 text-white mt-1`}>Version 2.0</span>
      </main>
  );
}