import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ITableProps } from "../../../../app/types/table";
import Alert from "../Alert/Alert";
import Modal from "../Modal/Modal";
import { TableContainer, TBody, THead } from "./Table.style";

function Table<T extends { id: string | undefined }>({ data, columns }: ITableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th>Ações</th>
            </tr>
          ))}
        </THead>

        <TBody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <Modal id={row.original.id} viewMode='view' />
                <Modal id={row.original.id} viewMode='edit' />
                <Alert id={row.original.id as string} />
              </td>
            </tr>
          ))}
        </TBody>
      </table>
    </TableContainer>
  );
}

export default Table;