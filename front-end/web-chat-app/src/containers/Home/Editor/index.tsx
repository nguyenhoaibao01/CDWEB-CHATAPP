import React, { useState } from "react";
import "./styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SendOutlined } from "@ant-design/icons";
import { getMessages } from "providers/MessengerProvider/slice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Editor(props: any) {
  const params: any = useParams();
  const idRoom = params.id;
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const sendMessages = () => {
    console.log(props.stompClient, "hi hi");
    console.log(params.id, "jjjjjkksksksk");
    if (props.stompClient) {
      var chatMessage = {
        sender: props.sender.email,
        content: text,
        replyId: "1",
        messageType: "MESSAGE",
        roomId: idRoom,
      };
      console.log(chatMessage);
      props.stompClient.send(
        `/app/chat/${idRoom}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
    setTimeout(() => {
      dispatch(getMessages(idRoom));
    }, 500);
    setText("");
  };
  console.log(props.stompClient, "hi hi");

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
