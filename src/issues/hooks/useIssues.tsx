import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../helpers/sleep";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (
  labels: Array<string>,
  state?: State
): Promise<Array<Issue>> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubApi.get<Array<Issue>>("/issues", { params });

  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );

  return { issuesQuery };
};
