"use client";

import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = ({ initialSearch }: { initialSearch: string }) => {
  const [searchText, setSearchText] = useState(initialSearch);
  const [debouncedSearchText] = useDebounce(searchText, 750);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const newUrl = pathname + "?" + createQueryString("search", debouncedSearchText);
    if (debouncedSearchText) {
      router.push(newUrl);
    } else {
      router.push(pathname);
    }
  }, [debouncedSearchText, pathname, router, createQueryString]);

  return (
    <div className="relative rounded-md shadow-sm">
      <Input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Search by Username/Email"
        className="max-w-sm"
      />
    </div>
  );
};

export default Search;
