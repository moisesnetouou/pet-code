export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedQuery {
  page?: number;
  limit?: number;
}

export function getPaginationParams(query: PaginatedQuery): PaginationParams {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, Math.max(1, query.limit || 20));

  return { page, limit };
}

export function calculatePagination(
  total: number,
  page: number,
  limit: number,
): PaginationResult<unknown>["pagination"] {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
  };
}

export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
