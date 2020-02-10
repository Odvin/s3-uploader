const Ajv = require('ajv');

const createUploadCaseSchema = {
  type: 'object',
  require: ['name', 'minSize', 'maxSize', 'mimes'],
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    minSize: { type: 'number', minimum: 1024, maximum: 1048576 },
    maxSize: { type: 'number', minimum: 2097152, maximum: 104857600 },
    mimes: {
      type: 'array',
      uniqueItems: true,
      minItems: 1,
      items: [{ type: 'string' }]
    }
  }
};

const ajv = new Ajv();
const createUploadCaseValidation = ajv.compile(createUploadCaseSchema);

module.exports = {
  createUploadCaseValidation
};