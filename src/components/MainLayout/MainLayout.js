import { Layout, Menu, Breadcrumb } from 'antd';
import {
  SortAscendingOutlined,
  UserOutlined,
  IdcardOutlined,
  PieChartOutlined,
  ScanOutlined,
  ExperimentOutlined,
  LoadingOutlined,
  BookOutlined
} from '@ant-design/icons';
import React from 'react';
import { withNavigation } from '../../hoc/withRouterForClass';
import { Route, Routes } from 'react-router-dom';
import './MainLayout.css';
import LandingPage from '../LandingPage/LandingPage';
import UsersPage from '../Tables/UsersPage/UsersPage';
import TicketsPage from '../Tables/TicketsPage/TicketsPage';
import OrdersPage from '../Tables/OrdersPage/OrdersPage';
import EnterPage from '../Tickets/EnterPage/EnterPage';
import CheckPage from '../Tickets/CheckPage/CheckPage';
import CheckEnterPage from '../Tickets/CheckPage/CheckEnterPage';
import AccoutPage from '../AccountPage/AccoutPage';

import CommentRandomPage from '../CommentRandomPage/CommentRandomPage';

const { Content, Footer, Sider } = Layout;

const keyToInfo = {
  main1: { text: '랜딩 페이지', link: '/landing' },
  main2: { text: '유저 페이지', link: '/table/users' },
  main3: { text: '주문목록 페이지', link: '/table/orders' },
  main4: { text: '티켓 페이지', link: '/table/tickets' },
  main5: { text: '실시간 티켓 입장확인', link: '/tickets/enter' },
  main6: { text: '카메라 입장 확인', link: '/tickets/checkenter' },
  main7: { text: '계정', link: '/accounts' },
  // main8: { text: '예시페이지네이션', link: '/example' },
  main9: { text: '댓글 추첨', link: '/comment/random' }
};

let clickedkeyPath = ['main1'];
for (let key in keyToInfo) {
  if (keyToInfo[key].link === window.location.pathname)
    clickedkeyPath = [`${key}`];
}

class MainLayout extends React.Component {
  state = {
    collapsed: false,
    clickedkeyPath: clickedkeyPath
  };

  onCollapse = collapsed => {
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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          // theme={"light"}
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '%100',
            background: 'black'
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
              background: 'black',

              marginTop: 'auto 0',
              height: '%100'
            }}
            onClick={this.menuClick}
          >
            <Menu.Item key="main1" icon={<PieChartOutlined />}>
              {keyToInfo['main1'].text}
            </Menu.Item>
            <Menu.Item key="main2" icon={<UserOutlined />}>
              {keyToInfo['main2'].text}
            </Menu.Item>
            <Menu.Item key="main3" icon={<BookOutlined />}>
              {keyToInfo['main3'].text}
            </Menu.Item>
            <Menu.Item
              key="main4"
              icon={<SortAscendingOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main4'].text}
            </Menu.Item>
            <Menu.Item
              key="main5"
              icon={<LoadingOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main5'].text}
            </Menu.Item>
            <Menu.Item
              key="main6"
              icon={<ScanOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main6'].text}
            </Menu.Item>
            <Menu.Item
              key="main7"
              icon={<IdcardOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main7'].text}
            </Menu.Item>
            {/* <Menu.Item
              key="main8"
              icon={<IdcardOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main8'].text}
            </Menu.Item> */}
            <Menu.Item
              key="main9"
              icon={<ExperimentOutlined />}
              style={{ marginTop: 'auto' }}
            >
              {keyToInfo['main9'].text}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {clickedkeyPath.map(e => {
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
                <Route exact path="/landing" element={<LandingPage />} />
                <Route exact path="/table/users" element={<UsersPage />} />
                <Route exact path="/table/orders" element={<OrdersPage />} />
                <Route exact path="/table/tickets" element={<TicketsPage />} />
                <Route exact path="/tickets/enter" element={<EnterPage />} />
                <Route exact path="/accounts" element={<AccoutPage />} />
                <Route
                  exact
                  path="tickets/checkenter"
                  element={<CheckEnterPage />}
                />
                <Route
                  exact
                  path="/comment/random"
                  element={<CommentRandomPage />}
                />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            gosrock ©2022 Created by gosrock
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default withNavigation(MainLayout);
//dlkadjsfl
