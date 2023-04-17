const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and include its associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: 'tagged_products' }],
  });
  res.send(tagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and include its associated Product data
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: 'tagged_products' }],
  });
  if (!tagData) {
    res.status(404).send('No tag found with this id!');
    return;
  } else {
    res.send(tagData);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagData = await Tag.create(req.body);
  res.send(tagData);

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!tagData) {
    res.status(404).send('No tag found with this id!');
    return;
  } else {
    res.send("Tag updated!");
  }
  router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },

    });
    if (!tagData) {
      res.status(404).send('No tag found with this id!');
      return;
    } else {
      res.send('Tag deleted!');
    }

  });
});

module.exports = router;
