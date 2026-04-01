import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    cardHash: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    last4: {
      type: String,
      required: true
    },
    holderName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    expiryMonth: {
      type: String,
      required: true
    },
    expiryYear: {
      type: String,
      required: true
    },
    billingAddress: {
      country: { type: String, default: 'India' },
      address1: { type: String, default: '' },
      address2: { type: String, default: '' },
      city: { type: String, default: '' },
      pinCode: { type: String, default: '' },
      state: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

const CardModel = mongoose.models.Card || mongoose.model('Card', CardSchema);

export default CardModel;
