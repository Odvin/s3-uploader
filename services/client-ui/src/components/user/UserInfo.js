import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Statistic, Button } from 'antd';

import UploadCases from './UploadCases';
import CaseEditor from './CaseEditor';

import { showCaseEditor, selectUseCaseId } from '../../redux/actions/userQuota';

function UserStatistics() {
  const dispatch = useDispatch();

  const { _id, extId, reseller, storageUsage, storageSize } = useSelector(
    state => state.userQuota
  );
  
  function editCase(caseId) {
    dispatch(showCaseEditor(true));
    dispatch(selectUseCaseId(caseId));
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={15}>
          <Statistic title='Internal UserID' value={_id} />
          <Statistic title='External UserID' value={extId} />
        </Col>
        <Col span={8}>
          <Statistic title='User Reseller' value={reseller} />
          <Statistic
            title='Storage Usage / Size'
            value={`${storageUsage} / ${storageSize}`}
          />
        </Col>
      </Row>
      <UploadCases editCase={editCase} />

      <Button block icon='file-add' onClick={() => editCase(null)}>
        Add New Case
      </Button>

      <CaseEditor />
    </div>
  );
}

export default UserStatistics;
