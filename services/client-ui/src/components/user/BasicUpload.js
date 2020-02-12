import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, notification, Icon } from 'antd';

import {
  reqPreSignedUrl,
  reqPersistUpload,
  uploadFile,
  reqUserStorageUsage
} from '../../api';
import { updateStorageUsage } from '../../redux/actions/userInfo';

function BasicUpload() {
  const dispatch = useDispatch();

  const { _id: userId, cases } = useSelector(state => state.userInfo);
  const [uploadCaseName, setUploadCaseName] = useState(null);

  function getPossibleMimeTypes(cases, caseName) {
    if (!caseName) return {};

    const [activeCase] = (cases || []).filter(c => c.name === caseName);

    const { mimes = [], minSize, maxSize } = activeCase || {};

    return {
      accept: mimes.join(', '),
      minSize,
      maxSize
    };
  }

  const { accept = '', minSize, maxSize } = getPossibleMimeTypes(
    cases,
    uploadCaseName
  );

  const userUploadCaseNames = (cases || []).map(c => (
    <Select.Option key={c.name}>{c.name}</Select.Option>
  ));

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.file.files.length) {
      const file = e.target.file.files[0];

      if (!(minSize && maxSize && minSize < file.size && file.size < maxSize)) {
        notification.open({
          message: 'Cannot upload the file',
          description: `File size :: ${file.size} not in [${minSize}; ${maxSize}]`,
          icon: <Icon type='warning' />
        });

        return;
      }

      const fileInfo = {
        userId,
        case: uploadCaseName,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };

      const { url, uploadId } = await reqPreSignedUrl(fileInfo);
      const uploadRes = await uploadFile(url, file);

      const uploadInfo = {
        uploadId,
        location: uploadRes.location,
        bucket: uploadRes.bucket,
        key: uploadRes.key
      };

      const { completed } = await reqPersistUpload(uploadInfo);

      if (completed) {
        const storage = await reqUserStorageUsage(userId);
        dispatch(updateStorageUsage(storage));
      }
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <Select
        style={{ width: '220px' }}
        placeholder='Select Upload Cases'
        onChange={value => setUploadCaseName(value)}
      >
        {userUploadCaseNames}
      </Select>

      {uploadCaseName && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Basic Upload: Choose file to upload</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <input type='file' name='file' accept={accept}></input>
            <input type='submit' value='Send' />
          </form>
        </div>
      )}
    </div>
  );
}

export default BasicUpload;
