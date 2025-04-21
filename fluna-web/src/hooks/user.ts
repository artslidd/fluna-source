import { useQuery } from "@tanstack/react-query";
import { api } from "@ui/lib/api";

interface UserMetadata {
  email: string;
  first_name: string;
  last_name: string;
  business_name: string;
}

interface GetMeResponse {
  user: { user_metadata: UserMetadata };
}

export function useGetUser() {
  const { data } = useQuery<GetMeResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth/users/me");
      return response.data;
    },
  });

  return { me: data?.user.user_metadata };
}
