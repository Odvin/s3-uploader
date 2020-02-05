import React from 'react';

import { Layout } from 'antd';

import Routs from '../../Routs';
import Navigation from './Navigation';


import './skeleton.scss';

const { Header, Content, Footer } = Layout;

function Skeleton(props) {
  return (
    <Layout>
      <Navigation />
      <Layout style={{height: '100vh'}}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <Routs />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          S3 Files Uploader
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Skeleton;
