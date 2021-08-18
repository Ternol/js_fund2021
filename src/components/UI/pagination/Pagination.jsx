import React from 'react';
import {getTotalPages} from "../../../utils/pages";

const Pagination = ({totalPages, currentPage, changePage}) => {
    let pagesArr = getTotalPages(totalPages);
    return (
        <div className="page__wrapper">
            {pagesArr.map(p =>
                <span
                    key={p}
                    onClick={()=> changePage(p)}
                    className={p === currentPage ? 'page page__current' : 'page'}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;