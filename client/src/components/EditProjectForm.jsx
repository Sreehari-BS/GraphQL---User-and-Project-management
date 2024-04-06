import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "./queries/projectQueries";
import { UPDATE_PROJECT } from "./mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProjectMutation] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const updateProject = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProjectMutation(name, description, status)
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={updateProject}>
        <div className="mb-4">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          className="btn text-white"
          style={{ backgroundColor: "#1BB1AF" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
