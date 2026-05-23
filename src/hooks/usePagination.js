import { useMemo, useState } from "react";

export function usePagination(data = [], pageSize = 6) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const next = () => setPage(p => Math.min(p + 1, totalPages || 1));
  const prev = () => setPage(p => Math.max(p - 1, 1));

  const goToPage = (p) => setPage(p);

  return {
    page,
    totalPages,
    paginated,
    next,
    prev,
    goToPage,
    setPage,
  };
}