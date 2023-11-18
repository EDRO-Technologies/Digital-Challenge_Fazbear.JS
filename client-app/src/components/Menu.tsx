"use client";

import React from "react";

import {  Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { permanentRedirect, redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";

export default function AppMenu() {
  const { push } = useRouter();

  const items: MenuProps["items"] = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
      onClick: () => push("/events"),
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      onClick: () => push("/login"),
    },
  ];

  return (
    <Sider collapsed>
      {/* <Image alt="logo" width={32} height={32} src="https://cdn.freebiesupply.com/logos/large/2x/OAO-logo-png-transparent.png"/> */}
      <Menu className="h-full py-24 bg-blue-500  text-white" items={items} />
    </Sider>
  );
}
