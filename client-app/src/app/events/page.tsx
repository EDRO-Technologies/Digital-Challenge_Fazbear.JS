"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useState } from "react";
import {
  App,
  Avatar,
  Button,
  Divider,
  List,
  Tag,
  Modal,
  Timeline,
} from "antd";
import EventRecord from "@/components/EventRecord/EventRecord";
import BasicLayout from "@/components/BasicLayout";
import NewEventForm from "@/components/NewEventForm";
import EditEventForm from "@/components/EditEventForm";
import {ExperimentOutlined, FireOutlined, SafetyOutlined, SearchOutlined, ToolOutlined} from "@ant-design/icons";

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

interface ItemListProps {
  name:     string;
  action:   string;
}

const VersionList: React.FC = () => {
  const versionListData = [
    {datetime: "2023-09-01 09:12:11", name: "Тестович Т.Т.", action: "Изменил поле ****"},
    {datetime: "2023-08-30 12:00:00", name: "Пользович П.П.", action: "Устранил инцидент номер 123"},
    {datetime: "2023-08-29 09:55:04", name: "Юзерович Ю.Ю.", action: "Провел техническое тестирование"},
    {datetime: "2023-07-15 11:23:06", name: "Испытаючич И.И.", action: "Закрыл смену"},
    {datetime: "2023-08-29 09:55:04", name: "Юзерович Ю.Ю.", action: "Провел техническое тестирование"},
  ]
  const Item: React.FC<ItemListProps> = ({name, action}) => {
    return (
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <div className="font-semibold">{name}</div>
          <div>{action}</div>
        </div>
        <Button>Посмотреть</Button>
      </div>
    );
  };


  return (
    <Timeline
      className="w-full"
      mode="left"
      items ={versionListData.map((data) => (
        {
          label: <div className="flex flex-row w-full">{data.datetime}</div>,
          children: <Item name={data.name} action={data.action}/>
        }
      ))}
    />
  );
};

const ModalAddNewEvent: React.FC<{
  open: boolean;
  handleOk: () => void;
  confirmLoading: boolean;
  handleCancel: () => void;
}> = ({ open, handleOk, confirmLoading, handleCancel }) => {
  return (
    <Modal
      open={open}
      title="Добавить событие"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      footer ={[
        <Button key="back" onClick={handleCancel} className="border-rose-600 text-rose-600 hover:bg-rose-600">
          Отменить
        </Button>,
        <Button key="submit" onClick={handleCancel} type="primary">
          Подтвердить
        </Button>,
      ]}
    >
      <NewEventForm />
    </Modal>
  );
};

const ModalEditEvent: React.FC<{
  open: boolean;
  handleOk: () => void;
  confirmLoading: boolean;
  handleCancel: () => void;
}> = ({ open, handleOk, confirmLoading, handleCancel }) => {
  return (
    <Modal
      open={open}
      title="Редактировать событие"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      footer ={[
        <Button key="back" onClick={handleCancel} className="border-rose-600 text-rose-600 hover:bg-rose-600">
          Отменить
        </Button>,
        <Button key="submit" onClick={handleCancel} type="primary">
          Подтвердить
        </Button>,
      ]}
    >
      <EditEventForm />
    </Modal>
  );
};

