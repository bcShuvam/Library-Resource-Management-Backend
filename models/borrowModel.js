import mongoose from 'mongoose';

const BorrowSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId is required']},
    catalogId: {type: mongoose.Schema.Types.ObjectId, ref: 'Catalog', required: [true, 'CatalogId is required']},
    quantity: {type: Number, default: 1},
    description: {type: String, default: ''},
    reqStatus: {type: String, default: 'Pending'}, // Pending, Approved, Rejected
    borrowReqDate: {type: Date , default: new Date},
    borrowReqApproveDate: {type: Date , default: null},
    returnDate: {type: Date, required: [true, 'Return date is required']},
    returnDueDate: {type: Date, default: null},
    returnStatus: {type: String, default: null}, // Pending Return, Returned, Lost, Damaged Returned
    isDamaged: {type: Boolean, default: null},
    isLost: {type: Boolean, default: null},
    comment: {type: String, default: null},
    createdAt: {type: Date, default: new Date},
    modifiedAt: {type: Date, default: null},
})

const Borrow = mongoose.model('Borrow', BorrowSchema);

export default Borrow;