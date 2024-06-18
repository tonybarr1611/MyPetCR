import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type AppointmentsDetailProps = {
  appointment: {
    id: number;
    owner: string;
    pet: string;
    veterinary: string;
    store: string;
    status: string;
    dateTime: string; // Check if this should be a Date object
  };
};

function AppointmentsDetail({
  appointment
}: AppointmentsDetailProps) {
  const navigate = useNavigate();

  const handleEditAppointment = () => {
    navigate("editappointment/", { state: { id: appointment.id } });
  };

  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{appointment.owner}</td>
      <td>{appointment.pet}</td>
      <td>{appointment.veterinary}</td>
      <td>{appointment.store}</td>
      <td>{appointment.status}</td>
      <td>{appointment.dateTime}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
        <Link to={"editappointment"} 
                state={appointment.id}> 
          <Button
            variant="primary"
            size="sm"
            className="mr-2"
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
