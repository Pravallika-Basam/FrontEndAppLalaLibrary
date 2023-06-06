export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pageNumbers = [];

  // if (props.currentPage === 1) {
  //   pageNumbers.push(props.currentPage);
  //   if (props.totalPages >= props.currentPage + 1) {
  //     pageNumbers.push(props.currentPage + 1);
  //   }
  //   if (props.totalPages >= props.currentPage + 2) {
  //     pageNumbers.push(props.currentPage + 2);
  //   }
  // } else if (props.currentPage > 1) {
  //   if (props.currentPage >= 3) {
  //     pageNumbers.push(props.currentPage - 2);
  //     pageNumbers.push(props.currentPage - 1);
  //   } else {
  //     pageNumbers.push(props.currentPage - 1);
  //   }

  //   pageNumbers.push(props.currentPage);

  //   if (props.totalPages >= props.currentPage + 1) {
  //     pageNumbers.push(props.currentPage + 1);
  //   }
  //   if (props.totalPages >= props.currentPage + 2) {
  //     pageNumbers.push(props.currentPage + 2);
  //   }
  // }

  if (props.totalPages <= 5) {
    // If there are 5 or fewer total pages, push all page numbers
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // If there are more than 5 total pages
    if (props.currentPage <= 3) {
      // If current page is close to the beginning, show pages 1 to 5
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
    } else if (props.currentPage >= props.totalPages - 2) {
      // If current page is close to the end, show the last 5 pages
      for (let i = props.totalPages - 4; i <= props.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise, show current page and two adjacent pages
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.paginate(1)}>
          <button className="page-link">First Page</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={
              "page-item " + (props.currentPage === number ? "active" : "")
            }
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        <li
          className="page-item"
          onClick={() => props.paginate(props.totalPages)}
        >
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};
