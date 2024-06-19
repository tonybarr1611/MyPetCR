import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logger from "../../log";

type ClientsDataProps = {
  id: number;
  name: string;
  phonenumber: string;
};

function ClientsData({ id, name, phonenumber }: ClientsDataProps) {
  const navigate = useNavigate();

  const handleEditClient = () => {
    navigate(`editclient`);
  };

  const makeLog = () => {
    logger.request(`The user has requested to edit the client ID: ${id}`)
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{phonenumber}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Link to={"editclient"} state={id} onClick={makeLog}>
            <Button variant="primary" size="sm" className="mr-2">
              Edit
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default ClientsData;
