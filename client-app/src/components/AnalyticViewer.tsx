import React, { useState } from 'react';
import type { RadioChangeEvent, DescriptionsProps } from 'antd';
import { Card, Col, Row, Statistic } from 'antd';

interface AnalyticProps {
  title: string;
  value: number;
  prefixColor: string;
}

const AnalyticViewer: React.FC<AnalyticProps> = ({title, value, prefixColor}) => (
  <div className="p-2">
    <Card bordered={true}>
      <Statistic
        title={title}
        value={value}
        prefix={<div
          className="h-4 w-4 rounded-full"
          style={{backgroundColor: prefixColor}}>
        </div>}
      />
    </Card>
  </div>
);

export default AnalyticViewer;