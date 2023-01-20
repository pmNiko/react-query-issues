import { FC } from "react";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Issue, State } from "../interfaces/issue";

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>
            {/* Suggestion: why not make accessing and changing the state possible
            globally? */}
            {issue.title}
          </span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by {issue.user.login}
            <span className="fw-bold">{issue.comments}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
