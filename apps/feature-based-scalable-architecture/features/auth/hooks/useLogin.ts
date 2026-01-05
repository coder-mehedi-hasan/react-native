import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

export function useLogin() {
  const setUser = useAuthStore(state => state.setUser);

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: user => {
      setUser(user);
    },
  });

  return mutation;
}
