const Reservations = require('../models/reservations');

module.exports = {
  // add a new reservation
  async add(req, res) {
    const {
      user_id,
      host_id,
      place_id,
      start_date,
      end_date,
      price,
      number_of_nights,
      receipt,
    } = req.body;

    try {
      let reservation = await Reservations.findOne({
        user_id,
        host_id,
        place_id,
        start_date,
        end_date,
        price,
        number_of_nights,
        receipt,
      });
      if(reservation)
       return res.status(200).json("Reservation already exists");

      reservation = new Reservations({
        user_id,
        host_id,
        place_id,
        start_date,
        end_date,
        price,
        number_of_nights,
        receipt,
      });
      await reservation.save();
      res.status(200).json(reservation);

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Unable to save reservation");
    }
  },

  // get a reservation by ID
  async fetchRes(req, res) {
    const reservationId = req.params.id;
    try {
      const reservation = await Reservations.findById(reservationId);
      res.status(200).json(reservation);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Reservation not found");
    }
  },
  async all(req, res) {
    // const reservationId = req.params.id;
    try {
      const reservation = await Reservations.find({});
      res.status(200).json(reservation);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Reservation not found");
    }
  },
  // get all reservations for a placeID
  async fetchAllForPlace(req, res) {
    const placeId = req.params.id;
    try {
      const reservations = await Reservations.find({ place_id: placeId });
      res.status(200).json(reservations);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Unable to get Reservations");
    }
  },

  // get all reservations for a userID
  async fetchAllForUser(req, res) {
    const userId = req.params.id;
    try {
      const reservations = await Reservations.find({ user_id: userId });
      res.status(200).json(reservations);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Unable to get Reservations");
    }
  },

  // delete a reservation by ID
  async deleteRes(req, res) {
    const reservationId = req.params.id;
    try {
      const reservation = await Reservations.findByIdAndDelete(reservationId);
      if(!reservation) res.status(200).json("Reservation doesn't exist");
      res.status(200).json("Reservation deleted");
      
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Cannot delete reservation");
    }
  },
};