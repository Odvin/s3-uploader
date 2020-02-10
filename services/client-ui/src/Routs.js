import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import Dashboard from './components/dashboard/Dashboard';
import Playground from './components/playground/Playground';
import User from './components/user/User';
import UploadCases from './components/uploadCases/UploadCases';

const { Content } = Layout;

function Routs() {
  return (
    <Content
      style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <Route path='/' component={Dashboard} exact />
      <Route path='/upload-cases' component={UploadCases} exact />
      <Route path='/user' component={User} exact />
      <Route path='/playground' component={Playground} exact />
    </Content>
  );
}

export default Routs;
