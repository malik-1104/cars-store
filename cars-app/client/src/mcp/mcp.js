const MCP_BASE = 'http://localhost:3000/mcp';

export async function getCarsData() {
  const response = await fetch(`${MCP_BASE}/cars`);
  if (!response.ok) throw new Error('Failed to load cars data');
  return response.json();
}

export async function getSalesData() {
  const response = await fetch(`${MCP_BASE}/sales`);
  if (!response.ok) throw new Error('Failed to load sales data');
  return response.json();
}

export async function getInspectionsData() {
  const response = await fetch(`${MCP_BASE}/inspections`);
  if (!response.ok) throw new Error('Failed to load inspections data');
  return response.json();
}
