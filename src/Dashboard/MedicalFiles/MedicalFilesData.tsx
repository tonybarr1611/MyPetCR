import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type MedicalFilesDataProps = {
  id: number;
  petName: string;
  ownerName: string;
  breed: string;
};

function MedicalFilesData({
  id,
  petName,
  ownerName,
  breed,
}: MedicalFilesDataProps) {
  return (
    <tr key={"pet" + id.toString()}>
      <td>{id}</td>
      <td>{petName}</td>
      <td>
        {ownerName.toLowerCase().includes("mockuser")
          ? "Unassigned pet"
          : ownerName}
      </td>
      <td>{breed}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Link to={"info"} state={id}>
            <Button variant="primary" size="sm" className="mr-2">
              View Details
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default MedicalFilesData;
