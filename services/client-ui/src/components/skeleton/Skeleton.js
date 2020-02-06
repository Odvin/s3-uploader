import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import Routs from '../../Routs';
import Navigation from './Navigation';

import './skeleton.scss';

const { Header, Footer } = Layout;

function Skeleton(props) {
  return (
    <Layout>
      <Router>
        <Navigation />
        <Layout style={{ height: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Routs />
          <Footer style={{ textAlign: 'center' }}>S3 Files Uploader</Footer>
        </Layout>
      </Router>
    </Layout>
  );
}

export default Skeleton;
