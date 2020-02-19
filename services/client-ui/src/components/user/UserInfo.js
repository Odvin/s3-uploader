import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Statistic, Divider } from 'antd';

import UserUploads from './UserUploads';

import { sizeDescription } from '../utility';

function UserStatistics() {
  const { _id, extId, reseller, storageUsage, storageSize } = useSelector(
    state => state.userInfo
  );

  return (
    <div>
      <Divider>User Info </Divider>
      <Row gutter={14}>
        <Col span={15}>
          <Statistic title='Internal UserID' value={_id} />
          <Statistic title='External UserID' value={extId} />
        </Col>
        <Col span={8}>
          <Statistic title='User Reseller' value={reseller} />
          <Statistic
            title='Storage Usage / Size'
            value={`${sizeDescription(storageUsage)} / ${sizeDescription(storageSize)}`}
          />
        </Col>
      </Row>
      <Divider />
      
      <UserUploads />
    </div>
  );
}

export default UserStatistics;
