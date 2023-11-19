"use client"; // If used in Pages Router, is no need to add "use client"

import React, { useState } from "react";
import {Button, Divider, List, Select, Tag, Tooltip, Input, Modal, Row, Col, Card, Statistic, Flex } from "antd";
import BasicLayout from "@/components/BasicLayout";
import Charts from "@/components/Charts";
import AnalyticViewer from "@/components/AnalyticViewer";

const Labeled: React.FC<{ children: any; label: string }> = (props) => {
  return (
    <div>
      <h2>{props.label}</h2>
      <div>{props.children}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const analyticsData = [
    {title: "легкие",     value: 150, prefixColor:  "green"},
    {title: "средние",    value: 55, prefixColor:   "yellow"},
    {title: "тяжелые",    value: 12, prefixColor:   "orange" },
    {title: "инциденты",  value: 10, prefixColor:   "red"},
  ];

  return (
    <BasicLayout>
      <div className="flex flex-row">
        <div className="flex flex-col justify-around px-2">
          <div className="p-4 bg-slate-100 justify-between flex flex-row gap-2">
            <Button type="primary">Экспорт</Button>
            <Select defaultValue="выбрать период" className="w-54" onChange={() => {}}
                    options={[
                      { value: '0', label: 'День' },
                      { value: '1', label: 'Неделя' },
                      { value: '2', label: 'Месяц' },
                      { value: '3', label: 'Квартал' },
                      { value: '4', label: 'Год' },
                    ]}/>
          </div>
          <div>
            <p className="font-bold text-xl">Аналитика событий</p>
            {analyticsData.map((data) => (
                <AnalyticViewer
                  key={Date.now()}
                  title={data.title}
                  value={data.value}
                  prefixColor={data.prefixColor}
                />
            ))}
          </div>
        </div>
          <Charts />
      </div>
    </BasicLayout>
  );
};

export default Home;