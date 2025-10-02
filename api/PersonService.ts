import { axiosInstance } from "@/lib/axios";
import { IPerson } from "@/types/person";
import { useQuery } from "@tanstack/react-query";

export const PersonService = {
  useGetPersons: () =>
    useQuery<IPerson[]>({
      queryKey: ["get-persons"],
      queryFn: async () => {
        const response = await axiosInstance.get("/person");

        return response.data;
      },
    }),
};
