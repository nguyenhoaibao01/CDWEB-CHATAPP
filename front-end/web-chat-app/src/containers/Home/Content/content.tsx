import React, { useEffect, useState } from "react";
import { Avatar, List, message } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { setModelData } from "providers/GeneralProvider/slice";
// import { useAppSelector } from "store";
import { useDispatch } from "react-redux";
import VirtualList from "rc-virtual-list";
import ModelProfile from "./ModelProfile";

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

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const Content = (): JSX.Element => {
  const [data, setData] = useState<UserItem[]>([]);
const dispatch = useDispatch();

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
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
  const openProfile = () => {
    dispatch(setModelData({ visible: true, data }));
  };
  return (
    <div className="w-full h-[80vh]">
      <div
        className="border-b border-slate-400 py-3 w-full flex items-center"
        onClick={openProfile}
      >
        <Avatar style={{ backgroundColor: "red", marginLeft: "8px" }}>
          {" "}
          TN
        </Avatar>
        <span className="mx-2  text-lg leading-8 font-medium"> Daisy Nhi</span>
        <CaretDownOutlined />
      </div>
      <div className="px-8">
        <List>
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
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
      <ModelProfile />
    </div>
  );
};

export default Content;
