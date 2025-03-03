import axios from "axios";
import type { Country } from "~/shared/types";
import { axiosInstance } from "./axiosInstance";

export const getComments = async (): Promise<Country[]> => {
  try {
    const res = await axiosInstance.get("/all");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch country");
  }
};

export const getComment = async (id: string): Promise<Country> => {
  try {
    const res = await axiosInstance.get(`name/${id}?fullText=true`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch country");
  }
};
