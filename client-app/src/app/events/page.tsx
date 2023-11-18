"use client"; // If used in Pages Router, is no need to add "use client"

import React from "react";
import { App, Button } from "antd";

const EventRecord: React.FC = () => {
  return (
    <div className="bg-white items-center border-solid flex flex-row border border-slate-200  px-4 py-4">
      <div className="rounded-full mr-4 w-2 h-2 bg-green-500"></div>
      <div>Событие</div>
    </div>
  );
};

const Home: React.FC = () => {
  const { message } = App.useApp();

  return (
    <div className="overflow-auto flex flex-row h-full w-full bg-slate-200 rounded-lg">
      <div className="flex flex-col max-w-[450px] w-full">
        <div className="px-4 py-4 bg-slate-100">
          <Button>Экспорт</Button>
          <Button>Экспорт</Button>
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
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-2xl">Инцидент #1</h1>
          </div>
          <Button>Редактировать</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
