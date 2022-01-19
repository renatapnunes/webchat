const connection = require('../connection');

module.exports = async (collection, entity) => {
  const createdEntity = (await connection()).collection(collection).insertOne(entity);

  return createdEntity;
};
