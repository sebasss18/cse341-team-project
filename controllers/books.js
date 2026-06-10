const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    try {

        const result = await mongodb.getDatabase().db().collection('books').find();
        const books = await result.toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('books').findOne({ _id: bookId });
        
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear
        };

        const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Book created successfully', bookId: response.insertedId });
        } else {
            res.status(400).json({ message: 'Failed to create book' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear
        };

        const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}