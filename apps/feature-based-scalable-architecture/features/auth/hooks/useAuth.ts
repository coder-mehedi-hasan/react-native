import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/auth.service';
import { LoginPayload, SignupPayload } from '../types';
import { storage } from '../../../shared/services/storage';

const AUTH_QUERY_KEY = ['auth'] as const;

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'user'], data.user);
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'token'], data.token);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignupPayload) => authApi.signup(payload),
    onSuccess: (data) => {
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'user'], data.user);
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'token'], data.token);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'user'], null);
      queryClient.setQueryData([...AUTH_QUERY_KEY, 'token'], null);
      queryClient.clear();
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: [...AUTH_QUERY_KEY, 'current'],
    queryFn: () => authApi.getCurrentUser(),
  });
}
