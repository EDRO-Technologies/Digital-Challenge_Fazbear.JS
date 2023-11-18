import { Avatar, Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import AppMenu from "./Menu";

const UserContainer: React.FC = () => {
  const fullName = "Тестович О.Л.";
  
  return (
    <div>
      {fullName}
      <Button type="link">Выход</Button>
    </div>
  )
}

export default function BasicLayout({children}: any) {
  return (
    <Layout>
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
