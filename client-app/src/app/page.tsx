"use client"; // If used in Pages Router, is no need to add "use client"


import BasicLayout from "@/components/BasicLayout";

import React, { useState } from "react";
import { App, Button, Modal } from "antd";
import { Avatar, Skeleton, Switch, Input, Select, InputNumber } from 'antd';

const { TextArea } = Input;


const Home: React.FC = () => {
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  
  return (

    <BasicLayout>

      <div className="flex flex-row items-center justify-center h-full w-full bg-white rounded-lg">
        <div className="h-full flex flex-col gap-20 p-5">
          <div className="self-center flex flex-col items-center">
            <p className="text-4xl font-bold">Хакатон "Digital challenge"</p>
            <p className="text-3xl font-bold">Команда "Fasbear.js"</p>
          </div>
          <div style={{width: "80%", alignSelf: "center"}}>
            <p className="text-3xl font-bold">Кейс №2</p>
            <p className="text-2xl font-bold">Электронный журнал регистрации</p>
          </div>
          <div style={{width: "80%", alignSelf: "center"}}>
            <p className="font-bold text-2xl">Описаниек кейса:</p>
            <p className="text-xl">
              Веб приложение, которое позволяет автоматизировать
              процесс регистрации информации для формирования
              Журнала производственно-диспетчерской службы
            </p>
          </div>
        </div>
      </div>

    </BasicLayout>

  );
};

export default Home;
