import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell as MuiTableCell,
  TableContainer,
  Paper,
} from "@mui/material"
import type { TableProps as MuiTableProps } from "@mui/material"
import React from "react"

export interface TableProps extends MuiTableProps {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ children, ...props }, ref) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable ref={ref} {...props}>
        {children}
      </MuiTable>
    </TableContainer>
  )
})
Table.displayName = "Table"

export interface TableHeaderProps {
  children: React.ReactNode
  className?: string
}

export function TableHeader({ children, className, ...props }: TableHeaderProps) {
  return (
    <TableHead className={className} {...props}>
      {children}
    </TableHead>
  )
}

export interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

export function TableBodyComponent({ children, className, ...props }: TableBodyProps) {
  return (
    <TableBody className={className} {...props}>
      {children}
    </TableBody>
  )
}

export interface TableRowProps {
  children: React.ReactNode
  className?: string
}

export function TableRowComponent({ children, className, ...props }: TableRowProps) {
  return (
    <TableRow className={className} {...props}>
      {children}
    </TableRow>
  )
}

export interface TableHeadCellProps {
  children: React.ReactNode
  className?: string
}

export function TableHead({ children, className, ...props }: TableHeadCellProps) {
  return (
    <MuiTableCell component="th" className={className} {...props}>
      {children}
    </MuiTableCell>
  )
}

export interface TableCellProps {
  children: React.ReactNode
  className?: string
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <MuiTableCell className={className} {...props}>
      {children}
    </MuiTableCell>
  )
}

export { Table }

