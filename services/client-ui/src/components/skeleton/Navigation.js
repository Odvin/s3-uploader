import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

function Navigation() {
  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className='logo' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
        <Menu.Item key='1'>
          <Link to='/user'>
            <Icon type='user' />
            <span className='nav-text'>nav 1</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Icon type='video-camera' />
          <span className='nav-text'>nav 2</span>
        </Menu.Item>
        <Menu.Item key='3'>
          <Icon type='upload' />
          <span className='nav-text'>nav 3</span>
        </Menu.Item>
        <Menu.Item key='playground'>
          <Link to='/playground'>
          <Icon type='issues-close' />
          <span className='nav-text'>Playground</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Navigation;
