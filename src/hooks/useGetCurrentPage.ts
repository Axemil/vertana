import { useSearchQuery } from "./useSearchQuery";

export function useGetCurrentPage() {
	const { list }: { list?: string } = useSearchQuery();
	const currentPage = parseInt(list) ? Math.abs(parseInt(list)) : 1;
	return currentPage;
}
