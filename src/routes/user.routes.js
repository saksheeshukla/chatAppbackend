const express  =  require('express');
const usercontroller  =  require('../controllers/user.controllers.js');
const router = express.Router();

router.post('/login',usercontroller.login);
router.post('/signup',usercontroller.signup);

module.exports = router;