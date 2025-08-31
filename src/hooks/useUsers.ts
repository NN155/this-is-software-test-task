import { UserService } from '@/services/userService'
import { UIUser } from '@/shared/types/user'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type useUsersReturn = {
  users: UIUser[]
  loading: boolean
  error: string | null
  loadMoreUsers: () => void
  hasMore: boolean
  loadingMore: boolean
  saveUser: (user: UIUser) => void
  savingUser: boolean
}

export function useUsers(): useUsersReturn {
  const queryClient = useQueryClient()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => UserService.getUsers(6, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10 * 60 * 1000, // Keep data fresh for 10 minutes
  })

  const users = data?.pages.flat() || []

  // Save user to IndexedDB
  const saveUserMutation = useMutation({
    mutationFn: async (user: UIUser) => {
      await UserService.saveUser(user)
      return user
    },
    onSuccess: () => {
        // Update saved users list
      queryClient.invalidateQueries({ queryKey: ['savedUsers'] })
    },
  })

  return {
    users,
    loading: isLoading,
    error: error?.message || null,
    loadMoreUsers: fetchNextPage,
    hasMore: hasNextPage,
    loadingMore: isFetchingNextPage,
    saveUser: saveUserMutation.mutate,
    savingUser: saveUserMutation.isPending,
  } as useUsersReturn
}