import express from 'express';
import auth from '../middleware/auth.js';
import * as controller from "../controllers/reservationsController.js"
import adminAuth from '../middleware/admin.js';
import Reservation from '../models/reservations.js';

const router = express.Router();

// GET visi userio rezervacijos (naudojant auth middleware)
/*
router.get('/', auth, async (req, res) => {
  // Is userData paimamas userId (id is JWT tokeno)
  const { userId } = req.userData;

  try {
    // Suranda visas rezervacijas pagal userId
    const reservations = await Reservation.find().populate('product', 'description nameRetail').select('product quantity dateRange _id toolType tool status pickupLocation contactName contactEmail contactPhone').exec();

    // Grazina rezultata su rezervaciju sarasu
    res.status(200).json({
      count: reservations.length,
      reservations: reservations.map((reservation) => ({
        _id: reservation._id,
        product: reservation.product,
        quantity: reservation.quantity,
        dateRange: reservation.dateRange,
        toolType: reservation.toolType,
        tool: reservation.tool,
        pickupLocation: reservation.pickupLocation,
        contactName: reservation.contactName,
        contactEmail: reservation.contactEmail,
        contactPhone: reservation.contactPhone,
        status: reservation.status,
        request: {
          type: 'GET',
          url: `http://localhost:3000/reservations/${reservation._id}`
        }
      }))
    });
  } catch (err) {
    // Klaida grazina 500 statusa
    res.status(500).json({ error: err.message });
  }
});
*/

router.get('/', auth, adminAuth, controller.procureReservations);

// POST sukuria nauja rezervacija (naudojant auth middleware)
router.post('/', auth, controller.produceReservation);

// Traukiam rezervacijas pagal user ID

router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.params.userId
      // Removed the status filter to get all reservations
    })
      .populate('product', 'description.nameRetail')
      .exec();

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gaunam rezervacijas pagal specifini productId
router.get('/product/:productId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ product: req.params.productId })
      .select('dateRange')
      .exec();

    res.status(200).json({
      reservations: reservations.map((reservation) => ({
        from: reservation.dateRange.from,
        to: reservation.dateRange.to
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET vienos rezervacijos informacija pagal id
router.get('/:reservationId', auth, controller.procureReservation);

// DELETE rezervacija pagal id
router.delete('/:reservationId', auth, controller.eradicateReservation);

// PUT rezervaciju tvirtinimas
router.put('/:reservationId', auth, adminAuth, controller.reformReservation);

router.patch('/:reservationId')

export default router;
