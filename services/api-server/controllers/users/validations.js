const Ajv = require('ajv');

const MBSize = 1024 * 1024;

const createUserSchema = {
  type: 'object',
  additionalProperties: false,
  require: ['extId', 'reseller', 'cases', 'storageSize'],
  properties: {
    extId: { type: 'string' },
    reseller: { type: 'string' },
    cases: {
      type: 'array',
      uniqueItems: true,
      minItems: 1,
      items: [{ type: 'string' }]
    },
    storageSize: {
      type: 'number',
      minimum: 100 * MBSize,
      maximum: 10000 * MBSize
    }
  }
};


const updateUserSchema = {
  type: 'object',
  additionalProperties: false,
  require: [...createUserSchema.require, 'userId'],
  properties: {
    ...createUserSchema.properties,
    userId: { type: 'string' }
  }
};

const ajv = new Ajv();

const createUserValidation = ajv.compile(createUserSchema);
const updateUserValidation = ajv.compile(updateUserSchema);

module.exports = {
  createUserValidation,
  updateUserValidation
};
