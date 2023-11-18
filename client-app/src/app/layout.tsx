import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { App, ConfigProvider, Layout } from "antd";

import StyledComponentsRegistry from "../../lib/AntdRegistry";

import "./globals.css";
import AppMenu from "@/components/Menu";
import { Content, Header } from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App className="w-full h-full flex flex-row">
          <StyledComponentsRegistry>
            <ConfigProvider>
              <Layout>
                <AppMenu />
                <Layout className="bg-slate-200">
                  <Header className="bg-white"  >Headerdsafsad</Header>
                  <Content className=" min-h-[280px] mx-4 my-6 rounded-lg">
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </ConfigProvider>
          </StyledComponentsRegistry>
        </App>
      </body>
    </html>
  );
}