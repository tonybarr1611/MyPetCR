import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getClientInvoices } from "../../Functions";

interface Sale {
  id: number;
  date: string;
  total: number;
  status: string;
}

function History() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    async function fetchSales() {
      const invoices = await getClientInvoices();
      setSales(invoices);
    }
    fetchSales();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Sales History</h1>
      <Table striped bordered hover responsive>
        <thead>
          <th>Invoice ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.date}</td>
              <td>
                {(sale.total || 0).toLocaleString("es-CR", {
                  style: "currency",
                  currency: "CRC",
                })}
              </td>
              <td>{sale.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default History;
