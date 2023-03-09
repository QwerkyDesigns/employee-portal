import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  };

  return (
    <DashboardLayout pageName="Stripe Success">
      <div className="m-12 p-12">
        <h1>Thank you so much for topping up your account!</h1>
        <p>
          Let us know right away if you encounter any problems or have any
          feature requests!
        </p>
        <button onClick={onClick} />
      </div>
    </DashboardLayout>
  );
}
