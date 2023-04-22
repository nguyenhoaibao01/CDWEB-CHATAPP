import React, { useState } from "react";
import "./styles.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div className="App">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          id="header"
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}