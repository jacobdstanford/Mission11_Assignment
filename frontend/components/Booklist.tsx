import React, { useEffect, useState } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    category: string;
    numberOfPages: number;
    price: number;
}

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchBooks();
    }, [page, pageSize, sortOrder]);

    const fetchBooks = async () => {
        try {
            // Ensure the URL and port match your backend settings.
            const response = await fetch(`http://localhost:5000/api/books?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalBooks(data.totalBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const totalPages = Math.ceil(totalBooks / pageSize);

    return (
        <div className="container mt-4">
            <h2>Book List</h2>
            <div className="mb-3">
                <label>Results per page: </label>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(parseInt(e.target.value));
                        setPage(1);
                    }}
                    className="ml-2"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
                <button
                    className="btn btn-primary ml-2"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                    Sort by Title ({sortOrder === "asc" ? "Asc" : "Desc"})
                </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.category}</td>
                            <td>{book.numberOfPages}</td>
                            <td>{book.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <span className="mx-2">
                    Page {page} of {totalPages}
                </span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;
