import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Editor from "./Editor";
import ContentChat from "./Content/content";
import ModelAddGroup from "./Content/ModelAddGroup";
import AddFriend from "./Content/AddFriend";
import ModelAcceptFriend from "./Content/ModelAcceptFriend";
import Helper from "utils/Helper";
import fetchApi from "utils/fetchApi";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  UserOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Collapse,
  theme,
  Avatar,
  Input,
  Button,
  Dropdown,
  Space,
  Select,
  MenuProps,
} from "antd";
import logo from "../../assets/images/logo.png";
import "./style.css";
import {
  setModelData,
  setConfirmModal,
  setFormModal,
} from "providers/GeneralProvider/slice";
import {
  getProfile,
  searchUser,
  getListAddFriend,
  getAllUser,
  getAllRoom,
} from "providers/AuthProvider/slice";
import { getMessages } from "providers/MessengerProvider/slice";
import { useAppSelector } from "store";
import { debounce } from "lodash";
import { log } from "console";
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
  let stompClient: any = null;
  const generator = new AvatarGenerator();
  const history = useHistory();
  const { Option } = Select;
  const { Search } = Input;
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const [connected, setConnected] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [listRomOfUser, setListRomOfUser] = useState<any>([]);
  const [listGroup, setListGroup] = useState<any>([]);
  const [rom, setRom] = useState<any>({});
  const [isAddFriend, setIsAddFriend] = useState<boolean>(false);
  const [privateChats, setPrivateChats] = useState(new Map());
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
  useEffect(() => {
    setTimeout(() => registerSocket(), 1000);
    console.log(rom.id)
    dispatch(getMessages(rom.id));
  }, [rom.id]);

  const selectUser = (value: string) => {
    history.push(`/home/${value}`);
    setIsAddFriend(true);
  };
  const getMessagesById = (id: number) => {
    setIsAddFriend(false);
    const rom = listRoms.find((rom: any) => rom.id === id);
    setRom(rom);
    dispatch(getMessages(rom?.id));
    history.push(`/home/${id}`);
  };

  const registerSocket = () => {
    console.log("he he");
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log(stompClient.connected, "iiii");
    stompClient.subscribe(
      `http://localhost:8080/room/${rom.id}`,
      onChatMessages
    );
    setConnected(stompClient);
    userJoin();
  };

  const onError = (err: any) => {
    console.log(err);
  };
  const onChatMessages = (payload: any) => {
    console.log(payload);
    // var payloadData = JSON.parse(payload.body);
    // if(privateChats.get(payloadData.senderName)){
    //     privateChats.get(payloadData.senderName).push(payloadData);
    //     setPrivateChats(new Map(privateChats));
    // }else{
    //     let list =[];
    //     list.push(payloadData);
    //     privateChats.set(payloadData.senderName,list);
    //     setPrivateChats(new Map(privateChats));
    // }
  };
  const userJoin = () => {
    console.log("hhh");
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
          {/* <div className="send-message">
            <input
              type="text"
              className="input-message"
              placeholder="enter the message"
              value={userData.message}
              onChange={handleMessage}
            />
            <button
              type="button"
              className="send-button"
              onClick={sendPrivateValue}
            >
              send
            </button>
          </div> */}
          <Editor stompClient={connected} sender={profileUser} />
          <ModelAddGroup listUser={listUser} />
          <ModelAcceptFriend />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
