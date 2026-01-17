
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

import { getCustomersQuery } from '@/api/queries';

export const Route = createFileRoute('/admin/users')({ component: RouteComponent })

function RouteComponent() {
  const { data: customers } = useQuery(getCustomersQuery());

  return <div>
    {customers?.map((customer) => (
      <div key={customer.id}>
        <h1>{customer.name}</h1>
        <p>{customer.email}</p>
      </div>
    ))}
  </div>
}
