import React from "react";
import { TableRow, TableCell, Skeleton } from "@mui/material";

const TableSkeleton = ({ rows = 6, columns = 7, isEditMode }) => {
  return (
    <>
      {Array.from(new Array(rows)).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {isEditMode && (
            <TableCell>
              <Skeleton variant="rectangular" width={20} height={20} />
            </TableCell>
          )}

          {Array.from(new Array(columns)).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" height={28} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
