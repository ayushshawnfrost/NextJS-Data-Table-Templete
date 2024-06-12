import { Suspense } from "react";
import { User, columns } from "./(table)/columns";
import { UsersTable } from "./(table)/usersTable";

async function fetchUsers(
  page: number,
  limit: string,
  search: string
): Promise<User[]> {
  const res = await fetch(
    `https://665621609f970b3b36c4625e.mockapi.io/users?page=${page}&limit=${limit}&search=${search}`
  );
  const data = await res.json();
  return data;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; limit: string; search: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ?? "5";
  const search = searchParams.search || "";
  const data = await fetchUsers(page, limit, search);

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">All Users</h1>
        <Suspense
          key={
            searchParams.page +
            "" +
            searchParams.search +
            "" +
            searchParams.limit
          }
          fallback={<div>Loading...</div>}
        >
          <div className="border border-gray-300 rounded-lg p-4">
            <UsersTable
              columns={columns}
              data={data}
              initialPage={page}
              initialLimit={limit}
              initialSearch={search}
            />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
