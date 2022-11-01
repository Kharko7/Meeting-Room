import { useState } from "react";
import cn from "classnames";
import styles from "./pagination.module.scss";
interface pagination {
  activePage: number;
  setActivePage: (arg: number) => void;
}
const Pagination = ({ setActivePage, activePage }: pagination) => {
  const page = activePage;
  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        <li
          className={cn(styles.li,styles.btn)}
          onClick={() => setActivePage(page > 1 ? page - 1 : 4)}
        >

          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
        </li>
        <li
          className={cn(styles.li, page == 1 && styles.current)}
          onClick={() => setActivePage(1)}
        >
          1
        </li>
        <li
          className={cn(styles.li, page == 2 && styles.current)}
          onClick={() => setActivePage(2)}
        >
          2
        </li>
        <li
          className={cn(styles.li, page == 3 && styles.current)}
          onClick={() => setActivePage(3)}
        >
          3
        </li>
        <li
          className={cn(styles.li, page == 4 && styles.current)}
          onClick={() => setActivePage(4)}
        >
          4
        </li>
        {/* <li className={styles.li}>5</li> */}
        <li
          className={cn(styles.li,styles.btn)}
          onClick={() => setActivePage(page < 4 ? page + 1 : 1)}
        >
          <svg
            className={styles.svgRotate}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
