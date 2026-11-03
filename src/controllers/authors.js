import { 
  getAllAuthors as getAllAuthorsFromDb, 
  getAuthorById as getAuthorByIdFromDb, 
  createAuthor as createAuthorInDb, 
  updateAuthor as updateAuthorInDb, 
  deleteAuthor as deleteAuthorInDb,
  authorHasBooks 
} from '../models/authors.js';

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error.message);
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json(author);
  } catch (error) {
    console.error('Error fetching author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    // Validate required fields
    if (!id || !name || birthYear === undefined) {
      return res.status(400).json({ message: 'id, name, and birthYear are required' });
    }

    // Check if ID already exists
    const existingAuthor = await getAuthorByIdFromDb(id);
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author with this id already exists' });
    }

    const newAuthor = { id, name, birthYear };
    await createAuthorInDb(newAuthor);
    
    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;

    // Validate required fields
    if (!name || birthYear === undefined) {
      return res.status(400).json({ message: 'name and birthYear are required' });
    }

    const updatedData = { name, birthYear };
    const result = await updateAuthorInDb(req.params.id, updatedData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json({ id: req.params.id, ...updatedData });
  } catch (error) {
    console.error('Error updating author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Check if the author has books first
    const hasBooks = await authorHasBooks(authorId);
    if (hasBooks) {
      return res.status(409).json({ message: 'Cannot delete author because they still have books.' });
    }

    const result = await deleteAuthorInDb(authorId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(204).send(); // 204 means success but no data to return
  } catch (error) {
    console.error('Error deleting author:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};