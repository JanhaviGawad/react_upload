import classes from "./Pagination.module.css";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


  let keyNum = 0;
  return (
    <nav className={classes.pagination}>
      {pageNumbers.map((number) => {
        return (
          <a key={keyNum++} onClick={() => paginate(number)} href="!#">
            {number}
          </a>
        );
      })}
    </nav>
  );
};

export default Pagination;
