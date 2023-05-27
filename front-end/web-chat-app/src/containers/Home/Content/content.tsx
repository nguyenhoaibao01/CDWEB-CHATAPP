import React, { useEffect, useState } from "react";
import { Avatar, List, Card, Dropdown, MenuProps, Space } from "antd";
import {
  CaretDownOutlined,
  UserAddOutlined,
  MessageOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { setModelData } from "providers/GeneralProvider/slice";
import { useDispatch } from "react-redux";
import VirtualList from "rc-virtual-list";
import ModelProfile from "./ModelProfile";
import { AvatarGenerator } from "random-avatar-generator";
import { requestAddFriend } from "providers/AuthProvider/slice";
import Helper from "utils/Helper";
import { useAppSelector } from "store";
import moment from "moment";
import "../style.css";

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
const ContainerHeight = 665;

const Content = (props: any): JSX.Element => {
  const generator = new AvatarGenerator();
  const [data, setData] = useState<UserItem[]>([]);
  const [showListPin, setShowListPin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [dataRom, setDataRom] = useState<UserItem[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const listMessages =
    useAppSelector((state) => state.messages.listMessages) || [];
  const dispatch = useDispatch();

  const appendData = () => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
  };
  useEffect(() => {
    setEmail(props.profileUser.email);
    appendData();
    console.log(listMessages);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  const openProfile = (data: any) => {
    dispatch(setModelData({ visible: true, data }));
  };
  const handleShow = (item: any) => {
    console.log(item);
    setIsShow(!isShow);
  };
  const items: MenuProps["items"] = [
    {
      label: "Pin Messages",
      key: "1",
    },
    {
      label: "Delete Messages",
      key: "2",
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
    } else {
      // localStorage.clear();
      // history.push("/login");
    }
  };
  const dataAAA = Array.from({ length: 10 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const handlePin = () => {
    setShowListPin(!showListPin);
  };
  return (
    <div className="w-full h-full content">
      <div className="py-3 px-5 flex justify-between items-center w-full border-b border-slate-400 ">
        <div
          className="w-max flex items-center"
          onClick={() => openProfile(props.rom)}
        >
          <Avatar
            src={generator.generateRandomAvatar(
              Helper.getEmailUser(props.rom.members, email)
            )}
          />
          {props.rom?.group ? (
            <span className="mx-2  text-lg leading-8 font-medium">
              {props.rom?.name}
            </span>
          ) : (
            <span className="mx-2  text-lg leading-8 font-medium">
              {Helper.getEmailUser(props.rom.members, email)}
            </span>
          )}
          <CaretDownOutlined />
        </div>
      </div>
      <div className="border-b border-gray-200 w-full py-2">
        <span className="px-5" onClick={handlePin}>
          <PushpinOutlined className="mx-2" />
          18 pinned
        </span>
        <div className="px-3">
          {showListPin && (
            <Card className="absolute z-50 w-9/12">
              <List
              
                size="small"
                dataSource={dataAAA}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </div>
      </div>
      <div className="px-8 ">
        <List>
          <VirtualList
            data={listMessages}
            height={ContainerHeight}
            itemHeight={80}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item: any) => (
              <Dropdown
                className="list-message"
                menu={{ items }}
                trigger={["click"]}
              >
                <List.Item
                  id={item.id}
                  key={item?.email}
                  onClick={() => handleShow(item)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={generator.generateRandomAvatar(item?.sender.email)}
                      />
                    }
                    title={<a>{item?.sender.email}</a>}
                    description={`${item?.content}`}
                  />
                  <p className="text-xs text-gray-400">
                    {moment(item.sendAt).format("hh:mm A - MM/DD/YYYY")}
                  </p>
                </List.Item>
              </Dropdown>
            )}
          </VirtualList>
        </List>
      </div>
      <ModelProfile profile={props.profileUser} />
    </div>
  );
};

export default Content;
