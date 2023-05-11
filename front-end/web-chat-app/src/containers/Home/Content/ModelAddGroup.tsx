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
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import avatar from "../../../assets/images/avatar.jpg";
import { useAppDispatch, useAppSelector } from "store";
import {
  setConfirmModal,
  resetConfirmModal,
} from "providers/GeneralProvider/slice";
import { AvatarGenerator } from "random-avatar-generator";
import { requestAcceptFriend } from "providers/AuthProvider/slice";
const ModelAddGroup = (props: any): JSX.Element => {
  console.log(props.listUser);

  const modalData = useAppSelector((state) => state.general.confirmModal);
  const { visible, data } = modalData;
  console.log(visible);

  const generator = new AvatarGenerator();

  const dispatch = useAppDispatch();

  const handleCancel = (value: boolean) => {
    dispatch(setConfirmModal({ visible: false, data: {} }));
  };

  const handleOk = () => {
    dispatch(setConfirmModal({ visible: false, data: data }));
  };

  const handleAcceptRequestFriend = (id: number) => {
    dispatch(requestAcceptFriend({ id: id }));
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={visible}
        onOk={handleOk}
        onCancel={() => {
          dispatch(setConfirmModal({ visible: false, data: {} }));
        }}
        // footer={false}
      >
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Group Name"
            name="groupName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="List users"
            name="user"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={props.listUser}
            />
          </Form.Item>

          {/* <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default ModelAddGroup;
