import { ConfigProvider, message } from "antd";
import "./App.css";
import Routers from "./routers/Routers";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

message.config({
  top: 30,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
          components: {},
        }}
      >
        <Provider store={store}>
          <Routers />
        </Provider>
      </ConfigProvider>
      <ToastContainer />
    </>
  );
}

export default App;
