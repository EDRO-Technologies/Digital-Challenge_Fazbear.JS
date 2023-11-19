import { removeToken } from "@/app/api/token";
import { User } from "@/models/User";
import { getUser } from "@/services/AuthFetchService";
import { App, Avatar, Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AppMenu from "./Menu";

const UserContainer: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const {push} = useRouter();

  function logout() {
    removeToken();
    push('/login');
  }

  useEffect(() => {
    const fetch = async () => {
      const data = await getUser();

      setUser(data);
    }

    fetch();
  }, [])
  
  return (
    <div>
      {user?.fullName}
      <Button type="link" onClick={logout} >Выход</Button>
    </div>
  )
}

export default function BasicLayout({children}: any) {
  return (
    <Layout className="flex h-full w-full">
      <AppMenu />
      <Layout className="bg-slate-200">
        <Header className="flex items-center justify-between bg-white border-b border-solid border-slate-200">
          <h1 className="text-lg">Электронный журнал регистрации</h1>
          <UserContainer/>
        </Header>
        <Content className=" min-h-[280px] rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
}
