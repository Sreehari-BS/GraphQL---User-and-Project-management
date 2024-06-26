import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title">{project.name}</h4>
            <Link className="btn btn-light" to={`/projects/${project.id}`}>
              View
            </Link>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
