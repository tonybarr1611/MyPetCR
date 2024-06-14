import { useParams } from "react-router";

function MedicalFileDetails() {
  const { id } = useParams();

  return (
    // Placeholder just to demonstrate how to retrieve the id from the URL
    <div>
      <h1>Medical File Details</h1>
      <p>Medical File ID: {id}</p>
    </div>
  );
}

export default MedicalFileDetails;
