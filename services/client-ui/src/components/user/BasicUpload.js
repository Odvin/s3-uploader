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

  function canUploadPunctureThumbnail(cases) {
    const check = (cases || []).filter(c =>
      ['picture', 'thumbnail'].includes(c.name)
    );

    return check.length === 2;
  }

  let pictureUploadOptions = {};
  let thumbnailUploadOptions = {};

  if (canUploadPunctureThumbnail(cases)) {
    pictureUploadOptions = getPossibleMimeTypes(cases, 'picture');
    thumbnailUploadOptions = getPossibleMimeTypes(cases, 'thumbnail');
  }

  const { accept = '', minSize, maxSize } = getPossibleMimeTypes(
    cases,
    uploadCaseName
  );

  const userUploadCaseNames = (cases || []).map(c => (
    <Select.Option key={c.name}>{c.name}</Select.Option>
  ));

  async function uploadFileToS3(file, options) {
    const { minSize, maxSize, uploadCaseName, userId } = options;

    const result = {
      completed: false,
      isSizeAcceptable: false
    };

    if (!(minSize && maxSize && minSize < file.size && file.size < maxSize)) {
      return result;
    } else {
      result.isSizeAcceptable = true;
    }

    const fileInfo = {
      userId,
      case: uploadCaseName,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    };

    const {
      resData: { url, uploadId },
      reqFailed: reqPresignedUrlFailed
    } = await reqPreSignedUrl(fileInfo);

    if (reqPresignedUrlFailed) {
      return result;
    }

    const uploadRes = await uploadFile(url, file);

    const uploadInfo = {
      uploadId,
      location: uploadRes.location,
      bucket: uploadRes.bucket,
      key: uploadRes.key
    };

    const {
      resData: { completed },
      reqFailed: reqPersistUploadFailed
    } = await reqPersistUpload(uploadInfo);

    if (completed && !reqPersistUploadFailed) {
      result.completed = completed;
    }

    return result;
  }

  async function processFileUpload(file, options) {
    const result = await uploadFileToS3(file, options);

    if (!result.isSizeAcceptable) {
      notification.open({
        message: 'Cannot upload the file',
        description: `File size :: ${file.size} not in [${minSize}; ${maxSize}]`,
        icon: <Icon type='warning' />
      });

      return;
    }

    if (result.completed) {
      const { resData, reqFailed } = await reqUserStorageUsage(userId);

      if (!reqFailed) {
        dispatch(updateStorageUsage(resData));
      }
    }

    return result;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.file.files.length) {
      const file = e.target.file.files[0];

      const options = {
        minSize,
        maxSize,
        uploadCaseName,
        userId
      };

      processFileUpload(file, options);
    }
  }

  async function thumb(e) {
    e.preventDefault();

    const files = e.target.file.files;
    if (files === null || files === undefined) {
      document.write('This Browser has no support for HTML5 FileReader yet!');
      return false;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageType = /image.*/;

      if (!file.type.match(imageType)) {
        continue;
      }

      const reader = new FileReader();

      if (reader != null) {
        reader.readAsDataURL(file);
        reader.onload = GetThumbnail;

        if (!reader.error) {
          const fileOptions = {
            minSize: pictureUploadOptions.minSize,
            maxSize: pictureUploadOptions.maxSize,
            uploadCaseName: 'picture',
            userId
          };

          processFileUpload(file, fileOptions);
        }
      }
    }
  }

  function GetThumbnail(e) {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      canvas.id = 'myTempCanvas';

      const maxWidth = 300;
      const maxHeight = 200;

      canvas.width = maxWidth;
      canvas.height = maxHeight;

      const thumbnailScale =
        img.width / img.height > maxWidth / maxHeight
          ? maxWidth / img.width
          : maxHeight / img.height;

      const thumbnailWidth = Number(img.width * thumbnailScale);
      const thumbnailHeight = Number(img.height * thumbnailScale);

      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);
        const dataURL = canvas.toDataURL();

        if (dataURL !== null && dataURL !== undefined) {
          const nImg = document.createElement('img');
          nImg.src = dataURL;
          const uploadForm = document.getElementById('uploadPicture');
          uploadForm.appendChild(nImg);

          const thumbnailOptions = {
            minSize: thumbnailUploadOptions.minSize,
            maxSize: thumbnailUploadOptions.maxSize,
            uploadCaseName: 'thumbnail',
            userId
          };

          const i = dataURL.indexOf('base64,');
          const buffer = Buffer.from(dataURL.slice(i + 7), 'base64');

          const thumbnailFile = new File([buffer], 'thumb-300x200.png', {
            type: 'image/png'
          });

          processFileUpload(thumbnailFile, thumbnailOptions);
        } else alert('unable to get context');
      }
    };
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

      {pictureUploadOptions.accept && thumbnailUploadOptions.accept && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Upload Picture with Thumbnail</strong>
          </p>
          <form onSubmit={thumb} id='uploadPicture'>
            <label> Select File To Create Thumbnail : </label>
            <input
              type='file'
              id='input'
              name='file'
              multiple
              accept={pictureUploadOptions.accept}
            />
            <input type='submit' value='Send' />
          </form>
        </div>
      )}
    </div>
  );
}

export default BasicUpload;
