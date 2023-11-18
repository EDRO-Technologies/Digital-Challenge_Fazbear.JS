"use client";

import { User } from "@/models/User";
import { Avatar, Button } from "antd";
import React, { useState, useEffect } from "react";

export default function AnotherPage() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const handleMessage = (e: any) => {
      if (e.origin !== "http://localhost:3000") return;

      setUser(new User(JSON.parse(e.data)));
      console.log(e.data);
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
    <div className="flex flex-row gap-2">
      <Button onClick={() => login('google')}>Google</Button>
      <Button onClick={() => login('yandex')}>Yandex</Button>

      <Avatar src={user?.picture}/>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>
    </div>
  );
}
