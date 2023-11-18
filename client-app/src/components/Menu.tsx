"use client";

import React from "react";

import { Image, Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { permanentRedirect, redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import Sider from "antd/es/layout/Sider";

export default function AppMenu() {
  const { push } = useRouter();

  const items: MenuProps["items"] = [
    {
      label: "Записи",
      key: "mail",
      icon: <AppstoreOutlined />,
      onClick: () => push("/events"),
    },
    {
      label: "Аналитика",
      key: "SubMenu",
      icon: <BarChartOutlined />,
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
