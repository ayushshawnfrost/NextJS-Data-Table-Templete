import { ColumnDef } from "@tanstack/react-table";
import Search from "@app/users/(pagination)/search";
import Limit from "@app/users/(pagination)/limit";
import Pagination from "@app/users/(pagination)/pagination";
import { DataTable } from "@components/data-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialPage: number;
  initialLimit: string;
  initialSearch: string;
}

export function UsersTable<TData, TValue>({
  columns,
  data,
  initialPage,
  initialLimit,
  initialSearch,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Search initialSearch={initialSearch} />
        </div>
        <Limit initialLimit={initialLimit} />
      </div>
      <div className="rounded-md border">
        <DataTable columns={columns} data={data} />
      </div>
      <Pagination initialPage={initialPage} tableData_length={data.length} />
    </>
  );
}
