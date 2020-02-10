import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Breadcrumb, Menu } from 'antd';

import Routs from '../../Routs';
import Navigation from './Navigation';

import './skeleton.scss';

const { Header } = Layout;

function Skeleton(props) {
  return (
    <Layout>
      <Router>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='1'>S3-Upload</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Navigation />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>S3-Uploads</Breadcrumb.Item>
            </Breadcrumb>
            <Routs />
          </Layout>
        </Layout>
      </Router>
    </Layout>
  );
}

export default Skeleton;
