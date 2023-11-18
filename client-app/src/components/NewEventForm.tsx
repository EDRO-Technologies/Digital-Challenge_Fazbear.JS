import React, { useState } from 'react';

import {
  Button,
  Form,
  Input, message,
  Select, Upload, UploadProps,
} from 'antd';
import {UploadOutlined} from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const NewEventForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const eventTypeSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="type1">Смена</Option>
        <Option value="type2">Инцидент</Option>
        <Option value="type3">Другое</Option>
      </Select>
    </Form.Item>
  );

  const eventRiskSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="risk1">Слабо</Option>
        <Option value="risk2">Умеренно</Option>
        <Option value="risk3">Сильно</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="flex flex-col items-center">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Название события"
          rules={[
            {
              required: true,
              message: 'Введите название события',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="event-type"
          label="Тип события"
          rules={[{ required: true, message: 'Укажите тип события' }]}
        >
          <Input addonAfter={eventTypeSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="event-risk"
          label="Важность события"
          rules={[{ required: true, message: 'Please input donation amount!' }]}
        >
          <Input addonAfter={eventRiskSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="event-description"
          label="Описание"
          rules={[{ required: true, message: 'Please input Intro' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
      </Form>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Загрузить документ</Button>
      </Upload>
    </div>

  );
};

export default NewEventForm;