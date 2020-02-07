import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import Dashboard from './components/dashboard/Dashboard';
import Playground from './components/playground/Playground';
import User from './components/user/User';

const { Content } = Layout;

function Routs() {
  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <Route path='/' component={Dashboard} exact />
      <Route path='/user' component={User} exact />
      <Route path='/playground' component={Playground} exact />
    </Content>
  );
}

export default Routs;
