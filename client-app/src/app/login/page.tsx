"use client";

import { User } from "@/models/User";
import { Avatar, Button, Image } from "antd";
import React, { useState, useEffect } from "react";
import {getToken, setToken} from "@/app/api/token";
import authFetch from "@/services/AuthFetchService";
import api from "@/services/GetAuthorizedUserService";
import { useRouter } from "next/navigation";

export default function AnotherPage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { push } = useRouter();


  const getData = async () => {
    const {data} = await api.get(`http://192.168.137.1:3000/auth/hello`);
    console.log(data);
  }

  useEffect(() => {
    const handleMessage = (e: any) => {

      if (e.origin !== "http://192.168.137.1:3000") return;

      const {accessToken, ...user} = JSON.parse(e.data);

      if (accessToken) {
        setUser(new User(user));
        setToken(accessToken);

        push('/events');
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
    <div className="flex flex-row justify-center items-center bg-slate-200 w-full h-full">
      <div className="px-4 py-4 justify-between rounded-lg flex flex-col bg-white min-w-[200px] gap-2 border-slate-300 border border-solid">
        <Image className="mb-8" width={200} src={'https://upload.wikimedia.org/wikipedia/ru/2/2d/Gazprom-Logo-rus.svg'}/>
        
        <div className="flex flex-col gap-2">
          <Button onClick={() => login('google')}>Google</Button>
          <Button type="primary" onClick={() => login('yandex')}>Yandex</Button>

        </div>

        {/* <Avatar src={user?.picture}/>
        <p>{user?.email}</p>
        <p>{user?.fullName}</p> */}
      </div>
    </div>
  );
}
