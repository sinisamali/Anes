require('dotenv').config(); // Uvoz dotenv za korišćenje .env fajla
const express = require('express'); // Uvoz Express-a
const mongoose = require('mongoose'); // Uvoz mongoose-a za rad s MongoDB
const cors = require('cors'); // Omogućavanje CORS-a za frontend-backend komunikaciju
const { body, validationResult } = require('express-validator'); // Za validaciju podataka
const moment = require('moment');


const app = express(); // Kreiranje Express aplikacije

// Middleware za CORS i parsiranje JSON podataka
app.use(cors());
app.use(express.json());

// **Konekcija sa MongoDB**
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/users_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// **Definicija šeme za korisnike**
const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  gender: { type: String },
  image_urls: { type: [String], default: [] },
  video_urls: { type: [String], default: [] },
  vip: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
  vipExpiresAt: { type: Date },
  premiumExpiresAt: { type: Date }
});
const User = mongoose.model('User', userSchema);

// **Rute**

/**
 * Ruta za dohvaćanje svih video URL-ova
 */
app.get('/videos', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trenutna stranica (default: 1)
    const limit = 50; // Broj videa po stranici
    const skip = (page - 1) * limit; // Preskakanje video zapisa za prethodne stranice

    // Ukupan broj korisnika sa video zapisima
    const totalVideoUsers = await User.countDocuments({
      video_urls: { $exists: true, $not: { $size: 0 } },
    });

    // Dohvatanje korisnika sa video zapisima
    const videoUsers = await User.find(
      { video_urls: { $exists: true, $not: { $size: 0 } } }, // Filtriraj samo korisnike sa video zapisima
      { video_urls: 1, _id: 1 } // Vrati samo _id i video_urls polje
    )
      .skip(skip) // Preskoči prethodne video zapise
      .limit(limit); // Limitiraj na 50 video zapisa

    const totalPages = Math.ceil(totalVideoUsers / limit); // Izračunavanje ukupnog broja stranica

    res.json({
      videos: videoUsers,
      totalPages, // Ukupan broj stranica
    });
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).send('Internal Server Error');
  }
});



/**
 * Ruta za dohvaćanje korisnika sa paginacijom
 */
app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;

  try {
    if (page < 1) {
      return res.status(400).json({ message: 'Invalid page number' });
    }

    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      users: users.map((user) => ({
        ...user.toObject(),
        id: user._id,
      })),
      total,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});



/**
 * Ruta za dodavanje novog korisnika sa validacijom
 */
app.post(
  '/users',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').isString().optional(),
    body('country').isString().optional(),
    body('gender').isIn(['male', 'female', 'other']).optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Internal Server Error');
    }
  }
);

/**
 * Ruta za dohvaćanje detalja korisnika po ID-ju
 */
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Korisnik nije pronađen');
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Ruta za ažuriranje korisnika
 */
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/users/:id/vip-premium', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the incoming request body
    const { vip, premium } = req.body;
    
    const currentDate = new Date();

    if (!vip && !premium) {
      return res.status(400).json({ message: 'You must specify either VIP or Premium status' });
    }

    let updatedData = {};

    if (vip) {
      updatedData = {
        vip: true,
        vipExpiresAt: moment(currentDate).add(1, 'day').toDate(),
        premium: false,
        premiumExpiresAt: null,
      };
    } else if (premium) {
      updatedData = {
        premium: true,
        premiumExpiresAt: moment(currentDate).add(1, 'day').toDate(),
        vip: false,
        vipExpiresAt: null,
      };
    }

    console.log('Updating with data:', updatedData); // Log the update data

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user VIP/Premium status:', err);
    res.status(500).send('Internal Server Error');
  }
});


/**
 * Ruta za brisanje korisnika
 */
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Internal Server Error');
  }
});

const cron = require('node-cron'); // Import node-cron for scheduling tasks

// Schedule a cron job to run every night at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();

    // Find users whose VIP or Premium status has expired and reset them
    await User.updateMany(
      {
        $or: [
          { vip: true, vipExpiresAt: { $lte: currentDate } },
          { premium: true, premiumExpiresAt: { $lte: currentDate } }
        ]
      },
      { $set: { vip: false, premium: false, vipExpiresAt: null, premiumExpiresAt: null } }
    );

    console.log('Cron job executed: VIP and Premium statuses reset for expired users.');
  } catch (err) {
    console.error('Error running cron job:', err);
  }
});



// **Pokretanje servera**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
