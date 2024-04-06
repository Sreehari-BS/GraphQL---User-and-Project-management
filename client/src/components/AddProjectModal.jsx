import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./queries/clientQueries";
import { ADD_PROJECT } from "./mutations/projectMutations";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./queries/projectQueries";

const AddProjectModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProjectMutation] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addproject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addproject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return "Something went wrong";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please fill all the fields");
    }

    addProjectMutation(name, description, clientId, status);

    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
    setShow(false);
  };
  return (
    <>
      {!loading && !error && (
        <>
          <Button
            style={{ backgroundColor: "#1BB1AF" }}
            className="mt-4 d-flex align-items-center text-white"
            variant="light"
            onClick={handleShow}
          >
            <FaUser style={{ marginRight: "8px" }} />
            <div>Add Project +</div>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#1BB1AF" }}>
                Add Project
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formSubmit}>
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
                <div className="mb-4">
                  <label className="form-label">Client</label>
                  <select
                    id="clientId"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="danger"
                    style={{ marginRight: "8px" }}
                    onClick={() => setShow(false)}
                  >
                    Close
                  </Button>
                  <Button type="submit" style={{ backgroundColor: "#1BB1AF" }}>
                    SUBMIT
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
