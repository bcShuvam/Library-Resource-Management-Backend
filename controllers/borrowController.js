import Borrow from '../models/borrowModel.js';

export const getAllBorrowReq = async (req, res) => {
  try {
    const reqStatus = req.query.reqStatus ?? '';

    const allowedStatuses = ['', 'Approved', 'Pending', 'Rejected'];
    if (!allowedStatuses.includes(reqStatus)) {
      return res.status(400).json({ message: 'Invalid reqStatus' });
    }

    const filter = reqStatus === '' ? {} : { reqStatus };
    const foundBorrowReq = await Borrow.find(filter);

    return res.status(200).json({
      message: foundBorrowReq.length === 0
        ? 'No borrow requests found'
        : 'Borrow requests found',
      requests: foundBorrowReq,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const newBorrowReq = async (req, res) => {
  try {
    const { userId, catalogId, quantity, description, returnDate } = req.body;

    if (!userId || !catalogId || !quantity || !description || !returnDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Step 1: Parse input date string (assumed format: 'yyyy-MM-dd')
    const date = new Date(`${returnDate}T00:00:00Z`); // Creates date at midnight UTC

    // Step 2: Add 9 hours 15 minutes to make it 3 PM NPT (Nepal Time = UTC+5:45 → 15:00 = 09:15 UTC)
    date.setUTCHours(9, 15, 0, 0); // 09:15 UTC == 15:00 NPT

    const newBorrowReq = await Borrow.create({
      userId,
      catalogId,
      quantity,
      description,
      returnDate: date,
    });

    return res.status(201).json({ message: 'Borrow req sent successfully', request: newBorrowReq });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};