import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";

export const ListView = () => {
  const [selectedLaabels, setSelectedLaabel] = useState<Array<string>>([]);
  const { issuesQuery } = useIssues();

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
          <IssueList issues={issuesQuery.data || []} />
        )}
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
