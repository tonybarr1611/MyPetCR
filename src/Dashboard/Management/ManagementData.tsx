import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaGavel, FaScroll } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleLog = (id: number) => {
    console.log(`Log for user ${id}`);
    navigate("log", { state: { IDUser: id } });
  };
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
            <FaGavel />
          </Button>
          <Button
            variant="success"
            size="sm"
            className="mr-2"
            onClick={() => handleUpgrade(id)}
          >
            <FaArrowUp />
          </Button>
          <Button
            variant="warning"
            size="sm"
            className="mr-2"
            onClick={() => handleLog(id)}
          >
            <FaScroll />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ManagementData;
