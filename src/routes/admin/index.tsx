import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getDashboardStatsQuery } from '@/api/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/admin/')({ component: RouteComponent });

function RouteComponent() {
  const { data: stats, isLoading } = useQuery(getDashboardStatsQuery());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="size-10" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Total number of customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.customersCount ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Total number of products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.productsCount ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Total number of orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.ordersCount ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Customers</CardTitle>
            <CardDescription>Top 5 customers by total spent</CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.bestCustomers && stats.bestCustomers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.bestCustomers.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground text-sm">{item.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.totalOrders}</TableCell>
                      <TableCell className="text-right">${item.totalSpent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-sm">No customer data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Pending Orders</CardTitle>
            <CardDescription>Latest 5 pending orders</CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.recentPendingOrders && stats.recentPendingOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentPendingOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {order.customer?.name || 'Unknown Customer'}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {order.customer?.email || ''}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${order.total}</TableCell>
                      <TableCell className="text-right">{formatDate(order.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-sm">No pending orders</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
