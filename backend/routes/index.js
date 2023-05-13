const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/controller');
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');

const validationRules = [
    body('name').isLength({ min: 1 }).withMessage('Please enter goal name'),
    body('description').isLength({ min: 1 }).withMessage('Please enter goal description')
];

router.route('/').get(auth, getGoals).post(auth, validationRules, createGoal)
router.route('/:id').put(auth, validationRules, updateGoal).delete(auth, deleteGoal)

module.exports = router;