import { Issue } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";

const getIssues = async (): Promise<Array<Issue>> => {
  const { data } = await githubApi.get<Array<Issue>>("/issues");

  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssues);

  return { issuesQuery };
};
