"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useState } from "react";
import { App, Avatar, Button, Divider, List, Select, Tag, Tooltip, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import EventRecord from "@/components/EventRecord/EventRecord";
import cl from "./events.module.css"
import BasicLayout from "@/components/BasicLayout";

const Labeled: React.FC<{ children: any; label: string }> = (props) => {
  return (
    <div>
      <h2>{props.label}</h2>
      <div>{props.children}</div>
    </div>
  );
};


const HistoryList: React.FC = () => {
  const data = [
    {
      title: "Обновил команду",
    },
    {
      title: "Обновил команду",
    },
    {
      title: "Обновил команду",
    },
    {
      title: "Создал команду",
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={<a href="https://ant.design">{index}</a>}
            description={item.title}
          />
        </List.Item>
      )}
    />
  );
};

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

  const eventData = [
    {label: 'закрытие смены', type: 3, date: "12.03.23 8:00"},
    {label: 'Привозка груза', type: 1, date: "12.03.23 8:00"},
    {label: 'Привозка груза', type: 0, date: "12.03.23 8:00"},
    {label: 'Привозка груза', type: 2, date: "12.03.23 8:00"},
    {label: 'Привозка груза', type: 0, date: "12.03.23 8:00"},
    {label: 'Привозка груза', type: 0, date: "12.03.23 8:00"},
    {label: 'Открытие смены', type: 3, date: "12.03.23 8:00"},
  ]

  return (
    <BasicLayout>
    <div className="overflow-auto flex flex-row h-full w-full bg-slate-200 rounded-lg">
      <Modal title="Заполнение формы" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={(handleCancel)}>
        <div  className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 items-center w-full">
            <text>Название</text>
            <Input/>
          </div>
          <div className="flex flex-row gap-3 items-center w-full">
            <text>Уровень критичности</text>

            <Select defaultValue=" " className="flex-auto" onChange={() => {}}
                    options={[
                      { value: '0', label: 'Слабо' },
                      { value: '1', label: 'Умеренно' },
                      { value: '2', label: 'Сильно' },
                    ]}
            />
          </div>
          <div className="flex flex-row gap-3 items-center">
            <text>Тип события</text>
            <Select defaultValue=" " className="flex-auto" onChange={() => {}}
                    options={[
                      { value: '0', label: 'начало смены' },
                      { value: '1', label: 'закрытие смены' },
                      { value: '2', label: 'другое' },
                    ]}
            />
          </div>
          <text>Описание события:</text>
          <TextArea rows={4}/>
        </div>
      </Modal>
      <div className="flex flex-col max-w-[450px] w-full">
        <div className="px-4 py-4 bg-slate-100 justify-between flex flex-row">
          <Button>Экспорт данных</Button>
          <Button onClick={showModal} type="primary">Добавить</Button>
        </div>

        <div className={`flex flex-col overflow-y-scroll ${cl.hideScrollBar}`}>
          {eventData.map((data) =>
            <EventRecord
              key={data.date}
              label={data.label}
              type={data.type}
              date={data.date}
            ></EventRecord>)}
        </div>
      </div>

      <div className="bg-white w-full h-full px-16 py-4">
        <div className="flex flex-row justify-between mb-8">
          <div className="flex flex-row justify-center items-center gap-4">
            <h1 className="text-2xl">Инцидент #1</h1>
            <Tag color={"green"}>Обычное</Tag>
          </div>
          <Button>Редактировать</Button>
        </div>
        <div className="flex flex-col gap-4">
          <Labeled label="Тип:">
            <Select
              disabled={true}
              defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Команда" },
                { value: "lucy", label: "Инцидент" },
                { value: "Yiminghe", label: "Критичность" },
              ]}
            />
          </Labeled>
          <Labeled label="Описание:">
            <TextArea disabled={true}></TextArea>
          </Labeled>

          <Labeled label="Кому предназначено:">
            <Avatar.Group>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  // icon={< />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                // icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </Labeled>
        </div>
        <Divider />
        <h2 className="text-xl">История изменений</h2>
        <div className="overflow-auto">
          <HistoryList />
        </div>
      </div>
    </div>
    </BasicLayout>
  );
};

export default Home;
