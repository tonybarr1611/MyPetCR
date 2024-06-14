import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleViewPetDetails = () => {
    // No need to pass the id here as it's already available in the component
    navigate(`medicalfileInfo`);
    //navigate(`petdetails/${id}`);
  };

  return (
    <tr key={"pet" + id.toString()}>
      <td>{id}</td>
      <td>{petName}</td>
      <td>{ownerName}</td>
      <td>{breed}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="sm"
            className="mr-2"
            style={{ width: "50%" }}
            onClick={handleViewPetDetails}
          >
            View Details
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default MedicalFilesData;
