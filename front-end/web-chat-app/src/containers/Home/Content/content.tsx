import React, { useEffect, useState } from "react";
import { Avatar, List, Button } from "antd";
import { CaretDownOutlined, UserAddOutlined } from "@ant-design/icons";
import { setModelData } from "providers/GeneralProvider/slice";
import { useDispatch } from "react-redux";
import VirtualList from "rc-virtual-list";
import ModelProfile from "./ModelProfile";
import { AvatarGenerator } from "random-avatar-generator";
import { requestAddFriend } from "providers/AuthProvider/slice";
import Helper from "utils/Helper";

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
const ContainerHeight = 400;

const Content = (props: any): JSX.Element => {
  const generator = new AvatarGenerator();
  const [data, setData] = useState<UserItem[]>([]);
  const [email, setEmail] = useState<string>("");

  const [dataRom, setDataRom] = useState<UserItem[]>([]);

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

  return (
    <div className="w-full h-[80vh]">
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
              {Helper.getEmailUser(props.rom.members, email) }
            </span>
          )}
          <CaretDownOutlined />
        </div>
      </div>
      <div className="px-8">
        <List >
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={50}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item: UserItem) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={generator.generateRandomAvatar()} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
      <ModelProfile profile={props.profileUser}/>
    </div>
  );
};

export default Content;
