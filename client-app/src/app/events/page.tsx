"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useEffect, useState } from "react";
import {
  App,
  Avatar,
  Button,
  Divider,
  List,
  Tag,
  Modal,
  Timeline,
  DatePicker,
  Empty,
  Spin,
} from "antd";
import EventRecord from "@/components/EventRecord/EventRecord";
import BasicLayout from "@/components/BasicLayout";
import NewEventForm from "@/components/NewEventForm";
import EditEventForm from "@/components/EditEventForm";
import {
  ExperimentOutlined,
  FireOutlined,
  SafetyOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { getAllEvents } from "@/services/EventService";
import { AxiosError } from "axios";
import { Event } from "@/models/Event";

const Labeled: React.FC<{ children: any; label: string }> = (props) => {
  return (
    <div>
      <h2>{props.label}</h2>
      <div>{props.children}</div>
    </div>
  );
};

interface ItemListProps {
  name: string;
  action: string;
}

const VersionList: React.FC = () => {
  const versionListData = [
    {
      datetime: "2023-09-01 09:12:11",
      name: "Тестович Т.Т.",
      action: "Изменил поле ****",
    },
    {
      datetime: "2023-08-30 12:00:00",
      name: "Пользович П.П.",
      action: "Устранил инцидент номер 123",
    },
    {
      datetime: "2023-08-29 09:55:04",
      name: "Юзерович Ю.Ю.",
      action: "Провел техническое тестирование",
    },
    {
      datetime: "2023-07-15 11:23:06",
      name: "Испытаючич И.И.",
      action: "Закрыл смену",
    },
    {
      datetime: "2023-08-29 09:55:04",
      name: "Юзерович Ю.Ю.",
      action: "Провел техническое тестирование",
    },
  ];
  const Item: React.FC<ItemListProps> = ({ name, action }) => {
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
      items={versionListData.map((data) => ({
        label: <div className="flex flex-row w-full">{data.datetime}</div>,
        children: <Item name={data.name} action={data.action} />,
      }))}
    />
  );
};

const ModalAddNewEvent: React.FC<{
  open: boolean;
  handleOk: (e: any) => void;
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
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="border-rose-600 text-rose-600 hover:bg-rose-600"
        >
          Отменить
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
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="border-rose-600 text-rose-600 hover:bg-rose-600"
        >
          Отменить
        </Button>,
      ]}
    >
      <EditEventForm />
    </Modal>
  );
};

const { RangePicker } = DatePicker;

const Home: React.FC = () => {
  const { message } = App.useApp();
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [dateRangeOpen, setDateRangeOpen]   = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | undefined>(
    undefined
  );
  const [isEventsLoading, setEventsLoading] = useState<boolean>(true);

  const showNewEventModal = () => {
    setNewEventOpen(true);
  };

  const showEditEventModal = () => {
    setEditEventOpen(true);
  };

  const fetch = async () => {
    try {
      setEventsLoading(true);
      const res = await getAllEvents();
      setEventsLoading(false);
      setEventData(res);
    } catch (e) {
      message.error(
        `${(e as AxiosError).cause} ${(e as AxiosError).message}`
      );
    }
  };

  const handleNewEventOk = (e: any) => {
    console.log(e);

    setConfirmLoading(true);
    setTimeout(() => {
      setNewEventOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleNewEventCancel = () => {
    fetch();
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
    setEditEventOpen(false);
  };

  const [eventData, setEventData] = useState<Event[]>([]);

  useEffect(() => {
    fetch();
  }, []);

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
        <div className="flex flex-col max-w-[450px] w-full items-stretch gap-2">
          <div className="border-solid border-b border-slate-300 px-2 py-4 bg-slate-50 justify-between flex flex-row">
            <Button href="http://192.168.137.217:8000/generate_reports/" >Экспорт данных</Button>
            <Button onClick={showNewEventModal} type="primary">
              Добавить
            </Button>
          </div>
          <div className="self-center">
            <RangePicker showTime />
          </div>
          <Spin className="h-full" spinning={isEventsLoading}>
            <div className="bg-slate-200 px-2 flex min-h-[300px] h-full flex-col overflow-y-scroll">
              {eventData.map((data, index) => (
                <EventRecord
                  key={data.id}
                  label={data.type.name}
                  risk={data.level}
                  date={data.creation_date.toLocaleString()}
                  version={data.version}
                  eventType={data.type.name}
                  id={index}
                  onView={(i) => setCurrentEvent(eventData[i])}
                ></EventRecord>
              ))}
            </div>
          </Spin>
        </div>

        {!currentEvent && (
          <div className="bg-slate-50 flex w-full flex-row justify-center items-center">
            <Empty />
          </div>
        )}

        {currentEvent && (
          <div className="bg-white w-full h-0 min-h-full px-16 py-4">
            <div className="flex flex-row justify-between mb-8">
              <div className="flex flex-row justify-center items-center gap-4">
                <h1 className="text-2xl">{`${currentEvent?.type.name} #${currentEvent?.id}`}</h1>
                <Tag
                  color="processing"
                  className="font-semibold"
                >{`версия ${currentEvent?.version}`}</Tag>
              </div>
              <Button danger onClick={showEditEventModal}>
                Редактировать
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <p>
                <span className="font-bold" style={{ fontSize: "17px" }}>
                  Тип:
                </span>
                {"\t"}{" "}
                <span style={{ fontSize: "17px" }}>
                  {currentEvent?.type.name}
                </span>
              </p>
              <p>
                <span className="font-bold" style={{ fontSize: "17px" }}>
                  Уровень угрозы:
                </span>
                {"\t"}{" "}
                <Tag color="success" style={{ fontSize: "14px" }}>
                  {currentEvent?.level}
                </Tag>
              </p>
              <p>
                <span className="font-bold" style={{ fontSize: "17px" }}>
                  Описание события:
                </span>
                <p>{currentEvent?.description}</p>
              </p>

              <p className="font-bold" style={{ fontSize: "17px" }}>
                Кому предназначено:
              </p>
              <Labeled label="">
                <Tag
                  icon={<FireOutlined />}
                  color={"red"}
                  className="p-2 font-semibold"
                >
                  Пожарня часть
                </Tag>
                <Tag
                  icon={<SafetyOutlined />}
                  color={"blue"}
                  className="p-2 font-semibold"
                >
                  Охранная часть
                </Tag>
                <Tag
                  icon={<ToolOutlined />}
                  color={"warning"}
                  className="p-2 font-semibold"
                >
                  Инженеры
                </Tag>
                <Tag
                  icon={<ExperimentOutlined />}
                  color={"success"}
                  className="p-2 font-semibold"
                >
                  Хим безопасность
                </Tag>
              </Labeled>
            </div>
            <Divider />
            <h2 className="text-xl font-semibold">История изменений</h2>
            <div className="overflow-y-auto h-64 py-4 px-4 w-auto  flex flex-col justify-start items-start">
              <VersionList />
            </div>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default Home;
