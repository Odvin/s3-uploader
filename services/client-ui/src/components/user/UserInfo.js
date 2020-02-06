import React from 'react';

import { Row, Col, Statistic, Button } from 'antd';

import UploadCases from './UploadCases';

function UserStatistics(props) {
  const { _id, extId, reseller, storageUsage, storageSize, cases } =
    props.userQuota || {};

  return (
    <div>
      <Row gutter={16}>
        <Col span={15}>
          <Statistic title='Internal UserID' value={_id} />
          <Statistic title='External UserID' value={extId} />
        </Col>
        <Col span={8}>
          <Statistic title='User Reseller' value={reseller} />
          <Statistic title='Storage Usage / Size' value={`${storageUsage} / ${storageSize}`} />
        </Col>
      </Row>
      <UploadCases cases={cases} />

      <Button block icon='file-add'>
        Add New Case
      </Button>
    </div>
  );
}

export default UserStatistics;
