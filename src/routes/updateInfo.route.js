const express  =  require('express');
const usercontroller  =  require('../controllers/user.controllers.js');
const router = express.Router();

router.get('/updateavatar/:user/:id',usercontroller.updateavatar);

module.exports = router;