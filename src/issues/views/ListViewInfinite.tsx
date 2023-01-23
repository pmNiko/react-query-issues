import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../hooks";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [selectedLaabels, setSelectedLaabel] = useState<Array<string>>([]);
  const [issueState, setIssueState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({
    state: issueState,
    labels: selectedLaabels,
  });

  // handler for selected labels
  const onLabelChanged = (labelName: string) => {
    selectedLaabels.includes(labelName)
      ? setSelectedLaabel(
          selectedLaabels.filter((label) => label !== labelName)
        )
      : setSelectedLaabel([...selectedLaabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            // En este caso aplanamos el Array de arrays para devolver un array normal
            // Array de arrays [[1,2,3], [a,b,c] ]  => flat() [1,2,3,a,b,c]
            issues={issuesQuery.data?.pages.flat() || []}
            state={issueState}
            onStateChanged={(newState) => setIssueState(newState)}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLaabels}
          onChange={(lableName) => onLabelChanged(lableName)}
        />
      </div>
    </div>
  );
};
