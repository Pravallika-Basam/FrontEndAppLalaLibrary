import { Console, error } from "console";
import { Book } from "../../../Models/Book";
import { ReturnBook } from "./ReturnBook";
import React, { useEffect, useState } from "react";

export const Courosal = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    useEffect(() => {
        const fetchbooks = async () => {
            const baseUrl: string = 'http://localhost:8080/api/v1/books';
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong!!");
            }
            const jsonResponse = await response.json();
            const responseData = jsonResponse._embedded.books;
            const loadedBooks: Book[] = [];
            for (const key in responseData) {
                const book = responseData[key];
                const bookObj = new Book(book.id, book.title, book.author,
                    book.description, book.copies, book.copies_available, book.category, book.img);
                loadedBooks.push(bookObj);
            }

            // for (const key in responseData) {
            //     loadedBooks.push({
            //         id: responseData[key].id,
            //         title: responseData[key].title,
            //         author: responseData[key].author,
            //         description: responseData[key].description,
            //         copies: responseData[key].copies,
            //         copies_available: responseData[key].copies_available,
            //         category: responseData[key].category,
            //         img: responseData[key].img,
            //     });
            // }

            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchbooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, []);

    if (isLoading) {
        return <div className="container m-5"><p>Loading..</p></div>;
    }

    if (httpError) {
        return <div className="container m-5"><p>{httpError}</p></div>;
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>
                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (<ReturnBook book={book} key={book.id} />))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (<ReturnBook book={book} key={book.id} />))}
                        </div>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>
            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href="#">View More</a>
            </div>
        </div>
    );
}