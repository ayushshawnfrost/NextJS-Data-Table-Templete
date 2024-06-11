"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



const Limit = ({ initialLimit }: { initialLimit: string }) => {
  const [limit, setLimit] = useState(initialLimit);
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
    const newUrl = pathname + "?" + createQueryString("limit", limit);
    if (limit) {
      router.push(newUrl);
    } else {
      router.push(pathname);
    }
  }, [limit, pathname, router, createQueryString]);

  return (
    <div className="flex items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Rows per page: {limit}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={limit} onValueChange={setLimit}>
            <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Limit;
