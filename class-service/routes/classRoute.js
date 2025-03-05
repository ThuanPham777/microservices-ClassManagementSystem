const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getClassListByUserId);
router.get('/:IdClass', classController.getClassById);

router.post('/create', classController.createClass);

router.put('/:IdClass/update', classController.updateClass);

router.delete('/:IdClass/delete', classController.deleteClass);
module.exports = router;
