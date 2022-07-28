import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  bookname,
  authorname,
  borrowedby,
  date_of_borrow,
  date_of_return
) {
  return { bookname, authorname, borrowedby, date_of_borrow, date_of_return };
}

export default function CustomizedTables(props) {
  const rows = props.data.map((item) => {
    return createData(
      item.book_name,
      item.author_name,
      item.borrowed_by,
      item.date_of_borrow,
      item.date_of_return
    );
  });
  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "auto",
        "margin-top": "3rem",
        width: "80rem",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Book Name</StyledTableCell>
            <StyledTableCell align="right">Author Name</StyledTableCell>
            <StyledTableCell align="right">Borrowed By&nbsp;</StyledTableCell>
            <StyledTableCell align="right">
              Date of Borrow&nbsp;
            </StyledTableCell>
            <StyledTableCell align="right">
              Date of Return&nbsp;
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.bookname}>
              <StyledTableCell component="th" scope="row">
                {row.bookname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.authorname}</StyledTableCell>
              <StyledTableCell align="right">
                {row.borrowedby === null ? "NULL" : row.borrowedby}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.date_of_borrow === null ? "NULL" : row.date_of_borrow}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.date_of_return === null ? "NULL" : row.date_of_return}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
