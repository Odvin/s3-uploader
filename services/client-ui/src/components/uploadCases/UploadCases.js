import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Icon, Button, notification } from 'antd';

import UploadCasesEditor from './UploadCaseEditor';

import { reqUploadCases, reqRemoveUploadCase } from '../../api';

import {
  setUploadCases,
  consumeUploadCaseEditor,
  selectUploadCaseId,
  removeUploadCase
} from '../../redux/actions/uploadCases';

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
            description={`min: ${item.minSize}; max: ${item.maxSize} (bits)`}
          />
          {(item.mimes || []).join(';  ')}
        </List.Item>
      )}
    />
  );
}

function UploadCases(props) {
  const dispatch = useDispatch();
  const { cases = [], loaded } = useSelector(state => state.uploadCases);

  useEffect(() => {
    async function getUploadCases() {
      const cases = await reqUploadCases();
      dispatch(setUploadCases(cases));
    }

    if (!loaded) {
      getUploadCases();
    }
  }, []);

  function editCase(caseId) {
    dispatch(consumeUploadCaseEditor(true));
    dispatch(selectUploadCaseId(caseId));
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

  return (
    <>
      <Cases cases={cases} editCase={editCase} removeCase={removeCase} />
      <Button block icon='file-add' onClick={() => editCase(null)}>
        Add New Upload Case
      </Button>
      <UploadCasesEditor />
    </>
  );
}

export default UploadCases;
