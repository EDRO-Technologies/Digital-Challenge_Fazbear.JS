"use client";

import { User } from "@/models/User";
import { App, Avatar, Button, Divider, Form, Image, Input } from "antd";
import React, { useState, useEffect } from "react";
import { getToken, setToken } from "@/app/api/token";
import authFetch, { getUser, loginUserByEmail } from "@/services/AuthFetchService";
import api from "@/services/GetAuthorizedUserService";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import styles from "./login.module.css";
import {SmileOutlined, SmileTwoTone} from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function AnotherPage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { push } = useRouter();
  const {message} = App.useApp();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const getData = async () => {
    const { data } = await api.get(`http://192.168.137.1:3000/auth/hello`);
    console.log(data);
  };

  useEffect(() => {
    const handleMessage = (e: any) => {
      if (e.origin !== "http://192.168.137.1:3000") return;

      const { accessToken, ...user } = JSON.parse(e.data);

      if (accessToken) {
        setUser(new User(user));
        setToken(accessToken);

        push("/events");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const onFinish = async (content: { password: string; username: string }) => {
    console.log({ content });

    setBtnLoading(true);
    try {
      await loginUserByEmail(content.username, content.password);
      const user = await getUser();
      console.log(user);
      message.success(`Добро пожаловать, ${user.fullName}`);
      push('/events');
    } catch (e) {
      message.error((e as AxiosError).message);
    } finally {
      setBtnLoading(false);
    }

  };

  const login = (provider: string) => {
    const authWindow = window.open(
      `http://192.168.137.1:3000/auth/${provider}`,
      "Auth",
      "width=500,height=500,status=yes,toolbar=no,menubar=no,location=no"
    );

    const timer = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(timer);
        // Здесь можно выполнить какие-то действия после закрытия окна аутентификации
      }
    }, 1000);
  };

  return (
    <div className={`flex flex-row justify-center items-center bg-slate-200 w-full h-full ${styles.bg}`}>
      
      <div className="px-4 py-4 justify-between items-center rounded-lg flex flex-col bg-white min-w-[200px]  border-slate-300 border border-solid">
        <Image
          className="mb-8"
          preview={false}
          width={200}
          alt="Газпром"
          src={
            "https://upload.wikimedia.org/wikipedia/ru/2/2d/Gazprom-Logo-rus.svg"
          }
        />

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          className="w-full mb-0"
          // initialValues
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="username"
            rules={[{ required: true, message: "Введите email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="w-full mb-0">
            <Button loading={btnLoading} className="w-full mt-4" type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div className="flex w-full flex-col gap-2">
          {/* <Button onClick={() => login("google")}>Google</Button> */}
          <Button
            onClick={() => login("yandex")}
            icon={<SmileTwoTone twoToneColor={"red"}/>}
            className={styles.yandexBtn}
          >Войти с Яндекс ID</Button>
          <Button
            onClick={() => push("/events")}
          >Войти как гость</Button>
        </div>
      </div>
    </div>
  );
}
