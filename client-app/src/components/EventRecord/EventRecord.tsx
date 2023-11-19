import React from "react";
import classes from "./EventRecord.module.css";
import { Button, Tag } from "antd";

interface EventRecordProps {
  risk: number;
  label: string;
  date: string;
  version: number;
  eventType: string;

  id: number;
  onView: (id: number) => void;
}

const EventRecord: React.FC<EventRecordProps> = ({
    risk,
    label,
    date,
    version,
    eventType,
    id,
    onView
  }) => {
  let riskColor;
  let tagText;
  let tagColor;

  if(risk == 0) {
    riskColor  = classes.type_1;
  } else if(risk == 1) {
    riskColor  = classes.type_2;
  } else if (risk == 2) {
    riskColor  = classes.type_3;
  } else if(risk == 3) {
    riskColor  = classes.type_4;
  }

  if(eventType === "accident") {
    tagText = "Инцидент";
    tagColor = "red";
  } else if(eventType === "command") {
    tagText = "Команда";
    tagColor = "darkblue";
  } else if (eventType === "other") {
    tagText = "Другое";
    tagColor = "default";
  }



  return (
    <div className="bg-white flex flex-row justify-between items-center border-solid border border-slate-200 px-4 py-2">
      <div className="flex flex-row items-center gap-5">
        <div className={`w-2 h-2 ${riskColor} rounded-full`}></div>
        <div className="flex flex-col">
          <div className="font-semibold ">{label}</div>
          <div className="text-xs">{date}</div>
          <div className="text-xs">Тестов Тест</div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Tag color={tagColor}>{tagText}</Tag>
        <Tag color="processing" className="px-2">в {version}</Tag>
        <Button type="link" onClick={() => onView(id)}>Просмотр</Button>
      </div>
    </div>
  );
};

export default EventRecord;
