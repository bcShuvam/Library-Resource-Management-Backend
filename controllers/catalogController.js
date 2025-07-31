import Catalog from '../models/catalogModel.js';

export const getAllCatalog = async (req, res) => {
  try {
    const catalogs = await Catalog.find();
    return res.status(200).json({ message: catalogs.length === 0 ? "Catalog not created yet!" : "Catalog found successfully", catalogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const createCatalog = async (req, res) => {
  try {
    const { categoryId, name, description, quantity, availabilityStatus } = req.body;
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

    if(!catalog) return res.status(400).json({message: 'Please fill all the required fields.'})

    res.status(201).json({ message: 'Catalog created successfully', catalog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const imagePath = req.file ? req.file.path : null;

    // Build the update object conditionally
    const updateData = { modifiedAt: new Date() };

    if (req.body.categoryId) updateData.categoryId = req.body.categoryId;
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
    if (req.body.availabilityStatus !== undefined) updateData.availabilityStatus = req.body.availabilityStatus;
    if (imagePath) updateData.image = imagePath;

    const updatedCatalog = await Catalog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCatalog) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category Updated Successfully', updatedCatalog });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCatalogById = async (req, res) => {
  try {
    const id = req.params.id;
    const catalogs = await Catalog.findByIdAndDelete(id);
    return res.status(200).json({ message: catalogs.length === 0 ? "Catalog found successfully" : "Catalog not created yet!", catalogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const updateQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantityChange } = req.body; // can be positive (add) or negative (remove)

    if (!id || typeof quantityChange !== 'number') {
      return res.status(400).json({ message: 'Valid id and quantityChange are required' });
    }

    const catalogItem = await Catalog.findById(id);
    if (!catalogItem) {
      return res.status(404).json({ message: 'Catalog item not found' });
    }

    const newQuantity = catalogItem.quantity + quantityChange;

    if (newQuantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    catalogItem.quantity = newQuantity;
    catalogItem.modifiedAt = new Date();

    await catalogItem.save();

    return res.status(200).json({ message: 'Quantity updated successfully', updatedCatalog: catalogItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};