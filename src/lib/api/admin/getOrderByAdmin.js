import { protectedFetch } from "@/lib/core/server"

export const getOrderByAdmin = async (filters = {}) => {
  const { search, status } = filters;
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (status && status !== 'all') params.append('status', status);

  const queryString = params.toString();
  const url = `/api/admin/orders${queryString ? `?${queryString}` : ''}`;

  return protectedFetch(url);
}