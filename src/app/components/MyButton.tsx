// components/Button.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

type BookItem = {
    id: string;
    title: string;
    author: string;
}

type BookProps = {
    books: BookItem[]
}

type AddBookProps = {
    addBook: BookItem
}

export default function MyButton() {

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<BookItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');

    useEffect(() => {
        fetchBooks();
    },[])

    const fetchBooks = () => {
        console.log('Loading GQL Data');
        setLoading(true);
        // Basic query to fetch books
        client.query<BookProps>({
            query: gql`
            query {
                books {
                id
                title
                author
                }
            }
            `
        })
            .then(result => {
                setBooks(result.data.books);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }

    const handleSaveBook = () => {
        if (newBookTitle && newBookAuthor) {
            // Invoke mutation to add new book
            // Mutation to add a new book
            client.mutate<AddBookProps>({
                mutation: gql`
      mutation {
        addBook(title: "${newBookTitle}", author: "${newBookAuthor}") {
          id
          title
          author
        }
      }
    `
            })
                .then(result => {
                    console.log('RESULT: ', result.data);
                    if (result.data && result.data.addBook) {
                        const newBook = result.data.addBook;
                        setBooks(prevBooks => [...prevBooks, newBook]);
                    }
                    setShowModal(false);
                })
                .catch(error => console.log(error));
        }
    }

    const handleAddBook = () => {
        setShowModal(true);
    }

    return (
        <>

            <Button onClick={handleAddBook}
                className="inline-flex items-center gap-2 rounded-md bg-green-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-400 data-[open]:bg-green-500 data-[focus]:outline-1 data-[focus]:outline-white my-6">
                Add Book
            </Button>

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newBookTitle}
                            onChange={(e) => setNewBookTitle(e.target.value)}
                            className="block w-full border-gray-100 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4 text-black p-2"
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            value={newBookAuthor}
                            onChange={(e) => setNewBookAuthor(e.target.value)}
                            className="block w-full border-gray-100 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm mb-4 text-black p-2"
                        />
                        <Button onClick={handleSaveBook}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            Save
                        </Button>
                        <Button onClick={() => setShowModal(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2 hover:bg-gray-400">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}


            {loading && <p className='py-3'>Loading...</p>}

            <div className='columns-3 border-b-4 py-3'>
                <div>
                    ID
                </div>
                <div>
                    Title
                </div>
                <div>
                    Author
                </div>
            </div>

            {books.map((book) => (
                <div className='columns-3 border-b-2 py-3' key={book.id}>
                    <div>
                        {book.id}
                    </div>
                    <div>
                        {book.title}
                    </div>
                    <div>
                        {book.author}
                    </div>
                </div>
            ))}
        </>
    )
}
