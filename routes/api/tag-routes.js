const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // To include associated products
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
          through: ProductTag, // To include associated products
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag based on the request body
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Update a tag's name by its `id` value
    const [updatedRowCount] = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Delete a tag by its `id` value
    const deletedRowCount = await Tag.destroy({
      where: { id: tagId },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;