import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Wallet, DollarSign, Target, LogOut, CreditCard, History, Users, ArrowRight, Zap, Award, Clock, Eye, BarChart3, PieChart, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  full_name: string;
  balance: number;
  total_invested: number;
  total_gains: number;
}

interface InvestmentPackage {
  id: string;
  name: string;
  investment_amount: number;
  return_amount: number;
  duration_days: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [packages, setPackages] = useState<InvestmentPackage[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock chart data
  const chartData = [
    { month: "Jan", gains: 2400, invested: 1000 },
    { month: "Feb", gains: 1398, invested: 1500 },
    { month: "Mar", gains: 9800, invested: 2000 },
    { month: "Apr", gains: 3908, invested: 2500 },
    { month: "May", gains: 4800, invested: 3000 },
    { month: "Jun", gains: 3800, invested: 3500 },
  ];

  const chartConfig = {
    gains: {
      label: "Gains",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPackages();
      fetchTransactions();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      // Complete investment plans data with all options
      const mockPackages = [
        // 2 DAYS PLAN
        {
          id: "2days-60",
          name: "2 DAYS PLAN - $60",
          investment_amount: 60,
          return_amount: 1500,
          duration_days: 2
        },
        {
          id: "2days-100",
          name: "2 DAYS PLAN - $100",
          investment_amount: 100,
          return_amount: 2000,
          duration_days: 2
        },
        {
          id: "2days-200",
          name: "2 DAYS PLAN - $200",
          investment_amount: 200,
          return_amount: 3000,
          duration_days: 2
        },
        {
          id: "2days-300",
          name: "2 DAYS PLAN - $300",
          investment_amount: 300,
          return_amount: 4000,
          duration_days: 2
        },
        {
          id: "2days-500",
          name: "2 DAYS PLAN - $500",
          investment_amount: 500,
          return_amount: 5000,
          duration_days: 2
        },
        {
          id: "2days-1000",
          name: "2 DAYS PLAN - $1000",
          investment_amount: 1000,
          return_amount: 10000,
          duration_days: 2
        },
        {
          id: "2days-1500",
          name: "2 DAYS PLAN - $1500",
          investment_amount: 1500,
          return_amount: 15000,
          duration_days: 2
        },
        {
          id: "2days-2000",
          name: "2 DAYS PLAN - $2000",
          investment_amount: 2000,
          return_amount: 20000,
          duration_days: 2
        },
        {
          id: "2days-2500",
          name: "2 DAYS PLAN - $2500",
          investment_amount: 2500,
          return_amount: 25000,
          duration_days: 2
        },
        {
          id: "2days-3000",
          name: "2 DAYS PLAN - $3000",
          investment_amount: 3000,
          return_amount: 30000,
          duration_days: 2
        },
        {
          id: "2days-5000",
          name: "2 DAYS PLAN - $5000",
          investment_amount: 5000,
          return_amount: 50000,
          duration_days: 2
        },
        {
          id: "2days-7000",
          name: "2 DAYS PLAN - $7000",
          investment_amount: 7000,
          return_amount: 70000,
          duration_days: 2
        },
        {
          id: "2days-10000",
          name: "2 DAYS PLAN - $10000",
          investment_amount: 10000,
          return_amount: 100000,
          duration_days: 2
        },
        {
          id: "2days-15000",
          name: "2 DAYS PLAN - $15000",
          investment_amount: 15000,
          return_amount: 150000,
          duration_days: 2
        },
        {
          id: "2days-20000",
          name: "2 DAYS PLAN - $20000",
          investment_amount: 20000,
          return_amount: 200000,
          duration_days: 2
        },
        
        // 3 DAYS PLAN
        {
          id: "3days-1000",
          name: "3 DAYS PLAN - $1000",
          investment_amount: 1000,
          return_amount: 10000,
          duration_days: 3
        },
        {
          id: "3days-1500",
          name: "3 DAYS PLAN - $1500",
          investment_amount: 1500,
          return_amount: 15000,
          duration_days: 3
        },
        {
          id: "3days-2000",
          name: "3 DAYS PLAN - $2000",
          investment_amount: 2000,
          return_amount: 20000,
          duration_days: 3
        },
        {
          id: "3days-2500",
          name: "3 DAYS PLAN - $2500",
          investment_amount: 2500,
          return_amount: 25000,
          duration_days: 3
        },
        {
          id: "3days-3000",
          name: "3 DAYS PLAN - $3000",
          investment_amount: 3000,
          return_amount: 30000,
          duration_days: 3
        },
        {
          id: "3days-5000",
          name: "3 DAYS PLAN - $5000",
          investment_amount: 5000,
          return_amount: 50000,
          duration_days: 3
        },
        {
          id: "3days-7000",
          name: "3 DAYS PLAN - $7000",
          investment_amount: 7000,
          return_amount: 70000,
          duration_days: 3
        },
        {
          id: "3days-10000",
          name: "3 DAYS PLAN - $10000",
          investment_amount: 10000,
          return_amount: 100000,
          duration_days: 3
        },
        {
          id: "3days-15000",
          name: "3 DAYS PLAN - $15000",
          investment_amount: 15000,
          return_amount: 150000,
          duration_days: 3
        },
        {
          id: "3days-20000",
          name: "3 DAYS PLAN - $20000",
          investment_amount: 20000,
          return_amount: 200000,
          duration_days: 3
        },
        
        // 7 DAYS PLAN (BTC)
        {
          id: "7days-3btc",
          name: "7 DAYS PLAN - 3BTC",
          investment_amount: 3,
          return_amount: 10,
          duration_days: 7
        },
        {
          id: "7days-5btc",
          name: "7 DAYS PLAN - 5BTC",
          investment_amount: 5,
          return_amount: 20,
          duration_days: 7
        },
        {
          id: "7days-10btc",
          name: "7 DAYS PLAN - 10BTC",
          investment_amount: 10,
          return_amount: 45,
          duration_days: 7
        },
        {
          id: "7days-15btc",
          name: "7 DAYS PLAN - 15BTC",
          investment_amount: 15,
          return_amount: 70,
          duration_days: 7
        },
        {
          id: "7days-20btc",
          name: "7 DAYS PLAN - 20BTC",
          investment_amount: 20,
          return_amount: 100,
          duration_days: 7
        }
      ];
      
      setPackages(mockPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleInvestment = async (packageId: string, amount: number) => {
    // Redirect to Fapshi donation link
    window.open('https://checkout.fapshi.com/donation/99935962', '_blank');
    return;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HAbbyforexAcademy
              </span>
              <div className="text-xs text-gray-500">Professional Trading Dashboard</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{profile?.full_name || user.email}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <LogOut className="h-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to Your Trading Dashboard</h1>
              <p className="text-blue-100">Track your investments, monitor gains, and explore new opportunities</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Available Balance</CardTitle>
              <Wallet className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${profile?.balance?.toLocaleString() || 0}</div>
              <p className="text-xs text-white/70 mt-1">Ready for investment</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Invested</CardTitle>
              <Eye className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${profile?.total_invested?.toLocaleString() || 0}</div>
              <p className="text-xs text-white/70 mt-1">Your active investments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Gains</CardTitle>
              <Target className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${profile?.total_gains?.toLocaleString() || 0}</div>
              <p className="text-xs text-white/70 mt-1">Profits earned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">ROI</CardTitle>
              <TrendingUp className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {profile?.total_invested ? 
                  `${((profile.total_gains / profile.total_invested) * 100).toFixed(1)}%` : 
                  '0%'
                }
              </div>
              <p className="text-xs text-white/70 mt-1">Return on investment</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Investment Summary */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Active Investments</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">$2,500</div>
                <div className="text-sm text-gray-600">Next Payout</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">2 days</div>
                <div className="text-sm text-gray-600">Time to Payout</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">Overview</TabsTrigger>
            <TabsTrigger value="invest" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300">Invest</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300">Transactions</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Investment Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Line 
                          type="monotone" 
                          dataKey="gains" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          name="Gains"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="invested" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          name="Invested"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <PieChart className="h-5 w-5 text-green-600" />
                    Portfolio Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Total Invested</p>
                        <p className="text-sm text-gray-600">Your capital</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">${profile?.total_invested?.toLocaleString() || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Total Gains</p>
                        <p className="text-sm text-gray-600">Profits earned</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${profile?.total_gains?.toLocaleString() || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">ROI</p>
                        <p className="text-sm text-gray-600">Return on investment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">
                        {profile?.total_invested ? 
                          `${((profile.total_gains / profile.total_invested) * 100).toFixed(1)}%` : 
                          '0%'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invest" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">‼️ Investment Plan (1000% profit) ‼️</h2>
              <p className="text-lg text-gray-600">👇👇👇👇👇👇👇 Choose your high-profit investment plan 👇👇👇👇👇👇👇</p>
            </div>
            
            {/* 2 DAYS PLAN */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🔥 2 DAYS PLAN 🔥</h3>
                <p className="text-gray-600">Fast returns in just 2 days</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packages.filter(pkg => pkg.duration_days === 2).map((pkg) => (
                  <Card key={pkg.id} className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-yellow-200 bg-gradient-to-br from-white to-yellow-50">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold text-gray-900">🔥 {pkg.name} 🔥</CardTitle>
                        <Badge className="bg-red-500 text-white border-0 shadow-lg text-xs">2 days</Badge>
                      </div>
                      <CardDescription className="text-gray-700 font-semibold text-xs">
                        💰 INVEST: ${pkg.investment_amount.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          💵 EARN: ${pkg.return_amount.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-600 font-semibold">Expected return</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700 text-xs">🔥 ROI:</span>
                          <span className="font-bold text-green-600 text-lg">
                            {(((pkg.return_amount - pkg.investment_amount) / pkg.investment_amount) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-2 text-sm font-semibold" 
                        onClick={() => handleInvestment(pkg.id, pkg.investment_amount)}
                        disabled={isLoading}
                      >
                        <CreditCard className="h-4 h-4 mr-1" />
                        🚀 Invest Now 🚀
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 3 DAYS PLAN */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🔥 3 DAYS PLAN 🔥</h3>
                <p className="text-gray-600">Medium-term high returns</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packages.filter(pkg => pkg.duration_days === 3).map((pkg) => (
                  <Card key={pkg.id} className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold text-gray-900">🔥 {pkg.name} 🔥</CardTitle>
                        <Badge className="bg-blue-500 text-white border-0 shadow-lg text-xs">3 days</Badge>
                      </div>
                      <CardDescription className="text-gray-700 font-semibold text-xs">
                        💰 INVEST: ${pkg.investment_amount.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          💵 EARN: ${pkg.return_amount.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-600 font-semibold">Expected return</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700 text-xs">🔥 ROI:</span>
                          <span className="font-bold text-green-600 text-lg">
                            {(((pkg.return_amount - pkg.investment_amount) / pkg.investment_amount) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-2 text-sm font-semibold" 
                        onClick={() => handleInvestment(pkg.id, pkg.investment_amount)}
                        disabled={isLoading}
                      >
                        <CreditCard className="h-4 h-4 mr-1" />
                        🚀 Invest Now 🚀
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 7 DAYS PLAN (BTC) */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">‼️ Big Plan - 7 DAYS PLAN (BTC) ‼️</h3>
                <p className="text-gray-600">Premium Bitcoin investment opportunities</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packages.filter(pkg => pkg.duration_days === 7).map((pkg) => (
                  <Card key={pkg.id} className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold text-gray-900">💎 {pkg.name} 💎</CardTitle>
                        <Badge className="bg-purple-500 text-white border-0 shadow-lg text-xs">7 days</Badge>
                      </div>
                      <CardDescription className="text-gray-700 font-semibold text-xs">
                        💰 INVEST: {pkg.investment_amount} BTC
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          💵 EARN: {pkg.return_amount} BTC
                        </div>
                        <p className="text-xs text-gray-600 font-semibold">Expected return</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700 text-xs">🔥 ROI:</span>
                          <span className="font-bold text-green-600 text-lg">
                            {(((pkg.return_amount - pkg.investment_amount) / pkg.investment_amount) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-2 text-sm font-semibold" 
                        onClick={() => handleInvestment(pkg.id, pkg.investment_amount)}
                        disabled={isLoading}
                      >
                        <CreditCard className="h-4 h-4 mr-1" />
                        🚀 Invest Now 🚀
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <History className="h-5 w-5 text-blue-600" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(transaction.created_at).toLocaleString()}
                          </p>
                          <Badge className="mt-2" variant={
                            transaction.type === 'investment' ? 'default' :
                            transaction.type === 'gain' ? 'secondary' :
                            transaction.type === 'deposit' ? 'outline' : 'destructive'
                          }>
                            {transaction.type === 'investment' ? 'Investment' :
                             transaction.type === 'gain' ? 'Gain' :
                             transaction.type === 'deposit' ? 'Deposit' : transaction.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {transaction.type === 'gain' || transaction.type === 'deposit' ? '+' : '-'}
                            ${transaction.amount.toLocaleString()}
                          </p>
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' : 
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          } className="mt-1">
                            {transaction.status === 'completed' ? 'Completed' : 
                             transaction.status === 'pending' ? 'Pending' : 'Cancelled'}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">No transactions yet</p>
                      <p className="text-sm text-gray-400">Your transaction history will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Bar dataKey="gains" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Target className="h-5 w-5 text-green-600" />
                    Investment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-600 font-medium">Total Investments</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-green-600 font-medium">Successful</p>
                      <p className="text-2xl font-bold text-green-900">10</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <p className="text-sm text-yellow-600 font-medium">Pending</p>
                      <p className="text-2xl font-bold text-yellow-900">2</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-sm text-purple-600 font-medium">Success Rate</p>
                      <p className="text-2xl font-bold text-purple-900">83%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;