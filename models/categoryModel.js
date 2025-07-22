import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    category: {type: String, required: [true, 'Category name is required'], unique: [true, 'Category name already exists']},
    description: {type: String, required: false, default: ''},
    status: {type: Boolean, default: true},
    createdAt: {type: Date, default: new Date},
    modifiedAt: {type: Date, required: false}
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;