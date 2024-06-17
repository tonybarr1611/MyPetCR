import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type ManagementDataProps = {
  id: number;
  user: string;
  role: string;
  handleUpgrade: (id: number) => void;
  handleDowngrade: (id: number) => void;
};

const ManagementData: React.FC<ManagementDataProps> = ({
  id,
  user,
  role,
  handleUpgrade,
  handleDowngrade,
}) => {
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
            className="mr-2"
            onClick={() => handleDowngrade(id)}
          >
            <FaArrowDown />
          </Button>
          <Button
            variant="success"
            size="sm"
            className="mr-2"
            onClick={() => handleUpgrade(id)}
          >
            <FaArrowUp />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ManagementData;
