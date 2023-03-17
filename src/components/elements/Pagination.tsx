import { ReactElement } from 'react';
import ReactPaginate from 'react-paginate';

type TPaginationProps = {
    pageCount: number;
    onPageChange: (selectedPageId: number) => void;
    currentPage: number;
};

const Pagination = ({ pageCount, onPageChange, currentPage }: TPaginationProps): ReactElement => {
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
            initialPage={currentPage}
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
