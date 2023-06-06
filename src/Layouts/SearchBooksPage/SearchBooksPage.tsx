import { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./Components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [category, setCategory] = useState("Book Category");

  useEffect(() => {
    const fetchbooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/v1/books";
      let url: string = "";
      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const jsonResponse = await response.json();
      const responseData = jsonResponse._embedded.books;
      const pageData = jsonResponse.page;
      const loadedBooks: Book[] = [];
      //Manually deserializing JSON response to Typescript Object
      for (const key in responseData) {
        const book = responseData[key];
        const bookObj = new Book(
          book.id,
          book.title,
          book.author,
          book.description,
          book.copies,
          book.copies_available,
          book.category,
          book.img
        );
        loadedBooks.push(bookObj);
      }
      setTotalBooks(pageData.totalElements);
      setTotalPages(pageData.totalPages);
      setBooks(loadedBooks);
      setIsLoading(false);
    };
    //checking If the API Call was successful
    fetchbooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandlingChanges = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
    setCategory("Book Category");
  };

  const setCategoryField = (category: string) => {
    setCurrentPage(1);
    if (category === "") {
      setCategory("All");
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    } else {
      setCategory(category);
      setSearchUrl(
        `/search/findByCategoryContaining?category=${category}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
  };
  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalBooks
      ? booksPerPage * currentPage
      : totalBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={searchHandlingChanges}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => setCategoryField("")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => setCategoryField("FE")}>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li onClick={() => setCategoryField("BE")}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li onClick={() => setCategoryField("Data")}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={() => setCategoryField("DevOps")}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalBooks} items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
