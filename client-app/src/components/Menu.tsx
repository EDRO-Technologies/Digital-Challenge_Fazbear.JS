"use client";

import React from "react";

import { Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
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
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
      onClick: () => push("/"),
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      onClick: () => push("/anotherPage"),
    },
  ];

  return (
    <Sider collapsed>
      <Menu className="h-full py-24 bg-blue-500  text-white" items={items} />
    </Sider>
  );
}
