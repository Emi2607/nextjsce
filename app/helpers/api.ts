import { mockInvoices } from '../lib/mock-data';

export async function fetchInvoicesPages(query = '', currentPage = 1) {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const itemsPerPage = 10;
  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.customer_name.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const invoicesForCurrentPage = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  return {
    invoices: invoicesForCurrentPage,
    totalPages
  };
}