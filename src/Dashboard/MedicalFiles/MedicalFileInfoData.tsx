import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type MedicalFileInfoDataProps = {
  id: number;
  employee: string;
  store: string;
  status: string;
  dateTime: string; // Check if this should be a Date object\
};

function MedicalFileInfoData({
  id,
  employee,
  store,
  status,
  dateTime,
}: MedicalFileInfoDataProps) {
  const navigate = useNavigate();

  const handleInvestigateAppointment = () => {
    navigate(`details`);
  };

  return (
    <tr key={"appointmentNotes" + id.toString()}>
      <td>{id}</td>
      <td>{employee}</td>
      <td>{store}</td>
      <td>{status}</td>
      <td>{dateTime}</td>
      <td className="text-center">
        <Button
          variant="primary"
          size="sm"
          onClick={handleInvestigateAppointment}
        >
          Investigate
        </Button>
      </td>
    </tr>
  );
}

export default MedicalFileInfoData;
