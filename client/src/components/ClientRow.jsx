import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "./mutations/clientMutations";
import { GET_CLIENTS } from "./queries/clientQueries";
import { GET_PROJECTS } from "./queries/projectQueries";

const ClientRow = ({ client, index }) => {
  const [ deleteClientMutation ] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //without using caching
    refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
    //to update the clientlist using InMemoryCache
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  return (
    <tr>
      <td>{index+1}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClientMutation}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
