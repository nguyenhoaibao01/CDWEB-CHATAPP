import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Card
} from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from "store";
import logo from "assets/images/logo.png";

const FormDisabledDemo: React.FC = () => {
    const profileUser = useAppSelector((state) => state.auth.profileUser) || {};
    const { TextArea } = Input;
  return (
    <div className='bg-blue-900 px-5 py-5 w-full flex justify-center item-center'>
    <Card 
      className='w-4/12 py-5 px-3' 
      
    >
        <h1 className='text-3xl'>Update profile</h1>
          <div className="login-logo-ant">
          <img src={logo} width={150} />
        </div>
    <Form className="w-full"
        layout="vertical"
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Your Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item >
          <Button type='primary' ghost>Update</Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default () => <FormDisabledDemo />;