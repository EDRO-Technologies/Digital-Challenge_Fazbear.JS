"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useEffect } from "react";
import { App, Avatar, Button, Divider, List, Select, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import BasicLayout from "@/components/BasicLayout";
import api from "@/services/GetAuthorizedUserService";

const EventRecord: React.FC = () => {
  return (
    <div className="bg-white items-center border-solid flex flex-row border border-slate-200  px-4 py-4">
      <div className="rounded-full mr-4 w-2 h-2 bg-green-500"></div>
      <div>Событие</div>
    </div>
  );
};

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

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/auth/hello');

      console.log(data);
    }

    fetch();
  }, [])

  return (
    <BasicLayout>
      <div className="overflow-auto flex flex-row h-full w-full bg-slate-200 rounded-lg">
        <div className="flex flex-col max-w-[450px] w-full">
          <div className="px-4 py-4 bg-slate-100 justify-between flex flex-row">
            <Button>Экспорт данных</Button>
            <Button type="primary">Добавить</Button>
          </div>
          <div className="flex flex-col">
            <EventRecord />
            <EventRecord />
            <EventRecord />
            <EventRecord />
            <EventRecord />
            <EventRecord />
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
              <TextArea></TextArea>
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
