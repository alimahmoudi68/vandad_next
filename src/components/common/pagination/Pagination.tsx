import React from 'react';

type PaginationProps = {
  pages: number;
  current: number;
  action: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pages, current, action }) => {
  const pageNeighbours = 2;
  const currentPage = Number(current);

  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';

  const range = (from: number, to: number, step = 1): number[] => {
    const output: number[] = [];
    for (let i = from; i <= to; i += step) {
      output.push(i);
    }
    return output;
  };

  const fetchPageNumbers = (): (number | string)[] => {
    const totalPages = pages;
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let visiblePages: (number | string)[] = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (visiblePages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          visiblePages = [LEFT_PAGE, ...extraPages, ...visiblePages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          visiblePages = [...visiblePages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          visiblePages = [LEFT_PAGE, ...visiblePages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...visiblePages, totalPages];
    }

    return range(1, totalPages);
  };

  const allPage = fetchPageNumbers();

  const gotoPage = (page: number) => {
    action(page);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gotoPage(currentPage - (pageNeighbours * 2) - 1);
  };

  const handleMoveRight = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gotoPage(currentPage + (pageNeighbours * 2) + 1);
  };

  if (pages <= 1) return null;

  return (
    <div className='w-full flex justify-center items-center my-10'>
      <ul className='flex p-0'>
        {allPage.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={index} className='mx-1'>
                <a
                  className="rounded-md	bg-gray-200 font-semibold	dark:bg-dark-50 px-3 py-2 hover:bg-slate-700"
                  href="#"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">قبلی</span>
                </a>
              </li>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <li key={index} className='mx-1'>
                <a
                  className="rounded-md	bg-gray-200 font-semibold	dark:bg-dark-50 px-3 py-2 hover:bg-slate-700"
                  href="#"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">بعدی</span>
                </a>
              </li>
            );
          }

          return (
            <li key={index} className='mx-1 group'>
              <a
                className={`rounded-md	px-3 py-2 font-semibold	${
                  currentPage === page
                    ? 'bg-primary-100 group-hover:cursor-default dark:bg-primary-100'
                    : 'bg-gray-200 group-hover:bg-gray-300 dark:bg-dark-50 dark:group-hover:bg-slate-500'
                }`}
                href="#"
                onClick={(e) => handleClick(e, page as number)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
