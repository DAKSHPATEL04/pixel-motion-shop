
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/products/new">
              <Button>Add New Product</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Revenue",
              content: "$12,450",
              description: "+14% from last month",
              icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
              trend: "up"
            },
            {
              title: "Total Orders",
              content: "354",
              description: "+5% from last month",
              icon: <ShoppingBag className="h-5 w-5 text-muted-foreground" />,
              trend: "up"
            },
            {
              title: "Total Products",
              content: "124",
              description: "8 products added this month",
              icon: <Package className="h-5 w-5 text-muted-foreground" />,
              trend: "none"
            },
            {
              title: "Active Users",
              content: "2,345",
              description: "+12% from last month",
              icon: <Users className="h-5 w-5 text-muted-foreground" />,
              trend: "up"
            }
          ].map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.content}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  )}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                {/* In a real implementation, we'd use the Recharts library here */}
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-2024",
                    customer: "Alex Johnson",
                    status: "Delivered",
                    date: "12 Apr 2023",
                    amount: "$129.99"
                  },
                  {
                    id: "ORD-2023",
                    customer: "Sarah Zhang",
                    status: "Processing",
                    date: "11 Apr 2023",
                    amount: "$69.99"
                  },
                  {
                    id: "ORD-2022",
                    customer: "Marcus Reed",
                    status: "Shipped",
                    date: "10 Apr 2023",
                    amount: "$49.99"
                  },
                  {
                    id: "ORD-2021",
                    customer: "Laura Chen",
                    status: "Delivered",
                    date: "09 Apr 2023",
                    amount: "$89.99"
                  }
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customer}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm font-medium">{order.amount}</div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2">
                  <Link to="/admin/orders" className="text-sm text-accent hover:underline">
                    View all orders
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Galaxy Desk Pad",
                    sales: 145,
                    revenue: "$4,350"
                  },
                  {
                    name: "Nebula Gaming Pad XL",
                    sales: 98,
                    revenue: "$3,920"
                  },
                  {
                    name: "RGB Dreams Poster",
                    sales: 67,
                    revenue: "$2,010"
                  },
                  {
                    name: "Minimalist Workspace Poster",
                    sales: 54,
                    revenue: "$1,350"
                  }
                ].map((product, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-12 w-12 rounded bg-muted mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.sales} sales
                      </div>
                    </div>
                    <div className="font-medium">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Galaxy Desk Pad",
                    stock: 45,
                    status: "In Stock"
                  },
                  {
                    name: "Cyberpunk Poster (L)",
                    stock: 5,
                    status: "Low Stock"
                  },
                  {
                    name: "RGB Dreams Pad XL",
                    stock: 0,
                    status: "Out of Stock"
                  },
                  {
                    name: "Minimalist Desk Pad",
                    stock: 28,
                    status: "In Stock"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.stock} in stock
                      </div>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        item.status === "In Stock" 
                          ? "bg-green-100 text-green-800" 
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New order placed",
                    details: "Order #2024",
                    time: "2 minutes ago"
                  },
                  {
                    action: "Product stock updated",
                    details: "Galaxy Desk Pad",
                    time: "15 minutes ago"
                  },
                  {
                    action: "New user registered",
                    details: "James Wilson",
                    time: "1 hour ago"
                  },
                  {
                    action: "New review submitted",
                    details: "RGB Dreams Poster",
                    time: "3 hours ago"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-2 w-2 mt-2 rounded-full bg-accent"></div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.details}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
