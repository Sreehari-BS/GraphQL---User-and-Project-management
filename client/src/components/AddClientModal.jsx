import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS } from "./queries/clientQueries";
import { useMutation } from "@apollo/client";

const AddClientModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addClientMutation] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const formSubmit = (e) => {
    e.preventDefault();
    if ((name === "", email === "", phone === "")) {
      return alert("Please fill all the fields");
    }

    addClientMutation(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
    setShow(false);
  };
  return (
    <>
      <Button
        style={{ backgroundColor: "#1695A9" }}
        className="mt-4 d-flex align-items-center text-white"
        variant="light"
        onClick={handleShow}
      >
        <FaUser style={{ marginRight: "8px" }} />
        <div>Add Client +</div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1695A9" }}>Add Client</Modal.Title>
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
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="danger"
                style={{ marginRight: "8px" }}
                onClick={() => setShow(false)}
              >
                Close
              </Button>
              <Button type="submit" style={{ backgroundColor: "#1695A9" }}>
                SUBMIT
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClientModal;
