export interface ITableProps<T extends object> {
  data: T[];
  columns: any[];
}