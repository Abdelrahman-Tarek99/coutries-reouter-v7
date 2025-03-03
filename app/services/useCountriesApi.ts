import { useQuery } from "@tanstack/react-query";
import type { Country } from "~/shared/types";
import { getComment, getComments } from "~/services";
export const useCountriesApi = () => {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: getComments,
  });
};
export const useCountryApi = (id: string) => {
  return useQuery<Country, Error>({
    queryKey: ["country", id],
    queryFn: () => getComment(id),
  });
};
