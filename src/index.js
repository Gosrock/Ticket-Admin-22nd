import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// pages
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import history from "./history";
import "antd/dist/antd.min.css";
import App from "./App";
import requireAuth from "./hoc/requireAuth";
import AuthPass from "./hoc/AuthPass";

// antd css file
import "antd/dist/antd.less";
import { store } from "./state/storeSetting";
import "./config/axiosInstance";
import Auth from "./components/AuthPage/Auth";

const AppWithLogin = requireAuth(App);
const AuthWithPassHOC = AuthPass(Auth);

const container = document.getElementById("root");

// 루트 생성
const root = ReactDOM.createRoot(container);

root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <Routes>
        <Route exact path="/auth/*" element={<AuthWithPassHOC />} />
        <Route path="/*" element={<AppWithLogin />} />
      </Routes>
    </Provider>
  </HistoryRouter>
);
