"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useState } from "react";
import {
  App,
  Avatar,
  Button,
  Divider,
  List,
  Select,
  Tag,
  Tooltip,
  Input,
  Modal,
  Timeline,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import EventRecord from "@/components/EventRecord/EventRecord";
import cl from "./events.module.css";
import BasicLayout from "@/components/BasicLayout";
import NewEventForm from "@/components/NewEventForm";
import EditEventForm from "@/components/EditEventForm";

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

const VersionList: React.FC = () => {
  const Item: React.FC = () => {
    return (
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <div className="font-semibold">Тестович О.В</div>
          <div>Обновил поле ****</div>
        </div>
        <Button>Посмотреть</Button>
      </div>
    );
  };

  return (
    <Timeline
      className="w-full"
      mode="left"
      items={[
        {
          label: "2015-09-01",
          children: <Item />,
        },
        {
          label: "2015-09-01 09:12:11",
          children: "Solve initial network problems",
        },
        {
          children: "Technical testing",
        },
        {
          label: "2015-09-01 09:12:11",
          children: "Network problems being solved",
        },
      ]}
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
    { label: "закрытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Привозка груза", type: 1, date: "12.03.23 8:00" },
    { label: "Привозка груза", type: 0, date: "12.03.23 8:00" },
    { label: "Привозка груза", type: 2, date: "12.03.23 8:00" },
    { label: "Привозка груза", type: 0, date: "12.03.23 8:00" },
    { label: "Привозка груза", type: 0, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
    { label: "Открытие смены", type: 3, date: "12.03.23 8:00" },
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
      <div className="overflow-auto flex flex-row h-full w-full bg-slate-200 rounded-lg">
        <div className="flex flex-col max-w-[450px] w-full">
          <div className="px-4 py-4 bg-slate-100 justify-between flex flex-row">
            <Button>Экспорт данных</Button>
            <Button onClick={showNewEventModal} type="primary">
              Добавить
            </Button>
          </div>

          <div
            className={`flex flex-col overflow-y-scroll ${cl.hideScrollBar}`}
          >
            {eventData.map((data) => (
              <EventRecord
                key={data.date}
                label={data.label}
                type={data.type}
                date={data.date}
              ></EventRecord>
            ))}
          </div>
        </div>

        <div className="bg-white w-full h-0 min-h-full px-16 py-4">
          <div className="flex flex-row justify-between mb-8">
            <div className="flex flex-row justify-center items-center gap-4">
              <h1 className="text-2xl">Инцидент #1</h1>
              <Tag color={"green"}>Обычное</Tag>
            </div>
            <Button danger onClick={showEditEventModal}>Редактировать</Button>
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
          <div className="overflow-y-auto h-64 py-4 px-4 w-auto  flex flex-col justify-start items-start">
            <VersionList/>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;