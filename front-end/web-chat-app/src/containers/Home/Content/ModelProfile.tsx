import {
  Button,
  Form,
  Input,
  Modal,
  InputNumber,
  message,
  Card,
  Avatar,
} from "antd";
import { useEffect, useState } from "react";
import { AntDesignOutlined, MessageOutlined } from "@ant-design/icons";
import avatar from "../../../assets/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "store";
import { setModelData, resetModelData } from "providers/GeneralProvider/slice";

const ModelOption = (props): JSX.Element => {
  const modalData = useAppSelector((state) => state.general.modelData);
  const { visible, data } = modalData;

  const dispatch = useAppDispatch();

  const handleCancel = (value: boolean) => {
    console.log(visible, "he he ");
    dispatch(setModelData({ visible: false }));
  };

  const handleOk = () => {
    dispatch(setModelData({ visible: false }));
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
          <Card style={{ width: 240 }} bordered={false}>
            <Avatar
              className="my-4 text-center"
              shape="square"
              size={120}
              src={avatar}
              style={{ backgroundColor: "yellow" }}
            />
            <div className="flex flex-col">
              <span className="text-base text-gray-600 font-medium leading-8">
                Thi Nhi (Daisy Nhi)
              </span>
              <span className="text-xs font-normal text-gray-400 leading-6">
                Frontend developer
              </span>
            </div>
          </Card>
          <Button type="primary" ghost className="mt-3 w-1/3">
            <MessageOutlined /> Messgaes
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ModelOption;
