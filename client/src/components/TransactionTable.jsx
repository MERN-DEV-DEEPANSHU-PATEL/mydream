import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";

const TableContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead`
  background-color: #f5f5f5;
`;

const TH = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const TBody = styled.tbody``;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const TD = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 5px;
  background-color: #fff;
  cursor: pointer;
  color: black;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TransactionTable = ({
  transactions,
  totalCount,
  page,
  limit,
  onPageChange,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      { Header: "Price", accessor: "price" },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Sold",
        accessor: "sold",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Date of Sale",
        accessor: "dateOfSale",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page: currentPage,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: { pageIndex: page - 1, pageSize: limit },
      manualPagination: true,
      pageCount: Math.ceil(totalCount / limit),
    },
    usePagination
  );

  const handlePageChange = (newPage) => {
    gotoPage(newPage - 1);
    onPageChange(newPage);
  };

  return (
    <TableContainer>
      <h2>Transactions</h2>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TH {...column.getHeaderProps()}>{column.render("Header")}</TH>
              ))}
            </tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {currentPage.map((row) => {
            prepareRow(row);
            return (
              <TR {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TD {...cell.getCellProps()}>{cell.render("Cell")}</TD>
                ))}
              </TR>
            );
          })}
        </TBody>
      </Table>
      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={!canPreviousPage}
        >
          First
        </PaginationButton>
        <PaginationButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </PaginationButton>
        <span>
          Page {page} of {pageCount}
        </span>
        <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(pageCount)}
          disabled={!canNextPage}
        >
          Last
        </PaginationButton>
      </Pagination>
    </TableContainer>
  );
};

export default TransactionTable;
