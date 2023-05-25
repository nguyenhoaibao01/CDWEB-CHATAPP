import React, { useState } from "react";
import "./styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SendOutlined } from "@ant-design/icons";
export default function Editor(props: any) {
  const [text, setText] = useState("");
  const sendMessages = () => {
    console.log(props.stompClient, "hi hi");
    console.log(props.sender);
    if (props.stompClient) {
      var chatMessage = {
        sender: props.sender.email,
        content: text,
        status:"MESSAGE",
        replyId:'',
        messageType:'',
        roomId:4
      };
      console.log(chatMessage);
      props.stompClient.send("http://localhost:8080/app/chat/4", {}, JSON.stringify(chatMessage));
      // setUserData({...userData,"content": ""});
    }
  };

  return (
    <div className="App">
      <div className="editor w-full">
        <CKEditor
          editor={ClassicEditor}
          id="header"
          data={text}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
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
