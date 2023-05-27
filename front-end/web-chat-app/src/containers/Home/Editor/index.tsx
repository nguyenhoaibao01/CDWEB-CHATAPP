import React, { useState } from "react";
import "./styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SendOutlined } from "@ant-design/icons";
import { getMessages } from "providers/MessengerProvider/slice";
import { useDispatch } from "react-redux";

export default function Editor(props: any) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const sendMessages = () => {
    console.log(props.stompClient, "hi hi");
    console.log(props.rom);
    if (props.stompClient) {
      var chatMessage = {
        sender: props.sender.email,
        content: text,
        replyId: "1",
        messageType: "MESSAGE",
        roomId: props.rom.id,
      };
      console.log(chatMessage);
      props.stompClient.send(
        `/app/chat/${props.rom.id}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
    dispatch(getMessages(props.rom.id));
    setText("");
  };

  return (
    <div className="App h-full mt-auto">
      <div className="editor w-full mt-auto">
        <CKEditor
          editor={ClassicEditor}
          id="header"
          data={text}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onKeyPress={sendMessages}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
        <div className="absolute right-6 bottom-6" onClick={sendMessages}>
          <SendOutlined />
        </div>
      </div>
    </div>
  );
}
