import {
  Button,
  Form,
  Input,
  Modal,
  InputNumber,
  message,
  Card,
  Avatar,
  List,
} from "antd";
import { useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import avatar from "../../../assets/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "store";
import { setModelData, resetModelData } from "providers/GeneralProvider/slice";
import { AvatarGenerator } from "random-avatar-generator";
import { requestAcceptFriend } from "providers/AuthProvider/slice";
type MyObjectType = {
  id: number;
  receiver: {
    email: string;
    name: string | null;
    // other properties as needed
  };
  address: null;
  avatarUrl: null;
  birthday: null;
  desc: null;
  email: string;
  enable: boolean;
  name: string | null;
  password: string;
  phone: string | null;
  role: string;
  token: null;
  verificationCode: string | null;
  sendAt: string;
  sender: {
    email: string;
    name: string | null;
    // other properties as needed
  };
};
const ModelOption = (props): JSX.Element => {
  const modalData = useAppSelector((state) => state.general.modelData);
  const { visible, data } = modalData;
  const generator = new AvatarGenerator();

  console.log(data);

  const dispatch = useAppDispatch();

  const handleCancel = (value: boolean) => {
    console.log(visible, "he he ");
    dispatch(setModelData({ visible: false }));
  };

  const handleOk = () => {
    dispatch(setModelData({ visible: false }));
  };

  const handleAcceptRequestFriend = (id: number) => {
    dispatch(requestAcceptFriend({ id: id }));
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={visible}
        onOk={handleOk}
        onCancel={() => {
          dispatch(setModelData({ visible: false }));
        }}
        footer={false}
      >
        <div className="w-full flex flex-col justify-center items-center">
          {data.length ? (
            <List
              className="w-full"
              dataSource={data}
              renderItem={(item: MyObjectType) => (
                <List.Item key={item.sender.email}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={generator.generateRandomAvatar(item.sender.email)}
                      />
                    }
                    title={item.sender.email}
                    description={item.sender.email}
                  />
                  <Button
                    type="primary"
                    ghost
                    className="mt-3 w-max"
                    onClick={() => handleAcceptRequestFriend(item.id)}
                  >
                    <MessageOutlined /> Accept
                  </Button>
                </List.Item>
              )}
            />
          ) : (
            <Card bordered={false}>
              <Avatar
                className="my-4 text-center"
                shape="square"
                size={160}
                src={generator.generateRandomAvatar(data.email)}
              />
              <div className="flex flex-col">
                <span className="text-base text-gray-600 font-medium leading-8">
                  {data.email}
                </span>
                <span className="text-xs font-normal text-gray-400 leading-6">
                  Frontend developer
                </span>
              </div>
              <Button type="primary" ghost className="mt-3 w-max">
                <MessageOutlined /> Messages
              </Button>
            </Card>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ModelOption;
