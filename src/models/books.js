import { getDb } from '../db/connect.js';

export const getAllBooks = async () => {
  const db = getDb();
  const books = await db.collection('books').find({}).toArray();
  return books;
};

export const getBookById = async (bookId) => {
  const db = getDb();
  const book = await db.collection('books').findOne({ id: bookId });
  return book;
};

export const createBook = async (book) => {
  const db = getDb();
  const result = await db.collection('books').insertOne(book);
  return result;
};

export const updateBook = async (bookId, bookData) => {
  const db = getDb();
  const result = await db.collection('books').updateOne(
    { id: bookId },
    { $set: bookData }
  );
  return result;
};

export const deleteBook = async (bookId) => {
  const db = getDb();
  const result = await db.collection('books').deleteOne({ id: bookId });
  return result;
};

// Helper to check if an author exists
export const checkAuthorExists = async (authorId) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id: authorId });
  return author !== null; 
};