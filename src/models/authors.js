import { getDb } from '../db/connect.js';

export const getAllAuthors = async () => {
  const db = getDb();
  const authors = await db.collection('authors').find({}).toArray();
  return authors;
};

export const getAuthorById = async (authorId) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id: authorId });
  return author;
};

export const createAuthor = async (author) => {
  const db = getDb();
  const result = await db.collection('authors').insertOne(author);
  return result;
};

export const updateAuthor = async (authorId, authorData) => {
  const db = getDb();
  const result = await db.collection('authors').updateOne(
    { id: authorId },
    { $set: authorData }
  );
  return result;
};

export const deleteAuthor = async (authorId) => {
  const db = getDb();
  const result = await db.collection('authors').deleteOne({ id: authorId });
  return result;
};

export const authorHasBooks = async (authorId) => {
  const db = getDb();
  const book = await db.collection('books').findOne({ authorId: authorId });
  return book !== null; // Returns true if a book is found, false if not
};