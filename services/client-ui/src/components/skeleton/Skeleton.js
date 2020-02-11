import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Breadcrumb, Menu } from 'antd';

import Routs from '../../Routs';
import Navigation from './Navigation';

import { reqUploadCases } from '../../api';

import {
  setUploadCases,
} from '../../redux/actions/uploadCases';

import './skeleton.scss';

const { Header } = Layout;

// Init store


function Skeleton() {
  
  // ==== Init Store ====
  const dispatch = useDispatch();
  const { loaded } = useSelector(state => state.uploadCases);

  useEffect(() => {
    async function getUploadCases() {
      const cases = await reqUploadCases();
      dispatch(setUploadCases(cases));
    }

    if (!loaded) {
      getUploadCases();
    }
  }, [dispatch, loaded]);

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
