import React from "react";
import classes from "./EventRecord.module.css";
import { Button, Tag } from "antd";

interface EventRecordProps {
  type: number;
  label: string;
  date: string;
}

const EventRecord: React.FC<EventRecordProps> = ({ type, label, date }) => {
  let tagColor;

  // let tagText;
  if(type == 0) {
    tagColor  = classes.type_1;
    // tagText   = "норма"
  } else if(type == 1) {
    tagColor  = classes.type_2;
    // tagText   = "внимание"
  } else if (type == 2) {
    tagColor  = classes.type_3;
    // tagText   = "опасно"
  } else if(type == 3) {
    tagColor  = classes.type_4;
    // tagText   = "смена"
  }

  return (
    <div className="bg-white flex flex-row justify-between items-center border-solid border border-slate-200 px-4 py-2">
      {/*<Tag color={tagColor} className="col-start-1 row-start-1 text-center text-xs">{tagText}</Tag>*/}
      <div className="flex flex-row items-center gap-5">
        <div className={`w-2 h-2 ${tagColor} rounded-full`}></div>
        <div className="flex flex-col">
          <div className="font-semibold ">{label}</div>
          <div className="text-xs">{date}</div>
          <div className="text-xs">Тестов Тест</div>
        </div>
      </div>
      <Button className="col-start-4 row-start-1" type="link">Просмотр</Button>

    </div>
  );
};

export default EventRecord;
