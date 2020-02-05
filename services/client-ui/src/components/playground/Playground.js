import React, { useState, useEffect } from 'react';

import { reqQuota, reqPreSignedUrl, reqPersistUpload, uploadFile } from '../../api';

function Playground() {
  const [userQuota, setUserQuota] = useState(null);

  useEffect(() => {
    async function getUserQuota(userId) {
      const quota = await reqQuota(userId);
      console.log(quota);
      setUserQuota(quota);
    }

    getUserQuota('5e3a5dc7616eea001fd60dc9');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.file.files.length) {
      const file = e.target.file.files[0];

      const fileInfo = {
        userId: '5e3a5dc7616eea001fd60dc9',
        case: 'document',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };

      const {url, uploadId } = await reqPreSignedUrl(fileInfo);
      const uploadRes = await uploadFile(url, file);
      console.log(uploadRes);
      console.log(uploadId);

      const uploadInfo = {
        uploadId,
        location: uploadRes.location,
        bucket: uploadRes.bucket,
        key: uploadRes.key,
      }

      const persistRes = await reqPersistUpload(uploadInfo);
      
      console.log(persistRes);
    }
  }

  return (
    <div>
      {userQuota && (
        <div>
          <p>
            User quota for <strong>{userQuota.name}</strong> is fetched:
          </p>
          <p>
            storage usage: <strong>{userQuota.storageUsage}</strong>
          </p>
          <p>
            storage size: <strong>{userQuota.storageSize}</strong>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Choose file to upload</label>
        <input type='file' name='file'></input>
        <input type='submit' value='Send' />
      </form>
    </div>
  );
}

export default Playground;
