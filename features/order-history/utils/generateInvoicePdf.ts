import jsPDF from 'jspdf';
import type { Order } from '../types';

interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

export function generateInvoicePdf(
  order: Order,
  companyInfo: CompanyInfo = {
    name: 'Shoes Shop',
    address: '123 Commerce St',
    city: 'Business City, BC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@shoesshop.com',
  },
): void {
  const doc = new jsPDF();

  // Set font
  doc.setFont('helvetica');

  // Header - Invoice title
  doc.setFontSize(28);
  doc.setTextColor(40, 40, 40);
  doc.text('INVOICE', 20, 30);

  // Company Info
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(companyInfo.name, 20, 45);
  doc.text(companyInfo.address, 20, 52);
  doc.text(companyInfo.city, 20, 59);
  doc.text(companyInfo.phone, 20, 66);
  doc.text(companyInfo.email, 20, 73);

  // Invoice details box
  doc.setFillColor(249, 249, 249);
  doc.rect(120, 35, 70, 35, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.rect(120, 35, 70, 35);

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);

  // Create invoice number in format [orderindex-date]
  const invoiceNumber = `[${order.orderId}-${order.date.replace(/\./g, '')}]`;

  doc.text('Invoice #:', 125, 45);
  doc.text(invoiceNumber, 125, 52);
  doc.text('Invoice Date:', 125, 59);
  doc.text(order.date, 125, 66);

  // Bill To section
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Bill To:', 20, 95);

  // Draw a line under "Bill To"
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 98, 60, 98);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  // Parse contacts string (format: "Name, Phone, Email")
  const contactParts = order.contacts.split(', ');
  if (contactParts.length >= 1) doc.text(contactParts[0], 20, 108); // Name
  if (contactParts.length >= 2) doc.text(contactParts[1], 20, 115); // Phone
  if (contactParts.length >= 3) doc.text(contactParts[2], 20, 122); // Email

  // Ship To section
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Ship To:', 120, 95);

  // Draw a line under "Ship To"
  doc.setDrawColor(200, 200, 200);
  doc.line(120, 98, 160, 98);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  // Handle long delivery address by wrapping text
  const deliveryLines = doc.splitTextToSize(order.delivery, 70);
  let deliveryY = 108;
  deliveryLines.forEach((line: string) => {
    doc.text(line, 120, deliveryY);
    deliveryY += 7;
  });

  // Products table
  const tableStartY = Math.max(140, deliveryY + 20);

  // Table header background
  doc.setFillColor(245, 245, 245);
  doc.rect(20, tableStartY - 8, 170, 12, 'F');

  // Table header border
  doc.setDrawColor(200, 200, 200);
  doc.rect(20, tableStartY - 8, 170, 12);

  // Table headers
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('Product', 25, tableStartY - 2);
  doc.text('Size', 100, tableStartY - 2);
  doc.text('Qty', 125, tableStartY - 2);
  doc.text('Price', 145, tableStartY - 2);
  doc.text('Total', 170, tableStartY - 2);

  // Products data
  let currentY = tableStartY + 10;
  let subtotal = 0;

  order.products.forEach((product, index) => {
    // Alternate row background
    if (index % 2 === 1) {
      doc.setFillColor(252, 252, 252);
      doc.rect(20, currentY - 6, 170, 10, 'F');
    }

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    // Product name (truncate if too long)
    const productName =
      product.name.length > 30
        ? product.name.substring(0, 27) + '...'
        : product.name;
    doc.text(productName, 25, currentY);

    // Size
    doc.text(product.size, 100, currentY);

    // Quantity
    doc.text(product.quantity.toString(), 125, currentY);

    // Price - check if price is already in dollars or cents
    // If price is greater than 1000, it's likely in cents, otherwise in dollars
    const price = product.price > 1000 ? product.price / 100 : product.price;
    doc.text(`$${price.toFixed(2)}`, 145, currentY);

    // Total for this product
    const productTotal = price * product.quantity;
    doc.text(`$${productTotal.toFixed(2)}`, 170, currentY);

    subtotal += productTotal;
    currentY += 12;
  });

  // Table border
  doc.setDrawColor(200, 200, 200);
  doc.rect(20, tableStartY - 8, 170, currentY - tableStartY + 8);

  // Summary section
  const summaryStartY = currentY + 15;

  // Summary box
  doc.setFillColor(249, 249, 249);
  doc.rect(130, summaryStartY, 60, 40, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(130, summaryStartY, 60, 40);

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);

  // Subtotal
  doc.text('Subtotal:', 135, summaryStartY + 10);
  doc.text(`$${subtotal.toFixed(2)}`, 175, summaryStartY + 10);

  // Tax and shipping
  // Check if order amount is in cents or dollars
  const orderTotal = order.amount > 1000 ? order.amount / 100 : order.amount;
  const tax = orderTotal - subtotal;
  doc.text('Tax & Shipping:', 135, summaryStartY + 20);
  doc.text(`$${tax.toFixed(2)}`, 175, summaryStartY + 20);

  // Total
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('Total:', 135, summaryStartY + 33);
  doc.text(`$${orderTotal.toFixed(2)}`, 175, summaryStartY + 33);

  // Payment info
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Payment Method: ${order.payment}`, 25, summaryStartY + 15);

  // Footer
  const footerY = summaryStartY + 60;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, footerY, 190, footerY);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('Thank you for your business!', 20, footerY + 15);
  doc.text(
    `For any questions, please contact us at ${companyInfo.email}`,
    20,
    footerY + 25,
  );

  // Page number
  doc.text('Page 1 of 1', 170, footerY + 15);

  // Create invoice number for filename (remove brackets and make it file-safe)
  const fileInvoiceNumber = `${order.orderId}-${order.date.replace(/\./g, '')}`;

  // Download the PDF
  doc.save(`invoice-${fileInvoiceNumber}.pdf`);
}
