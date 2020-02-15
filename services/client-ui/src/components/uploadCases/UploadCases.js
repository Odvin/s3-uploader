import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Icon, Button, notification, Modal } from 'antd';

import UploadCaseForm from './UploadCaseForm';

import { reqRemoveUploadCase } from '../../api';

import { removeUploadCase } from '../../redux/actions/uploadCases';

const MBSize = 1024 * 1024;

function Cases(props) {
  const { cases, editCase, removeCase } = props;

  return (
    <List
      dataSource={cases}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <span onClick={() => editCase(item._id)}>
              <Icon key='edit-case' type='edit' style={{ marginRight: 8 }} />
              edit
            </span>,
            <span onClick={() => removeCase(item._id)}>
              <Icon
                key='delete-case'
                type='delete'
                style={{ marginRight: 8 }}
              />
              delete
            </span>
          ]}
        >
          <List.Item.Meta
            title={item.name}
            description={`min: ${Math.floor(
              item.minSize / MBSize
            )} Mb; max: ${Math.floor(item.maxSize / MBSize)} Mb`}
          />
          {(item.mimes || []).join(';  ')}
        </List.Item>
      )}
    />
  );
}

function UploadCases(props) {
  const dispatch = useDispatch();
  const { cases = [] } = useSelector(state => state.uploadCases);

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [activeUploadCaseId, setActiveUploadCaseId] = useState(null);

  function editCase(caseId) {
    setActiveUploadCaseId(caseId);
    setIsEditorVisible(true);
  }

  function closeUploadCaseEditor() {
    setActiveUploadCaseId(null);
    setIsEditorVisible(false);
  }

  async function removeCase(caseId) {
    const { wasRemoved = false } = await reqRemoveUploadCase(caseId);
    if (wasRemoved) {
      dispatch(removeUploadCase(caseId));
    } else {
      notification.open({
        message: 'Cannot remove the case',
        description: `CaseId :: ${caseId}`,
        icon: <Icon type='warning' />
      });
    }
  }

  const activeUploadCase = activeUploadCaseId
    ? cases.find(c => c._id === activeUploadCaseId)
    : {
        _id: null,
        name: null,
        mimes: [],
        minSize: 1048576,
        maxSize: 10485760
      };

  return (
    <>
      <Cases cases={cases} editCase={editCase} removeCase={removeCase} />
      <Button block icon='file-add' onClick={() => editCase(null)}>
        Add New Upload Case
      </Button>

      <Modal
        visible={isEditorVisible}
        title='Upload Case Editor'
        onCancel={closeUploadCaseEditor}
        footer={null}
      >
        {isEditorVisible && (
          <UploadCaseForm
            activeUploadCase={activeUploadCase}
            closeUploadCaseEditor={closeUploadCaseEditor}
          />
        )}
      </Modal>
    </>
  );
}

export default UploadCases;
