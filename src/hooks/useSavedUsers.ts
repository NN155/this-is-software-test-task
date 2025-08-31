import { UserService } from '@/services/userService'
import { UIUser } from '@/shared/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSavedUsers() {
  const queryClient = useQueryClient()

  const {
    data: savedUsers = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['savedUsers'],
    queryFn: async (): Promise<UIUser[]> => {
      if (typeof window !== 'undefined') {
        return await UserService.getSavedUsers()
      }
      return []
    },
    staleTime: 5 * 60 * 1000,
  })

  const removeUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await UserService.removeUser(userId)
      return userId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedUsers'] })
    },
  })

  return {
    savedUsers,
    loading,
    error: error?.message || null,
    removeUser: removeUserMutation.mutate,
    loadSavedUsers: () => queryClient.invalidateQueries({ queryKey: ['savedUsers'] }),
  }
}
