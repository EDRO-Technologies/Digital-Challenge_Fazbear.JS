import React from "react";
import classes  from "./EventRecord.module.css";
import {Button, Tag} from "antd";

interface EventRecordProps {
  type: number;
  label: string;
  date: string;
}

const EventRecord: React.FC<EventRecordProps> = ({type, label, date}) => {
  let tagColor;
  let tagText;
  if(type == 0) {
    tagColor  = "success";
    tagText   = "норма"
  } else if(type == 1) {
    tagColor  = "warning";
    tagText   = "внимание"
  } else if (type == 2) {
    tagColor  = "error";
    tagText   = "опасно"
  } else if(type == 3) {
    tagColor  = "processing";
    tagText   = "смена"
  }

  return (
    <div className="bg-white items-center border-solid grid grid-cols-4 grid-rows-2 border border-slate-200 px-4 py-4">
      <Tag color={tagColor} className="col-start-1 row-start-1 text-center text-xs">{tagText}</Tag>
      <div className="font-semibold col-start-1 row-start-2 col-span-2">{label}</div>
      <div className="col-start-1 row-start-3 text-xs">{date}</div>
      <div className="col-start-2 row-start-3 text-xs">Тестов Тест</div>
      <Button className="col-start-4 row-start-2" type="primary">Просмотр</Button>
    </div>
  );
};

export default EventRecord;
