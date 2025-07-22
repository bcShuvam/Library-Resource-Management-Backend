import Category from "../models/categoryModel.js";

export const getAllCategory = async (req, res) => {
    try {
        const foundCategory = await Category.find();
        return res.status(200).json({ categories: foundCategory });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { category, description, status } = req.body;

        const newCategory = await Category.create({
            category,
            description,
            status
        });

        return res.status(201).json({ message: 'Category Created Successfully', newCategory });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { category, description, status } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category, description, status, modifiedAt: new Date },
      { new: true } // return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category Updated Successfully', updatedCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted Successfully', deletedCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};