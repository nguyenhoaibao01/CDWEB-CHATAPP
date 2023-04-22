import React, { useState } from "react";
import Editor from "./Editor";
import ContentChat from "./Content/content";
import { useDispatch } from "react-redux";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Layout, Collapse, theme, Avatar, Input } from "antd";
import logo from "../../assets/images/logo.png";
import "./style.css";
import { setModelData } from "providers/GeneralProvider/slice";

const { Header, Sider, Content } = Layout;

const Home = (): JSX.Element => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const listUser = [
    {
      id: "001",
      name: "Daisy Thi",
      color: "yellow",
    },
    {
      id: "002",
      name: "Daisy Thi",
      color: "purple",
    },
    {
      id: "003",
      name: "Daisy Thi",
      color: "cyan",
    },
    {
      id: "004",
      name: "Daisy Thi",
      color: "blue",
    },
  ];
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
  const openProfile = (data: any) => {
    console.log("cjcj");

    dispatch(setModelData({ visible: true, data }));
  };
  return (
    <Layout>
      {!collapsed && (
        <Sider trigger={null} collapsible>
          <div className="logo w-full flex flex-col pb-2 justify-center items-center text-zinc-300">
            <img className="mt-2" src={logo} />
            <div className="w-10/12 mt-1 bg-violet-700 h-[1px]"></div>
          </div>
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
            </Panel>
            <Panel showArrow={false} header="Direct Messages" key="2">
              {listUser.length &&
                listUser.map((item: any, index: number) => {
                  return (
                    <div className="text-gray-400 items-center flex py-2 text-base w-full pl-2 hover:bg-indigo-700">
                      <Avatar style={{ backgroundColor: `${item.color}` }}>
                        {" "}
                        {item?.name.slice(0, 2)}
                      </Avatar>
                      <span className="ml-2"> {item?.name}</span>
                    </div>
                  );
                })}
            </Panel>
          </Collapse>
        </Sider>
      )}
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="w-full flex justify-between">
            <div>
              {React.createElement(
                collapsed ? CaretRightOutlined : CaretLeftOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              {/* <Search placeholder="input search text" style={{ width: 200 }} /> */}
            </div>
            <div className="px-4" onClick={openProfile}>
              <Avatar style={{ backgroundColor: "red" }}> TN</Avatar>
              {/* <span className="mr-2  text-base"> Daisy Nhi</span> */}
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ContentChat />
          <Editor />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;