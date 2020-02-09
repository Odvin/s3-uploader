import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navigation() {
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key='options'
          title={
            <span>
              <Icon type='control' />
              Options
            </span>
          }
        >
          <Menu.Item key='upload-cases'>
            <Link to='/upload-cases'>
              <Icon type='setting' />
              <span className='nav-text'>Upload cases</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key='users'
          title={
            <span>
              <Icon type='team' />
              Users
            </span>
          }
        >
          <Menu.Item key='userInfo'>
            <Link to='/user'>
              <Icon type='user' />
              <span className='nav-text'>User Info</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key='playground'
          title={
            <span>
              <Icon type='issues-close' />
              Playground
            </span>
          }
        >
          <Menu.Item key='fileUpload'>
            <Link to='/playground'>
              <Icon type='cloud-upload' />
              <span className='nav-text'>File Upload</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Navigation;
