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
import { requestCreateGroup } from "providers/AuthProvider/slice";
const ModelAddGroup = (props: any): JSX.Element => {
  console.log(props.listUser);
  const { Option } = Select;
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

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleSubmit = (value: any) => {
    console.log(value);
    dispatch(requestCreateGroup(value));

  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={visible}
        // onOk={handleOk}
        onCancel={() => {
          dispatch(setConfirmModal({ visible: false, data: {} }));
        }}
        footer={false}
      >
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Group Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="List users"
            name="members"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              mode="multiple"
              placeholder="Search and Select User"
              // onSearch={debounce(onSearch, 1000)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props.children
                  ?.toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChange}
              style={{ maxWidth: 600 }}
            >
              {props.listUser.length &&
                props.listUser?.map((item: any) => {
                  return <Option value={item?.email}>{item?.email}</Option>;
                })}
            </Select>
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModelAddGroup;
