const connection = require('../connection');

module.exports = async (collection) => {
  const returnedEntities = (await connection()).collection(collection).find().toArray();

  return returnedEntities;
};
