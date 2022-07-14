import { Layout, Menu, Breadcrumb } from "antd";
import {
  SortAscendingOutlined,
  GlobalOutlined,
  UserOutlined,
  IdcardOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import React from "react";
import { withNavigation } from "../../hoc/withRouterForClass";
import { Route, Routes } from "react-router-dom";
import "./MainLayout.css";

const { Content, Footer, Sider } = Layout;

const keyToInfo = {
  main1: { text: "회원 관리", link: "/user/lookup" },
  main2: { text: "장소 지도", link: "/places/map" },
  main3: { text: "장소 관리", link: "/places/list" },
  main4: { text: "키워드 관리", link: "/keywords" },
  main5: { text: "계정", link: "/account" },
};

let clickedkeyPath = ["main1"];
for (let key in keyToInfo) {
  if (keyToInfo[key].link === window.location.pathname)
    clickedkeyPath = [`${key}`];
}

class MainLayout extends React.Component {
  state = {
    collapsed: false,
    clickedkeyPath: clickedkeyPath,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  menuClick = ({ item, key, keyPath, domEvent }) => {
    console.log(keyToInfo[key].link);
    this.props.navigate(keyToInfo[key].link);
    this.setState({ clickedkeyPath: keyPath.reverse() });
  };

  render() {
    const { collapsed, clickedkeyPath } = this.state;
    console.log(window.location.pathname);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // theme={"light"}
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            height: "%100",
            background: "black",
          }}
        >
          <div className="logo"> zetciti </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={clickedkeyPath}
            mode="inline"
            style={{
              // display: "flex",
              // flexDirection: "column",
              background: "black",

              marginTop: "auto 0",
              height: "%100",
            }}
            onClick={this.menuClick}
          >
            <Menu.Item key="main1" icon={<UserOutlined />}>
              회원 관리
            </Menu.Item>
            <Menu.Item key="main2" icon={<GlobalOutlined />}>
              장소 지도
            </Menu.Item>
            <Menu.Item key="main3" icon={<CompassOutlined />}>
              장소 관리
            </Menu.Item>
            <Menu.Item
              key="main4"
              icon={<SortAscendingOutlined />}
              style={{ marginTop: "auto" }}
            >
              키워드 관리
            </Menu.Item>
            <Menu.Item
              key="main5"
              icon={<IdcardOutlined />}
              style={{ marginTop: "auto" }}
            >
              계정
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {clickedkeyPath.map((e) => {
                return (
                  <Breadcrumb.Item key={keyToInfo[e].text}>
                    {keyToInfo[e].text}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Routes>
                {/* <Route
                  exact
                  path="/user/lookup"
                  element={<UserLookupMainPage />}
                />
                <Route exact path="/account" element={<AccoutPage />} />
                <Route exact path="/keywords" element={<KeywordsPage />} />
                <Route exact path="/places/map" element={<PlaceManagePage />} />
                <Route exact path="/places/list" element={<PlaceList />} /> */}
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            gosrock ©2022 Created by gosrock
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default withNavigation(MainLayout);
//dlkadjsfl
