import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{phonenumber}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Link to={"editclient"} state={id}>
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
