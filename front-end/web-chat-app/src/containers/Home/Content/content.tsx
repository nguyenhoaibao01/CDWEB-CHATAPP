import React, { useEffect, useState } from "react";
import { Avatar, List, Card, Dropdown, MenuProps, Space, message } from "antd";
import {
  CaretDownOutlined,
  UserAddOutlined,
  MessageOutlined,
  PushpinOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { setModelData } from "providers/GeneralProvider/slice";
import { useDispatch } from "react-redux";
import VirtualList from "rc-virtual-list";
import ModelProfile from "./ModelProfile";
import { AvatarGenerator } from "random-avatar-generator";
import {
  requestPinMessages,
  getMessages,
  requestUnPinMessages,
} from "providers/MessengerProvider/slice";
import Helper from "utils/Helper";
import { useAppSelector } from "store";
import moment from "moment";
import "../style.css";
import { useParams } from "react-router-dom";

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
  const params: any = useParams();
  const idRoom = params.id;
  const generator = new AvatarGenerator();
  const [data, setData] = useState<UserItem[]>([]);
  const [showListPin, setShowListPin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [dataRom, setDataRom] = useState<UserItem[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [idShowAction, setIdShowAction] = useState<string>("");
  const listMessages =
    useAppSelector((state) => state.messages.listMessages) || [];
  const dispatch = useDispatch();
  const statusPin = useAppSelector((state) => state.messages.statusPin) || "";
  const [listPin, setListPin] = useState<any>([]);
  useEffect(() => {
    const list = listMessages.filter((item: any) => {
      return item.pin === true;
    });
    setListPin(list);
  }, [listMessages]);

  useEffect(() => {
    setEmail(props.profileUser.email);
  }, []);

  useEffect(() => {
    if (statusPin === "Pinned") {
      console.log("he he");
      dispatch(getMessages(idRoom));
      const list = listMessages.filter((item: any) => {
        return item.pin === true;
      });
      setListPin(list);
    }
  }, [statusPin]);

  // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  //   if (
  //     e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
  //     ContainerHeight
  //   ) {
  //   }
  // };
  const openProfile = (data: any) => {
    dispatch(setModelData({ visible: true, data }));
  };
  const handleShow = (item: any) => {
    setIdShowAction(item.id);
    setIsShow(true);
  };

  const handlePin = () => {
    setShowListPin(!showListPin);
  };
  const handlePinMessages = (idMessages: any) => {
    if (listPin?.length < 7) {
      dispatch(
        requestPinMessages({ romId: idRoom, id: idMessages.id, pin: true })
      );
    } else {
      message.warning(
        "The list of pinned messages exceeds the limit of pinned messages. Please remove the pinned message from the list."
      );
    }
  };
  const handleUnpin = (messagePin: any) => {
    setShowListPin(false);
    dispatch(
      requestUnPinMessages({ romId: idRoom, id: messagePin.id, pin: false })
    );
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
          {listPin?.length} pinned
        </span>
        <div className="px-3">
          {showListPin && (
            <Card className="absolute z-50 w-9/12">
              <List
                size="small"
                dataSource={listPin}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={generator.generateRandomAvatar(
                            item?.sender?.email
                          )}
                        />
                      }
                      title={<a>{item?.sender?.email}</a>}
                      description={`${item?.content}`}
                    />
                    <button onClick={() => handleUnpin(item)}>
                      <CloseOutlined />
                    </button>
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
            // onScroll={onScroll}
          >
            {(item: any) => (
              <List.Item
                className={
                  item.pin === true ? "relative bg-orange-100" : "relative"
                }
                id={item.id}
                key={item?.email}
                // onMouseOut={() => handleShow(item)}
                onMouseOver={() => handleShow(item)}
                onMouseLeave={() => setIsShow(false)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={generator.generateRandomAvatar(item?.sender?.email)}
                    />
                  }
                  title={<a>{item?.sender?.email}</a>}
                  description={`${item?.content}`}
                />
                <p className="text-xs text-gray-400">
                  {moment(item.sendAt).format("hh:mm A - MM/DD/YYYY")}
                </p>
                {isShow && idShowAction === item.id && (
                  <div className="absolute z-50 right-5 top-2">
                    <Card className="w-full px-0 " bordered={false}>
                      <ul className="w-full px-0">
                        {item.pin ? (
                          <button
                            onClick={() => handleUnpin(item)}
                            className="py-1 w-full text-base font-medium text-blue-500 hover:text-blue-900 hover:bg-slate-100"
                          >
                            <PushpinOutlined className="mx-2" />
                            Unpin message
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePinMessages(item)}
                            className="py-1 w-full text-base font-medium text-blue-500 hover:text-blue-900 hover:bg-slate-100"
                          >
                            <PushpinOutlined className="mx-2" />
                            Pin message
                          </button>
                        )}
                        <li className="py-1 w-full text-base font-medium text-purple-400 hover:text-purple-700 hover:bg-slate-100">
                          <EditOutlined className="mx-2" />
                          Edit message
                        </li>
                        <li className="py-1 w-full text-base font-mediu text-red-500 hover:text-red-700 hover:bg-slate-100">
                          <DeleteOutlined className="mx-2" />
                          Delete message
                        </li>
                      </ul>
                    </Card>
                  </div>
                )}
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
      <ModelProfile profile={props.profileUser} />
    </div>
  );
};

export default Content;
