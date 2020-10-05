const db = require('../../db/dbConfig.js');
const fs = require('fs');


module.exports = {
  find,
  findById,
  add,
  update,
  removePlant,
  findByUser
};

function find() {
  return db('plants').select('*');
}

function findById(id) {
  return db('plants')
    .where({ id })
    .first()
    .select('*');
}

async function add(plant, image, id) {
  plant.user_id = id;
  plant.image = image;
  const [plantid] = await db('plants').insert(plant, 'id');

  return findById(plantid);
}

function update(id, changes) {
  return db('plants')
    .where({ id })
    .update(changes)
    .then(count => {
      return count > 0 ? this.findById(id) : null;
    });
}

async function removePlant(id) {
  const image = await db('plants').where({ id }).first().select('image');
  if(image.image !== 'No Image') {
    // If image actually exists in image column, remove that from the "uploads" dir upon deletion
    fs.unlinkSync(`./${image.image}`);
  }
  return db('plants')
    .where({ id })
    .delete();
}

function findByUser(id) {
  return db('plants')
    .select('id', 'nickname', 'species', 'h2o_frequency', 'image', 'user_id')
    .where('user_id', id);
}
