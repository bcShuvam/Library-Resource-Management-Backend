import Catalog from '../models/catalogModel.js';

export const createCatalog = async (req, res) => {
  try {
    const {categoryId, name, description, quantity, availabilityStatus } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const catalog = await new Catalog({
      categoryId,
      name,
      description,
      quantity,
      availabilityStatus,
      image: imagePath,
    });

    await catalog.save();

    res.status(201).json({ message: 'Catalog created successfully', catalog });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
