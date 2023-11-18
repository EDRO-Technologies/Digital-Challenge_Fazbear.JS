import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import AppMenu from "./Menu";

export default function BasicLayout({children}: any) {
  return (
    <Layout>
      <AppMenu />
      <Layout className="bg-slate-200">
        <Header className="text-lg flex items-center bg-white border-b border-solid border-slate-200">
          Электронный журнал регистрации
        </Header>
        <Content className=" min-h-[280px] rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
}
