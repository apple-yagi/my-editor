import { MyEditor } from "./MyEditor";
import "@/styles/reset.css";
import "@/styles/global.css";
import { css } from "@emotion/react";

const App = () => {
  return (
    <div
      css={css`
        margin: auto;
        padding: 16px;
        max-width: 750px;
        min-height: 100vh;
        background-color: #eee;
      `}
    >
      <MyEditor />
    </div>
  );
};

export default App;
