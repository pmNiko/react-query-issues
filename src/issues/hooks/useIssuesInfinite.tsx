import { useInfiniteQuery } from "@tanstack/react-query";
import { sleep } from "../../helpers";
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParams?: number;
  queryKey: Array<string | Props>;
}

const getIssues = async ({ pageParams = 1, queryKey }: QueryProps) => {
  const [, , args] = queryKey;
  const { labels, state } = args as Props;
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", pageParams.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });

  return data;
};

export const useIssuesInfinite = ({ labels, state }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels }],
    getIssues,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;

        return pages.length + 1;
      },
    }
  );

  return { issuesQuery };
};
