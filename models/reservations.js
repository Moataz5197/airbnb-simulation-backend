const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReservationsSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    host_id: {
      type: ObjectId,
      required: true,
    },
    place_id: {
      type: ObjectId,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    number_of_nights: {
      type: Number,
      required: true,
    },
    receipt: {
      type: Object,
      required: true,
    },
  },
  { versionKey: false }
);

const Reservations = mongoose.model("reservations", ReservationsSchema);

module.exports = Reservations;