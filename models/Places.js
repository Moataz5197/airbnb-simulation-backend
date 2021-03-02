const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlacesSchema = new Schema(
  {
    place_type: {
      type: Object,
      required: true,
    },
    user_id: {
      type: ObjectId,
      required: true,
    },
    space_allowed: {
      type: Object,
      required: true,
    },
    num_guests: {
      type: Number,
      required: true,
    },
    total_bedrooms: {
      type: Number,
      required: true,
    },
    total_bathrooms: {
      type: Number,
      required: true,
    },
    num_beds: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    amenities: {
      type: Object,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    price_per_night: {
      type: Number,
      required: true,
    },
    cancellation_option: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

const Places = mongoose.model('places', PlacesSchema);

module.exports = Places;
