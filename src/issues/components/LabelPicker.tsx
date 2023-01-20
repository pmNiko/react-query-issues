import { FC } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: Array<string>;
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const labelsQuery = useLabels();

  // isLoading vs isFetching --
  // isLoading será false si hay data en cache
  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
