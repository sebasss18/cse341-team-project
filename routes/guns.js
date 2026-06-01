const router = require('express').Router();

const gunsController = require('../controllers/guns');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', gunsController.getAll);

router.get('/:id', gunsController.getSingle);

router.post('/', isAuthenticated, validation.saveGun, gunsController.createGun);

router.put('/:id', isAuthenticated, validation.saveGun, gunssController.updateGun);

router.delete('/:id', isAuthenticated, gunsController.deleteGun);

module.exports = router;