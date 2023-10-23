const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get route for all categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated Products
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//get route to target categories by id
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//post route to create a category
router.post('/', async (req, res) => {
  try {
    // Create a new category based on the request body
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//put route to updata a category by its id
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Update a category by its `id` value
    const [updatedRowCount] = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//delete route to delete a category
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Delete a category by its `id` value
    const deletedRowCount = await Category.destroy({
      where: { id: categoryId },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
