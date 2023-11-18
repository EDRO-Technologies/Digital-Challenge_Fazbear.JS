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
      <div>
        <Button onClick={showModal} type="primary">
          СИНИЙ БОТТОН??? 
        </Button>
        <Modal title="Заполнение формы" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={(handleCancel)}>
          <div  className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 items-center w-full">
              <text>Уровень критичности</text>
              <Select defaultValue=" " className="flex-auto" onChange={() => {}}
                options={[
                  { value: '0', label: 'Green' },
                  { value: '1', label: 'Yellow' },
                  { value: '2', label: 'Red' },
                ]}
              />
            </div>
            <div className="flex flex-row gap-3 items-center">
              <text>Тип события</text>
              <div className="flex flex-row gap-3"></div>
            </div>
            <text>Описание события:</text>
            <TextArea rows={4}/>
          </div>
        </Modal>
      </div>
    </div>

    </BasicLayout>

  );
};

export default Home;
