import express from 'express';
const router = express.Router();
import { getLoginUrl, getUserWithCode, getCurrentUser } from '../controllers/googleAuthController.js';
// import protect from '../middleware/authMiddleware.js';

router.route('/loginUrl').get(getLoginUrl);
router.route('/google').get(getUserWithCode);
router.route('/whoami').get(getCurrentUser);

export default router;