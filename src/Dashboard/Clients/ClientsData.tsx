import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type ClientsDataProps = {
  id: number;
  name: string;
  phonenumber: string;
};

function ClientsData({ id, name, phonenumber }: ClientsDataProps) {
  const navigate = useNavigate();

  const handleEditclient = () => {
    // No need to pass the id here as it's already available in the component
    navigate("editclient");
  };

  return (
    <tr key={"client" + id.toString()}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{phonenumber}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="sm"
            className=" mr-2"
            style={{ width: "25%" }}
            onClick={handleEditclient}
          >
            Edit
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ClientsData;
