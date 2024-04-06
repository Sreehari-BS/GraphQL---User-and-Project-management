import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import Table from "react-bootstrap/Table";
import { GET_CLIENTS } from "./queries/clientQueries";
import Spiner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spiner />;
  if (error) return <p>Somothing went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <Table className="container mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client, index) => (
              <ClientRow key={client.id} client={client} index={index} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Clients;
