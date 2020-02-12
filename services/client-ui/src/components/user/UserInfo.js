import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Statistic, Divider } from 'antd';

import UserUploads from './UserUploads';


function UserStatistics() {
  const { _id, extId, reseller, storageUsage, storageSize } = useSelector(
    state => state.userInfo
  );

  
  
  const MBSize = 1024 * 1024;

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
            value={`${storageUsage} / ${Math.floor(storageSize/MBSize)}Mb`}
          />
        </Col>
      </Row>
      <Divider />
      
      <UserUploads />
    </div>
  );
}

export default UserStatistics;