const Home: React.FC = () => {
  const { message } = App.useApp();
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const showNewEventModal = () => {
    setNewEventOpen(true);
  };

  const showEditEventModal = () => {
    setEditEventOpen(true);
  };

  const handleNewEventOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setNewEventOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleNewEventCancel = () => {
    console.log("Clicked cancel button");
    setNewEventOpen(false);
  };
  const handleEditEventOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setEditEventOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleEditEventCancel = () => {
    console.log("Clicked cancel button");
    setEditEventOpen(false);
  };

  const eventData = [
    { label: "закрытие смены", risk: 3, date: "12.03.23 8:00", version: 3, eventType: "accident" },
    { label: "Привозка груза", risk: 1, date: "12.03.23 8:00", version: 1, eventType: "command" },
    { label: "Привозка груза", risk: 0, date: "12.03.23 8:00", version: 2, eventType: "other" },
    { label: "Привозка груза", risk: 2, date: "12.03.23 8:00", version: 4, eventType: "accident" },
    { label: "Привозка груза", risk: 0, date: "12.03.23 8:00", version: 1, eventType: "command" },
    { label: "Привозка груза", risk: 0, date: "12.03.23 8:00", version: 1, eventType: "command" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 1, eventType: "accident" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 5, eventType: "other" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 1, eventType: "other" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 2, eventType: "other" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 4, eventType: "other" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 2, eventType: "other" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 3, eventType: "accident" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 2, eventType: "command" },
    { label: "Открытие смены", risk: 3, date: "12.03.23 8:00", version: 1, eventType: "command" },
  ];

  return (
    <BasicLayout>
      <ModalAddNewEvent
        confirmLoading={confirmLoading}
        handleOk={handleNewEventOk}
        handleCancel={handleNewEventCancel}
        open={newEventOpen}
      />
      <ModalEditEvent
        confirmLoading={confirmLoading}
        handleOk={handleEditEventOk}
        handleCancel={handleEditEventCancel}
        open={editEventOpen}
      />
      <div className="overflow-auto flex flex-row h-full w-full  rounded-lg">
        <div className="flex flex-col max-w-[450px] w-full">
          <div className="border-solid border-b mb-2 border-slate-300 px-2 py-4 bg-slate-50 justify-between flex flex-row">
            <Button>Экспорт данных</Button>
            <Button onClick={showNewEventModal} type="primary">
              Добавить
            </Button>
          </div>
          <Button className="m-2" icon={<SearchOutlined />}>Поиск</Button>

          <div
            className="bg-slate-200 px-2 flex flex-col overflow-y-scroll"
          >
            {eventData.map((data) => (
              <EventRecord
                key       = {data.date}
                label     = {data.label}
                risk      = {data.risk}
                date      = {data.date}
                version   = {data.version}
                eventType = {data.eventType}
              ></EventRecord>
            ))}
          </div>
        </div>

        <div className="bg-white w-full h-0 min-h-full px-16 py-4">
          <div className="flex flex-row justify-between mb-8">
            <div className="flex flex-row justify-center items-center gap-4">
              <h1 className="text-2xl">Инцидент #1</h1>
              <Tag color="processing" className="font-semibold">версия 3</Tag>
            </div>
            <Button danger onClick={showEditEventModal}>Редактировать</Button>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-bold" style={{fontSize: "17px"}}>Тип:</span>
              {"\t"} <span style={{fontSize: "17px"}}>Инцидент</span>
            </p>
            <p>
              <span className="font-bold" style={{fontSize: "17px"}}>Уровень угрозы:</span>
              {"\t"} <Tag color="success" style={{fontSize: "14px"}}>слабый</Tag>
            </p>
            <p>
              <span className="font-bold" style={{fontSize: "17px"}}>Описание события:</span>
              <p>
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </p>

            <p className="font-bold" style={{fontSize: "17px"}}>Кому предназначено:</p>
            <Labeled label="">
              <Tag
                icon={<FireOutlined />}
                color={"red"}
                className="p-2 font-semibold"
              >Пожарня часть</Tag>
              <Tag
                icon={<SafetyOutlined />}
                color={"blue"}
                className="p-2 font-semibold"
              >Охранная часть</Tag>
              <Tag
                icon={<ToolOutlined />}
                color={"warning"}
                className="p-2 font-semibold"
              >Инженеры</Tag>
              <Tag
                icon={<ExperimentOutlined />}
                color={"success"}
                className="p-2 font-semibold"
              >Хим безопасность</Tag>
            </Labeled>
          </div>
          <Divider />
          <h2 className="text-xl font-semibold">История изменений</h2>
          <div className="overflow-y-auto h-64 py-4 px-4 w-auto  flex flex-col justify-start items-start">
            <VersionList />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;