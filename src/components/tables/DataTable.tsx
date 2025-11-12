import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Checkbox,
  Box,
  TablePagination,
  styled,
  tableCellClasses
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// Types
export type Order = 'asc' | 'desc';

export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  headerAlign?: 'left' | 'right' | 'center';
  format?: (value: any, row: T) => string | React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selected: T[]) => void;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  showCheckboxes?: boolean;
  stickyHeader?: boolean;
  getRowId?: (row: T) => string | number;
}

// Styled components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08)',
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f5f5f5',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    padding: '12px 16px',
    whiteSpace: 'nowrap',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.87)',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 0.5)',
    padding: '12px 16px',
    height: '52px',
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

const ResizeHandle = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '1px',
  height: '100%',
  cursor: 'col-resize',
  backgroundColor: 'rgba(0, 0, 0, 0.12)',
  '&:hover, &.active': {
    backgroundColor: '#1976d2',
    width: '2px',
  },
});

const StyledTableContainer = styled(TableContainer)({
  boxShadow: 'none',
  border: '1px solid rgba(224, 224, 224, 1)',
  borderRadius: '4px',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

const StyledTable = styled(Table)({
  minWidth: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: 0,
});

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  borderTop: '1px solid rgba(224, 224, 224, 1)',
  '& .MuiTablePagination-toolbar': {
    minHeight: '52px',
    padding: '0 16px',
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    margin: 0,
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiTablePagination-actions': {
    marginLeft: '20px',
  },
  '& .MuiIconButton-root': {
    padding: '8px',
    '&.Mui-disabled': {
      opacity: 0.38,
    },
  },
}));

function DataTable<T>({
  columns: initialColumns,
  rows,
  onRowClick,
  onSelectionChange,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  showCheckboxes = true,
  stickyHeader = false,
  getRowId,
}: DataTableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<T[]>([]);
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const resizingRef = useRef<{
    columnId: keyof T | null;
    startX: number;
    startWidth: number;
  }>({ columnId: null, startX: 0, startWidth: 0 });

  // Handle sort request
  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
      return;
    }
    setSelected([]);
    onSelectionChange?.([]);
  };

  // Handle click on row
  const handleClick = (event: React.MouseEvent<unknown>, row: T) => {
    if (!showCheckboxes) {
      onRowClick?.(row);
      return;
    }

    const rowId = getRowId?.(row) ?? (row as any).id;
    const selectedIndex = selected.findIndex((item) => getRowId?.(item) === rowId);
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, row];
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle column resize start
  const handleResizeStart = (columnId: keyof T, event: React.MouseEvent) => {
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    const th = (event.target as HTMLElement).closest('th');
    if (!th) return;
    
    resizingRef.current = {
      columnId,
      startX: event.clientX,
      startWidth: th.offsetWidth,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingRef.current.columnId) return;
      
      const delta = moveEvent.clientX - resizingRef.current.startX;
      const newWidth = resizingRef.current.startWidth + delta;
      
      setColumns(prevColumns => 
        prevColumns.map(col => 
          col.id === resizingRef.current.columnId 
            ? { ...col, width: Math.max(col.minWidth || 100, newWidth) } 
            : col
        )
      );
    };

    const handleMouseUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      resizingRef.current = { columnId: null, startX: 0, startWidth: 0 };
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp, { once: true });
  };

  // Sort rows
  const sortedRows = useCallback(() => {
    if (!orderBy) return rows;
    
    return [...rows].sort((a, b) => {
      if (a[orderBy] === b[orderBy]) return 0;
      
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (aValue === null || aValue === undefined) return order === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return order === 'asc' ? 1 : -1;
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      
      return 0;
    });
  }, [order, orderBy, rows]);

  // Pagination
  const paginatedRows = sortedRows().slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Check if row is selected
  const isSelected = (row: T) => {
    const rowId = getRowId?.(row) ?? (row as any).id;
    return selected.some((item) => getRowId?.(item) === rowId);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = 
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <StyledTableContainer>
          <StyledTable stickyHeader={stickyHeader}>
            <TableHead>
              <TableRow>
                {showCheckboxes && (
                  <StyledTableCell padding="checkbox" sx={{ width: '48px' }}>
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < paginatedRows.length
                      }
                      checked={
                        paginatedRows.length > 0 && selected.length === paginatedRows.length
                      }
                      onChange={handleSelectAllClick}
                      size="small"
                      sx={{ padding: '4px' }}
                    />
                  </StyledTableCell>
                )}
                {columns.map((column) => {
                  const headerAlign = column.headerAlign || column.align || 'left';
                  return (
                    <StyledTableCell
                      key={column.id as string}
                      align={headerAlign}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width || 'auto',
                        position: 'relative',
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex',
                          justifyContent: headerAlign === 'right' ? 'flex-end' : 
                                    headerAlign === 'center' ? 'center' : 'flex-start',
                          '&:hover': column.sortable ? { color: 'primary.main' } : {}
                        }}
                      >
                        {column.sortable ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={() => column.sortable && handleRequestSort(column.id)}
                            sx={{
                              '&.Mui-active': {
                                color: 'inherit',
                                '& .MuiTableSortLabel-icon': {
                                  color: 'primary.main',
                                },
                              },
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          <span>{column.label}</span>
                        )}
                      </Box>
                      <ResizeHandle 
                        onMouseDown={(e) => handleResizeStart(column.id, e)}
                        className={resizingRef.current.columnId === column.id ? 'active' : ''}
                      />
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ 
                      '&:hover': { 
                        cursor: onRowClick ? 'pointer' : 'default',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                      },
                    }}
                  >
                    {showCheckboxes && (
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => {}}
                          size="small"
                          sx={{ padding: '4px' }}
                        />
                      </StyledTableCell>
                    )}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell
                          key={column.id as string}
                          align={column.align || 'left'}
                          onClick={() => onRowClick?.(row)}
                          sx={{
                            color: 'text.primary',
                            '&:first-of-type': {
                              pl: 3,
                            },
                            '&:last-child': {
                              pr: 3,
                            },
                          }}
                        >
                          {column.format ? column.format(value, row) : String(value ?? '')}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={columns.length + (showCheckboxes ? 1 : 0)} />
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
        <StyledTablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
          SelectProps={{
            size: 'small',
            sx: {
              margin: '0 8px',
              '& .MuiSelect-select': {
                padding: '6px 32px 6px 8px',
              },
            },
          }}
          sx={{
            '& .MuiTablePagination-select': {
              marginRight: '16px',
              marginLeft: '8px',
            },
            '& .MuiTablePagination-actions': {
              marginLeft: '20px',
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default DataTable;
