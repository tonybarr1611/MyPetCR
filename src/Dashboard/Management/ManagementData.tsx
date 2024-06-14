import { Button } from "react-bootstrap";
import { FaArrowUp, FaGavel } from "react-icons/fa6";

type ManagementProps = {
  id: number;
  user: string;
  role: string;
};

function ManagementData({ id, user, role }: ManagementProps) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{user}</td>
      <td>{role}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Button
            variant="danger"
            size="sm"
            className=" mr-2"
            style={{ width: "20%", opacity: 0.85 }}
          >
            {/* Revoke {"     "} */}
            <FaGavel />
          </Button>
          <Button
            variant="success"
            size="sm"
            className=" mr-2"
            style={{ width: "20%", opacity: 0.85 }}
          >
            {/* Grant {"     "} */}
            <FaArrowUp />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ManagementData;
