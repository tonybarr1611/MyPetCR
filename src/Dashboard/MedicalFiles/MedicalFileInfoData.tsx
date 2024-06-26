import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
  
  return (
    <tr key={"appointmentNotes" + id.toString()}>
      <td>{id}</td>
      <td>{employee}</td>
      <td>{store}</td>
      <td>{status}</td>
      <td>{dateTime}</td>
      <td className="text-center">
      <Link to={"details"} state={id}>
        <Button variant="primary"
            size="sm"
            className="mr-2"
            style={{ width: "50%" }}>
          Investigate
        </Button>
      </Link>
      </td>
    </tr>
  );
}

export default MedicalFileInfoData;
