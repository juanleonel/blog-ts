import express from 'express';
import { BookController } from "../controllers/book.controller";
import { BookService } from '../services/book.service';
const router = express.Router();

const bookController = new BookController(new BookService());
router.get('/', bookController.index);
router.get('/add', bookController.create);
router.get('/add/:id', bookController.create);
router.post('/submit', bookController.submit);
router.delete('/:id', bookController.delete);

export default router;
