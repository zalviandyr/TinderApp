import { axiosInstance } from "@/lib/axios";
import { IUser } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export const UserService = {
  useLogin: () =>
    useMutation<IUser, Error, string>({
      mutationFn: async (deviceId: string) => {
        const response = await axiosInstance.post<IUser>("/user", { device_id: deviceId });

        return response.data;
      },
    }),
};
