import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type AppointmentsDetailProps = {
  id: number;
  owner: string;
  pet: string;
  veterinary: number;
  store: string;
  status: string;
  dateTime: string; // Check if this should be a Date object
};

function AppointmentsDetail({
  id,
  owner,
  pet,
  veterinary,
  store,
  status,
  dateTime,
}: AppointmentsDetailProps) {
  const navigate = useNavigate();

  const handleEditAppointment = () => {
    // No need to pass the id here as it's already available in the component
    navigate("editappointment/");
  };

  return (
    <tr key={"appointment" + id.toString()}>
      <td>{id}</td>
      <td>{owner}</td>
      <td>{pet}</td>
      <td>{veterinary}</td>
      <td>{store}</td>
      <td>{status}</td>
      <td>{dateTime}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Link to={"editappointment"} state={id}>
            <Button
              variant="primary"
              size="sm"
              className=" mr-2"
              onClick={handleEditAppointment}
            >
              Edit
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default AppointmentsDetail;
