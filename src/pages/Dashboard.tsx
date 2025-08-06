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
import { TrendingUp, Wallet, DollarSign, Target, LogOut, CreditCard, History } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";

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
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Mock chart data
  const chartData = [
    { month: "Jan", gains: 2400 },
    { month: "Fev", gains: 1398 },
    { month: "Mar", gains: 9800 },
    { month: "Avr", gains: 3908 },
    { month: "Mai", gains: 4800 },
    { month: "Jun", gains: 3800 },
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
      const { data, error } = await supabase
        .from('investment_packages')
        .select('*')
        .eq('is_active', true)
        .order('investment_amount');

      if (error) throw error;
      setPackages(data || []);
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
    setShowErrorModal(true);
    return;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Bonjour, j'ai besoin d'aide avec ma recharge/investissement.");
    const whatsappUrl = `https://wa.me/33603664808?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowErrorModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ForexPro</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Bienvenue, {profile?.full_name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
              <Wallet className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.balance?.toLocaleString() || 0} FCFA</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investi</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.total_invested?.toLocaleString() || 0} FCFA</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gains Totaux</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{profile?.total_gains?.toLocaleString() || 0} FCFA</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {profile?.total_invested ? 
                  `${((profile.total_gains / profile.total_invested) * 100).toFixed(1)}%` : 
                  '0%'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="invest">Investir</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Gains</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="gains" 
                          stroke="var(--color-gains)" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transactions Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{transaction.amount.toLocaleString()} FCFA</p>
                          <Badge 
                            variant={
                              transaction.status === 'completed' ? 'default' : 
                              transaction.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {transaction.status === 'completed' ? 'Terminé' : 
                             transaction.status === 'pending' ? 'En attente' : 'Annulé'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invest" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{pkg.name}</CardTitle>
                      <Badge variant="secondary">{pkg.duration_days} jours</Badge>
                    </div>
                    <CardDescription>
                      Investissement minimum: {pkg.investment_amount.toLocaleString()} FCFA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">
                        {pkg.return_amount.toLocaleString()} FCFA
                      </div>
                      <p className="text-sm text-muted-foreground">Retour attendu</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>ROI:</span>
                        <span className="font-medium text-success">
                          {(((pkg.return_amount - pkg.investment_amount) / pkg.investment_amount) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="gradient"
                      onClick={() => handleInvestment(pkg.id, pkg.investment_amount)}
                      disabled={isLoading}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Investir Maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historique des Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                        <Badge className="mt-1" variant={
                          transaction.type === 'investment' ? 'default' :
                          transaction.type === 'gain' ? 'secondary' :
                          transaction.type === 'deposit' ? 'outline' : 'destructive'
                        }>
                          {transaction.type === 'investment' ? 'Investissement' :
                           transaction.type === 'gain' ? 'Gain' :
                           transaction.type === 'deposit' ? 'Dépôt' : transaction.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">
                          {transaction.type === 'gain' || transaction.type === 'deposit' ? '+' : '-'}
                          {transaction.amount.toLocaleString()} FCFA
                        </p>
                        <Badge variant={
                          transaction.status === 'completed' ? 'default' : 
                          transaction.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {transaction.status === 'completed' ? 'Terminé' : 
                           transaction.status === 'pending' ? 'En attente' : 'Annulé'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="gains" fill="var(--color-gains)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{transactions.length}</div>
                      <div className="text-sm text-muted-foreground">Transactions</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {transactions.filter(t => t.status === 'completed').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Complétées</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Taux de réussite</span>
                      <span className="text-sm font-medium">
                        {transactions.length > 0 
                          ? `${((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100).toFixed(1)}%`
                          : '0%'
                        }
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ 
                          width: transactions.length > 0 
                            ? `${(transactions.filter(t => t.status === 'completed').length / transactions.length) * 100}%`
                            : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="glass-dark">
          <DialogHeader>
            <DialogTitle className="text-destructive">Erreur Système</DialogTitle>
            <DialogDescription>
              Une erreur système est survenue lors de votre tentative de recharge/investissement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Veuillez contacter notre équipe de support pour résoudre ce problème.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter WhatsApp
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowErrorModal(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;