import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import ContentChat from "./Content/content";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import ModelAddGroup from "./Content/ModelAddGroup";
import AddFriend from "./Content/AddFriend";
import ModelAcceptFriend from "./Content/ModelAcceptFriend";
import Helper from "utils/Helper";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  UserOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Layout, Collapse, theme, Avatar, Input, Button } from "antd";
import logo from "../../assets/images/logo.png";
import "./style.css";
import {
  setModelData,
  setConfirmModal,
  setFormModal,
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
interface User {
  address: null;
  avatarUrl: null;
  birthday: null;
  desc: null;
  email: string;
  enable: boolean;
  name: null;
  password: string;
  phone: null;
  role: string;
  token: null;
  verificationCode: string;
  id: number;
}
const Home = (): JSX.Element => {
  const generator = new AvatarGenerator();
  const history = useHistory();
  const { Option } = Select;
  const { Search } = Input;
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const [collapsed, setCollapsed] = useState(false);
  const [listRomOfUser, setListRomOfUser] = useState<any>([]);
  const [listGroup, setListGroup] = useState<any>([]);
  const [rom, setRom] = useState<any>({});
  const [isAddFriend, setIsAddFriend] = useState<boolean>(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const profileUser = useAppSelector((state) => state.auth.profileUser) || {};
  const listUser = useAppSelector((state) => state.auth.listUser) || [];
  const listRoms = useAppSelector((state) => state.auth.listRoms) || [];
  const userSearch = useAppSelector((state) => state.auth.userSearch) || {};
  const listFriendRequest =
    useAppSelector((state) => state.auth.listFriendRequest) || [];

  const onChange = (key: string | string[]) => {};
  const openModel = (data: any) => {
    dispatch(setModelData({ visible: true, data }));
  };

  const showModelAcceptFriend = (data: any) => {
    dispatch(setFormModal({ visible: true, data }));
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
    const list: any = [];
    const listUsers: any = [];

    if (listRoms.length) {
      listRoms?.filter((item: any) => {
        if (item?.group) {
          return list.push(item);
        } else {
          return listUsers.push(item);
        }
      });
      setListGroup(list);
      setListRomOfUser(listUsers);
    }
  }, [listRoms]);

  useEffect(() => {
    dispatch(getAllRoom());
    dispatch(getProfile());
    dispatch(getListAddFriend());
    dispatch(getAllUser());
  }, [Helper.getAuthToken()]);

  // const onSearch = (search: string) => {
  //   if (search !== "") dispatch(searchUser(search));
  // };
  const selectUser = (value: string) => {
    history.push(`/home/${value}`);
    setIsAddFriend(true);
  };
  const getMessagesById = (id: number) => {
    setIsAddFriend(false);
    const rom = listRoms.find((rom: any) => rom.id === id);
    setRom(rom);
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
            onClick={() => showModelAcceptFriend(listFriendRequest)}
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
              {listGroup?.length &&
                listGroup?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="text-gray-400 py-2 items-center flex text-base w-full pl-2 hover:bg-indigo-700"
                      onClick={() => getMessagesById(item.id)}
                    >
                      {/* {item.public && <GlobalOutlined />}
                      {!item.public && <LockOutlined />} */}
                      <GlobalOutlined />
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
              {listRomOfUser.length &&
                listRomOfUser?.slice(0, 7)?.map((item: any, index: number) => {
                  return (
                    <div
                      className="text-gray-400 items-center flex py-2 text-base w-full pl-2 hover:bg-indigo-700"
                      onClick={() => getMessagesById(item?.id)}
                    >
                      <Avatar
                        src={generator.generateRandomAvatar(
                          Helper.getEmailUser(item.members, profileUser.email)
                        )}
                      />
                      <span className="ml-2 truncate">
                        {" "}
                        {Helper.getEmailUser(item.members, profileUser.email)}
                      </span>
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
                    listUser?.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item?.email}>
                          {item?.email}
                        </Option>
                      );
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
          {isAddFriend ? (
            <AddFriend />
          ) : (
            <ContentChat rom={rom} profileUser={profileUser} />
          )}
          <Editor />
          <ModelAddGroup listUser={listUser} />
          <ModelAcceptFriend />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
