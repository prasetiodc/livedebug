const Transaction = require('../models/transaction');

class TransactionController {
  static transfer(req, res) {
    console.log("MASUK");
    
    Transaction.create({
      amount: req.body.amount,
      from: req.transferFromId,
      to: req.transferToId
    })
    .then(success => {
      Transaction.find({
        _id: success._id
      })
      .populate({
        path: 'from',
        populate: {
          path: 'userId'
        }
      })
    })
    .then(trans => {
      console.log("MASUK");
      
      res.status(201).json(trans);
    })
    .catch(err => {
      if (err.message) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(500).json(err);
      }
    })
  }
}

module.exports = TransactionController
