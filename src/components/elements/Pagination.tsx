import React, { ReactElement } from "react";
import ReactPaginate from "react-paginate";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type TPaginationProps = {
    pageCount: number;
    onPageChange: (selectedPageId: number) => void;
};

const Pagination = ({
    pageCount,
    onPageChange,
}: TPaginationProps): ReactElement => {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            previousLabel={<button className="btn btn-sm">«</button>}
            nextLabel={<button className="btn btn-sm">»</button>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            // @ts-ignore
            renderOnZeroPageCount={null}
            containerClassName="btn-group"
            pageLinkClassName="btn btn-sm border-radius-0"
            disabledClassName="btn-disabled"
            activeLinkClassName="btn-primary"
        />
    );
};

export default Pagination;
