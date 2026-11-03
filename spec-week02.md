# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References
*(Copy and paste the entire Book spec from the Canvas assignment page into here)*
### Goal
Update the existing Week 01 book API...
*(...just paste everything the assignment gave you for the Books spec...)*

## Feature 2: Author CRUD Operations

### Goal
Create a new authors collection and API with full CRUD operations. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Routes

#### GET /authors
Purpose: Return all authors.
Success:
- Status code: `200`
- Response body: an array of author objects
Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by custom id.
Success:
- Status code: `200`
- Response body: the matching author object
Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.
Request body:
    {
      "id": "a4",
      "name": "Example Author",
      "birthYear": 1980
    }
Success:
- Status code: `201`
- Response body: the newly created author object
Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.
Request body:
    {
      "name": "Updated Author",
      "birthYear": 1981
    }
Success:
- Status code: `200`
- Response body: the updated author object
Errors:
- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.
Success:
- Status code: `204`
- Response body: none
Errors:
- `404` if no author exists with that id
- `409` if the author still has books referencing them (Conflict)
- `500` if an unexpected server or database error occurs