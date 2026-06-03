const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const { booksValidation, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post(
    '/',
    isAuthenticated,
    booksValidation(),
    validate,
    booksController.createBook
);

router.put(
    '/:id',
    isAuthenticated,
    booksValidation(),
    validate,
    booksController.updateBook
);

router.delete('/:id', isAuthenticated, booksController.deleteBook);