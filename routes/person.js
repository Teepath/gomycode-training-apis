const express= require('express');
const {registerUser} = require('../controllers/person')
const {authUser} = require('../controllers/person')
const {logoutUser} = require('../controllers/person');
const {getUserProfile} = require('../controllers/person');
const {updateUserProfile} = require('../controllers/person');

const protect  = require('../middleware/authmiddlewareUser')

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
// router.get('/profile', protect, getUserProfile);
router
  .route('/profile')
 .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;