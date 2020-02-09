import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Icon, Button } from 'antd';

import UploadCasesEditor from './UploadCaseEditor';

import { reqUploadCases } from '../../api';

import {
  setUploadCases,
  consumeUploadCaseEditor,
  selectUploadCaseId
} from '../../redux/actions/uploadCases';

function Cases(props) {
  const { cases, editCase } = props;

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
            <span>
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
            title={item.case}
            description={`min: ${item.minSize}; max: ${item.maxSize} (bits)`}
          />
          {(item.mineTypes || []).join(';  ')}
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

  return (
    <>
      <Cases cases={cases} editCase={editCase} />
      <Button block icon='file-add' onClick={() => editCase(null)}>
        Add New Upload Case
      </Button>
      <UploadCasesEditor />
    </>
  );
}

export default UploadCases;
