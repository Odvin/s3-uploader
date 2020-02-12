import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

import { reqPreSignedUrl, reqPersistUpload, uploadFile } from '../../api';

function BasicUpload() {
  const { _id: userId, cases } = useSelector(state => state.userInfo);
  const [uploadCaseName, setUploadCaseName] = useState(null);

  function getPossibleMimeTypes(cases, caseName) {
    if (!caseName) return '';

    const [{ mimes = [] }] = (cases || []).filter(c => c.name === caseName);

    return mimes.join(', ');
  }

  const accept = getPossibleMimeTypes(cases, uploadCaseName);

  const userUploadCaseNames = (cases || []).map(c => (
    <Select.Option key={c.name}>{c.name}</Select.Option>
  ));

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.file.files.length) {
      const file = e.target.file.files[0];

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

      const persistRes = await reqPersistUpload(uploadInfo);

      console.log(persistRes);
    }
  }

  return (
    <div style={{marginTop: 20}}>
      <Select
        style={{ width: '220px' }}
        placeholder='Select Upload Cases'
        onChange={value => setUploadCaseName(value)}
      >
        {userUploadCaseNames}
      </Select>

      {uploadCaseName && (
        <div style={{marginTop: 20}}>
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
