"use client";

import React from "react";

import { Image, Menu, MenuProps } from "antd";
import {
  AppstoreOutlined, BarChartOutlined, EyeFilled,
  MailOutlined,
  SettingOutlined, StockOutlined,
} from "@ant-design/icons";
import { permanentRedirect, redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import Sider from "antd/es/layout/Sider";

export default function AppMenu() {
  const { push } = useRouter();

  const items: MenuProps["items"] = [
    {

      label: "Журнал оператора",
      key: "operator",
      icon: <EyeFilled />,

      onClick: () => push("/events"),
    },
    {
      label: "Аналитика",
      key: "analytics",
      icon: <BarChartOutlined />,
      onClick: () => push("/analytics"),
    },
    {
      label: "Настройки",
      key: "settings",
      icon: <SettingOutlined />,

      onClick: () => push("/login"),
    },
  ];

  return (
    <Sider  collapsed>
      <div className="bg-blue-500 h-full">

      <div className="bg-blue-500 flex justify-center">
        <Image
          preview={false}
          alt="logo"
          width={64}
          height={64}
          src="https://cdn.freebiesupply.com/logos/large/2x/OAO-logo-black-and-white.png"
        />
      </div>
      <Menu className=" bg-blue-500 text-white " items={items} />
      </div>
    </Sider>
  );
}
