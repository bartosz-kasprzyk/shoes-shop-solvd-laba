import type { Order, Transaction } from '../types';

export function mapTransactionToOrder(transaction: Transaction): Order {
  const cart = JSON.parse(transaction.metadata.cart ?? '[]');

  return {
    orderId: transaction.metadata.orderId ?? 'unknown',
    amount: transaction.amount ?? 0,
    productsQuantity: cart.length,
    date: new Intl.DateTimeFormat('de-DE').format(
      new Date((transaction.created ?? 0) * 1000),
    ),
    delivery:
      Object.values(transaction.shipping?.address ?? {})
        .filter(Boolean)
        .join(', ') || 'No address',
    contacts: `${transaction.shipping?.name ?? 'Name'}, ${transaction.shipping?.phone ?? 'Phone'}, ${transaction.metadata.email ?? 'Email'}`,
    payment: 'Card',
    products: cart.map((product: any, index: number) => ({
      id: product.id ?? index + 1,
      name: product.name ?? 'Unnamed product',
      price: product.price ?? 0,
      quantity: product.quantity ?? 1,
      imageUrl: product.img?.src ?? '/shoe-welcome.png',
      gender: product.gender ?? 'unisex',
      size: product.size ?? 'N/A',
    })),
  };
}
