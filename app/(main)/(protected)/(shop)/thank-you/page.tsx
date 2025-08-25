import { ThankYouPage } from '@/features/thank-you/components';

interface ThankYouPageWrapperProps {
  searchParams: Promise<{ orderId?: string; cartId?: string }>;
}

export default async function ThankYouPageWrapper({
  searchParams,
}: ThankYouPageWrapperProps) {
  const awaitedSearchParams = await searchParams;
  const orderNumber = awaitedSearchParams?.orderId;
  return <ThankYouPage orderNumber={orderNumber} />;
}
