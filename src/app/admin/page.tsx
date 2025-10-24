"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Package,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  MessageSquare,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check if user is admin (mock implementation)
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "ADMIN" && parsedUser.role !== "SUPER_ADMIN") {
      window.location.href = "/dashboard";
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const adminStats = {
    totalUsers: 1247,
    totalResources: 342,
    totalBookings: 89,
    totalRevenue: 458000,
    pendingReviews: 12,
    reportedIssues: 8,
    todayActivity: 156,
    monthlyGrowth: 23,
  };

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "USER",
      joined: "2025-01-15",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "CREATOR",
      joined: "2025-01-14",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "USER",
      joined: "2025-01-13",
      status: "PENDING",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "USER",
      joined: "2025-01-12",
      status: "SUSPENDED",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      user: "John Doe",
      resource: "Office Space A",
      amount: 2500,
      status: "COMPLETED",
      date: "2025-01-15",
    },
    {
      id: 2,
      user: "Jane Smith",
      resource: "Legal Template Pack",
      amount: 800,
      status: "PENDING",
      date: "2025-01-15",
    },
    {
      id: 3,
      user: "Bob Johnson",
      resource: "Equipment Rental",
      amount: 3500,
      status: "CANCELLED",
      date: "2025-01-14",
    },
    {
      id: 4,
      user: "Alice Brown",
      resource: "Consulting Session",
      amount: 1500,
      status: "COMPLETED",
      date: "2025-01-14",
    },
  ];

  const reportedIssues = [
    {
      id: 1,
      reporter: "John Doe",
      issue: "Resource availability mismatch",
      resource: "Office Space A",
      status: "OPEN",
      date: "2025-01-15",
    },
    {
      id: 2,
      reporter: "Jane Smith",
      issue: "Payment processing error",
      resource: "Legal Template Pack",
      status: "IN_PROGRESS",
      date: "2025-01-15",
    },
    {
      id: 3,
      reporter: "Bob Johnson",
      issue: "Content copyright violation",
      resource: "Business Plan Template",
      status: "RESOLVED",
      date: "2025-01-14",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">SourceKom Admin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link href="/admin" className="text-foreground font-semibold">
              Admin Panel
            </Link>
            <Link
              href="/resources"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/legal"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Legal Services
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage platform operations, users, and content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant={user.role === "SUPER_ADMIN" ? "default" : "secondary"}
              >
                {user.role}
              </Badge>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminStats.totalResources}
              </div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                SAR {adminStats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total platform revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminStats.reportedIssues}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending resolution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Users</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "CREATOR"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "ACTIVE"
                                  ? "default"
                                  : user.status === "PENDING"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Bookings</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.user}</TableCell>
                          <TableCell>{booking.resource}</TableCell>
                          <TableCell>
                            SAR {booking.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                booking.status === "COMPLETED"
                                  ? "default"
                                  : booking.status === "PENDING"
                                    ? "secondary"
                                    : booking.status === "CANCELLED"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Reported Issues */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Reported Issues</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportedIssues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell>{issue.reporter}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{issue.issue}</div>
                              <div className="text-sm text-muted-foreground">
                                {issue.resource}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                issue.status === "OPEN"
                                  ? "destructive"
                                  : issue.status === "IN_PROGRESS"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {issue.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{issue.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Platform Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>
                    Real-time platform monitoring and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">System Status</p>
                          <p className="text-sm text-muted-foreground">
                            All systems operational
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Payment Processing</p>
                          <p className="text-sm text-muted-foreground">
                            3 transactions pending
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Attention</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Database</p>
                          <p className="text-sm text-muted-foreground">
                            Optimal performance
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Good</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">User Activity</p>
                          <p className="text-sm text-muted-foreground">
                            {adminStats.todayActivity} active today
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Normal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage registered users and their permissions
                    </CardDescription>
                  </div>
                  <Button>Add User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="CREATOR">Creator</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "CREATOR" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "ACTIVE"
                                ? "default"
                                : user.status === "PENDING"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resource Management</CardTitle>
                    <CardDescription>
                      Monitor and manage platform resources
                    </CardDescription>
                  </div>
                  <Button>Review New Resources</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            Business Plan Template
                          </div>
                          <div className="text-sm text-muted-foreground">
                            SAR 150
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Template</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>234</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            Office Space Directory
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Free
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Space</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>456</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>
                    Platform revenue trends and projections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Monthly Revenue</span>
                      <span className="font-semibold">
                        SAR {adminStats.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Growth Rate</span>
                      <span className="font-semibold text-green-600">
                        +{adminStats.monthlyGrowth}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Transaction</span>
                      <span className="font-semibold">SAR 2,150</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Commission Earned</span>
                      <span className="font-semibold">SAR 68,700</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>
                    Platform performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Uptime</span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Response Time</span>
                      <span className="font-semibold">245ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Users</span>
                      <span className="font-semibold">
                        {adminStats.todayActivity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Server Load</span>
                      <span className="font-semibold">Normal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <IntegrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Integrations Tab Component
function IntegrationsTab() {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState({
    supabaseUrl: '',
    supabaseAnonKey: '',
    myfatoorahApiKey: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/admin/integrations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          const settingsMap = data.settings.reduce((acc: any, s: any) => {
            acc[s.key] = s.value || '';
            return acc;
          }, {});

          setSettings({
            supabaseUrl: settingsMap['NEXT_PUBLIC_SUPABASE_URL'] || '',
            supabaseAnonKey: settingsMap['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || '',
            myfatoorahApiKey: settingsMap['MYFATOORAH_API_KEY'] || ''
          });
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async (category: 'supabase' | 'myfatoorah') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const settingsToSave = category === 'supabase' ? [
        { key: 'NEXT_PUBLIC_SUPABASE_URL', value: settings.supabaseUrl, isSecret: false, category: 'database' },
        { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: settings.supabaseAnonKey, isSecret: true, category: 'database' }
      ] : [
        { key: 'MYFATOORAH_API_KEY', value: settings.myfatoorahApiKey, isSecret: true, category: 'payments' }
      ];

      const res = await fetch('/api/admin/integrations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ settings: settingsToSave })
      });

      if (res.ok) {
        alert('Settings saved successfully');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const testIntegration = async (integration: 'supabase' | 'myfatoorah') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/admin/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ integration })
      });

      const data = await res.json();
      setTestResults(prev => ({
        ...prev,
        [integration]: data.success ? '✓ Connection successful' : `✗ ${data.message}`
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [integration]: '✗ Test failed'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase</CardTitle>
          <CardDescription>Configure Supabase project and anon key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project URL</label>
              <Input
                value={settings.supabaseUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, supabaseUrl: e.target.value }))}
                placeholder="https://xxxxx.supabase.co"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Anon Key</label>
              <Input
                value={settings.supabaseAnonKey}
                onChange={(e) => setSettings(prev => ({ ...prev, supabaseAnonKey: e.target.value }))}
                placeholder="anon key"
                type="password"
              />
            </div>
            {testResults.supabase && (
              <Alert>
                <AlertDescription>{testResults.supabase}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button onClick={() => saveSettings('supabase')} disabled={loading}>
                Save
              </Button>
              <Button onClick={() => testIntegration('supabase')} variant="outline" disabled={loading}>
                Test Connection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MyFatoorah</CardTitle>
          <CardDescription>Configure API key and verify connectivity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">API Key</label>
              <Input
                value={settings.myfatoorahApiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, myfatoorahApiKey: e.target.value }))}
                placeholder="api key"
                type="password"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Callback URL: {process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/callback
            </div>
            {testResults.myfatoorah && (
              <Alert>
                <AlertDescription>{testResults.myfatoorah}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button onClick={() => saveSettings('myfatoorah')} disabled={loading}>
                Save
              </Button>
              <Button onClick={() => testIntegration('myfatoorah')} variant="outline" disabled={loading}>
                Test Connection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
