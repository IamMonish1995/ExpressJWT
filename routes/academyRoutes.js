import express from 'express';
const router = express.Router();
import AcademyController from '../controllers/academyController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/getallacademy', checkUserAuth)
router.use('/addacademy', checkUserAuth)
router.use('/deleteacademy', checkUserAuth)

// Public Routes

// Protected Routes
router.get('/getallacademy', AcademyController.getAllacademy)
router.post('/addacademy', AcademyController.addAcademy)
router.post('/deleteacademy', AcademyController.deleteAcademy)

export default router