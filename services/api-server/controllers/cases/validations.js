const Ajv = require('ajv');

const createUploadCaseSchema = {
  type: 'object',
  additionalProperties: false,
  require: ['name', 'minSize', 'maxSize', 'mimes'],
  properties: {
    name: { type: 'string' },
    minSize: { type: 'number', minimum: 1024, maximum: 5242880 },
    maxSize: { type: 'number', minimum: 5242880, maximum: 104857600 },
    mimes: {
      type: 'array',
      uniqueItems: true,
      minItems: 1,
      items: [{ type: 'string' }]
    }
  }
};

const updateUploadCaseSchema = {
  type: 'object',
  additionalProperties: false,
  require: [...createUploadCaseSchema.require, 'caseId'],
  properties: {
    ...createUploadCaseSchema.properties,
    caseId: { type: 'string' }
  }
};

const ajv = new Ajv();

const createUploadCaseValidation = ajv.compile(createUploadCaseSchema);
const updateUploadCaseValidation = ajv.compile(updateUploadCaseSchema);

module.exports = {
  createUploadCaseValidation,
  updateUploadCaseValidation
};
