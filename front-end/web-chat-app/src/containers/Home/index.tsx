import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import ContentChat from "./Content/content";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import ModelAddGroup from "./Content/ModelAddGroup"
import Helper from "utils/Helper";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  LockOutlined,
  UserOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Layout, Collapse, theme, Avatar, Input, Button } from "antd";
import logo from "../../assets/images/logo.png";
import "./style.css";
import {
  setModelData,
  setConfirmModal,
  resetConfirmModal,
} from "providers/GeneralProvider/slice";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import {
  getProfile,
  searchUser,
  getListAddFriend,
  getAllUser,
  getAllRoom,
} from "providers/AuthProvider/slice";
import { useAppSelector } from "store";
import { debounce } from "lodash";
import { Select } from "antd";
const { Header, Sider, Content } = Layout;
const Home = (): JSX.Element => {
  const generator = new AvatarGenerator();
  const history = useHistory();
  const { Option } = Select;
  const profileUser = useAppSelector((state) => state.auth.profileUser) || {};
  const listUser = useAppSelector((state) => state.auth.listUser) || [];
  const userSearch = useAppSelector((state) => state.auth.userSearch) || {};
  const listFriendRequest =
    useAppSelector((state) => state.auth.listFriendRequest) || [];
  const { Search } = Input;
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onChange = (key: string | string[]) => {};
  const listGroup = [
    {
      id: "group001",
      name: "DH19DTA",
      public: true,
    },
    {
      id: "group002",
      name: "DH19DTB",
      public: false,
    },
    {
      id: "group003",
      name: "DH19DTC",
      public: true,
    },
  ];
  const openModel = (data: any) => {
    dispatch(setModelData({ visible: true, data }));
  };

  const openModelGroup = (data: any) => {
    dispatch(setConfirmModal({ visible: true, data: data }));
  };
  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "1",
    },
    {
      label: "Logout",
      key: "2",
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      openModel(profileUser);
    } else {
      localStorage.clear();
      history.push("/login");
    }
  };
  useEffect(() => {
    if (!Helper.getAuthToken()) {
      history.push("/login");
      window.location.reload();
    }
  }, []);
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getListAddFriend());
    dispatch(getAllUser());
    dispatch(getAllRoom());
  }, [Helper.getAuthToken()]);

  // const onSearch = (search: string) => {
  //   if (search !== "") dispatch(searchUser(search));
  // };
  const selectUser = (value: string) => {
    history.push(`/home/${value}`);
  };
  const getMessagesById = (id: string) => {
    history.push(`/home/${id}`);
  };
  return (
    <Layout>
      {!collapsed && (
        <Sider trigger={null} collapsible width={300}>
          <div className="logo w-full flex flex-col pb-2 justify-center items-center text-zinc-300">
            <img className="mt-2" src={logo} alt="Logo chat" />
            <div className="w-10/12 mt-1 bg-violet-700 h-[1px]"></div>
          </div>
          <Button
            type="link"
            className="mt-3 w-max flex items-center"
            onClick={() => openModel(listFriendRequest)}
          >
            <UserOutlined />
            Friend Request list
          </Button>
          <Collapse
            defaultActiveKey={["1", "2"]}
            onChange={onChange}
            bordered={false}
            className="w-11/12"
          >
            <Panel showArrow={false} header="Chat Group" key="1">
              {listGroup.length &&
                listGroup.map((item: any, index: number) => {
                  return (
                    <div className="text-gray-400 py-2 items-center flex text-base w-full pl-2 hover:bg-indigo-700">
                      {item.public && <GlobalOutlined />}
                      {!item.public && <LockOutlined />}
                      <span className="ml-2"> {item?.name}</span>
                    </div>
                  );
                })}
              <div
                className="text-gray-400 py-2 items-center flex text-base w-full pl-2 hover:bg-indigo-700"
                onClick={() => openModelGroup({})}
              >
                <PlusSquareOutlined />{" "}
                <span className="ml-2"> Add new group</span>
              </div>
            </Panel>
            <Panel showArrow={false} header="Direct Messages" key="2">
              {listUser.length &&
                listUser?.slice(0, 7)?.map((item: any, index: number) => {
                  return (
                    <div
                      className="text-gray-400 items-center flex py-2 text-base w-full pl-2 hover:bg-indigo-700"
                      onClick={() => getMessagesById(item.email)}
                    >
                      <Avatar
                        src={generator.generateRandomAvatar(item.email)}
                      />
                      <span className="ml-2 truncate"> {item?.email}</span>
                    </div>
                  );
                })}
            </Panel>
          </Collapse>
        </Sider>
      )}
      <Layout className="site-layout h-full">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="w-full h-full flex justify-between item-center">
            <div className="flex justify-start item-center w-full gap-4">
              {React.createElement(
                collapsed ? CaretRightOutlined : CaretLeftOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <div className="w-full flex items-center h-full">
                <Select
                  showArrow={false}
                  showSearch
                  placeholder="Search and Select User"
                  // onSearch={debounce(onSearch, 1000)}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.props.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={selectUser}
                >
                  {listUser.length &&
                    listUser?.map((item: any) => {
                      return <Option value={item?.email}>{item?.email}</Option>;
                    })}
                </Select>
              </div>
            </div>
            <div className="px-4">
              <Dropdown menu={{ items, onClick }}>
                <a>
                  <Space>
                    <Avatar
                      src={generator.generateRandomAvatar(profileUser?.email)}
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          className="h-full"
          style={{
            margin: "16px 16px",
            background: colorBgContainer,
          }}
        >
          <ContentChat />
          <Editor />
        <ModelAddGroup listUser={listUser}/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
