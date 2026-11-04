import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook, 
  checkAuthorExists 
} from '../models/books.js';

export const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookByIdHandler = async (req, res) => {
  try {
    const requestedId = req.params.id;
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching single book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    // Validate required fields
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'id, authorId, title, and publicationDate are required' });
    }

    // Check if book id already exists
    const existingBook = await getBookById(id);
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this id already exists' });
    }

    // Validate authorId exists
    const authorExists = await checkAuthorExists(authorId);
    if (!authorExists) {
      return res.status(400).json({ message: 'Invalid authorId. Author does not exist.' });
    }

    const newBook = { id, authorId, title, publicationDate };
    await createBook(newBook);
    
    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBookHandler = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body;

    // Validate required fields
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'authorId, title, and publicationDate are required' });
    }

    // Validate authorId exists
    const authorExists = await checkAuthorExists(authorId);
    if (!authorExists) {
      return res.status(400).json({ message: 'Invalid authorId. Author does not exist.' });
    }

    const updatedData = { authorId, title, publicationDate };
    const result = await updateBook(req.params.id, updatedData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ id: req.params.id, ...updatedData });
  } catch (error) {
    console.error('Error updating book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBookHandler = async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};