import { axiosInstance } from "@/lib/axios";
import { IAction } from "@/types/action";
import { useMutation, useQuery } from "@tanstack/react-query";

type ISaveAction = {
  personId: string;
  userId: string;
  status: "LIKE" | "DISLIKE";
};

type IDeleteAction = {
  personId: string;
  userId: string;
};

export const ActionService = {
  useAll: (deviceId: string) =>
    useQuery<IAction[]>({
      queryKey: ["action-all"],
      queryFn: async () => {
        const response = await axiosInstance.get("/action", {
          params: {
            device_id: deviceId,
          },
        });

        return response.data as IAction[];
      },
    }),

  useSave: () =>
    useMutation({
      mutationFn: async (data: ISaveAction) => {
        await axiosInstance.post("/action", {
          person_id: data.personId,
          user_id: data.userId,
          status: data.status,
        });
      },
    }),

  useDelete: () =>
    useMutation({
      mutationFn: async (data: IDeleteAction) => {
        await axiosInstance.delete(`/action/destroy-by-person`, {
          data: { person_id: data.personId, user_id: data.userId },
        });
      },
    }),
};
