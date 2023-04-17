const router = require('express').Router();
const { Category, Product } = require('../../models');
const { afterSync } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and include its associated Products
  const categories = await Category.findAll(
    {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    }
  )
  res.send(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value and include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  if (!category) {
    res.status(404).send("Category not found")
  } else {
    res.send(category)
  }

});

router.post('/', async (req, res) => {
  // create a new category
  const category = await Category.create(req.body)
  res.status(201).send(category)

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.send("Category updated")
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  if (!category) {
    res.status(404).send("Category not found")
  } else {
    res.send("Category deleted")
  }

});

module.exports = router;
