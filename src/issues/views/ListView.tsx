import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLaabels, setSelectedLaabel] = useState<Array<string>>([]);
  const [issueState, setIssueState] = useState<State>();
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
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
            issues={issuesQuery.data || []}
            state={issueState}
            onStateChanged={(newState) => setIssueState(newState)}
          />
        )}
        <div className="d-flex m-2 justify-content-between align-item-center">
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isLoading}
            onClick={prevPage}
          >
            Prev
          </button>
          <span>{issuesQuery.isLoading ? "Cargando..." : page}</span>
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isLoading}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
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
