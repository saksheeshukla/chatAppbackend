const express = require('express');
const SearchController =  require('../controllers/search.controller');

const router = express.Router();

router.get('/search', SearchController.searchUsers);

module.exports = router;
