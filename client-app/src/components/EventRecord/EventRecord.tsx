import React from "react";
import classes from "./EventRecord.module.css";
import { Button, Tag } from "antd";

interface EventRecordProps {
  type: number;
  label: string;
  date: string;
  version: string;
}

const EventRecord: React.FC<EventRecordProps> = ({ type, label, date, version}) => {
  let typeColor;

  if(type == 0) {
    typeColor  = classes.type_1;
  } else if(type == 1) {
    typeColor  = classes.type_2;
  } else if (type == 2) {
    typeColor  = classes.type_3;
  } else if(type == 3) {
    typeColor  = classes.type_4;
  }

  return (
    <div className="bg-white flex flex-row justify-between items-center border-solid border border-slate-200 px-4 py-2">
      <div className="flex flex-row items-center gap-5">
        <div className={`w-2 h-2 ${typeColor} rounded-full`}></div>
        <div className="flex flex-col">
          <div className="font-semibold ">{label}</div>
          <div className="text-xs">{date}</div>
          <div className="text-xs">Тестов Тест</div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Tag color="processing" className="px-2">{version}</Tag>
        <Button type="link">Просмотр</Button>
      </div>

    </div>
  );
};

export default EventRecord;
