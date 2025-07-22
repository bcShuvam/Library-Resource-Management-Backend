import mongoose from 'mongoose';

const CatalogSchema = mongoose.Schema({
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category id is required']},
    name: {type: String, required: [true, 'Name is required'], unique: [true, 'Catalog name already exists']},
    description: {type: String, required: false, default: ''},
    quantity: {type: Number, default: 1},
    image: {type: String, required: false, default: ''},
    availabilityStatus: {type: Boolean, default: true},
    createdAt: {type: Date, default: new Date},
    modifiedAt: {type: Date, required: false}
});

const Catalog = mongoose.model('Catalog', CatalogSchema);

export default Catalog;