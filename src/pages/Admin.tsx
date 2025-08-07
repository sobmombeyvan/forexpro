
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, Settings, Edit, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { CoinAnimation } from "@/components/ui/coin-animation";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  balance: number;
  total_invested: number;
  total_gains: number;
  created_at: string;
}

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  created_at: string;
  profiles?: { full_name: string };
}

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const { t } = useLanguage();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [editBalance, setEditBalance] = useState("");
  const [editInvested, setEditInvested] = useState("");
  const [editGains, setEditGains] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkUserRole();
      fetchAllProfiles();
      fetchAllTransactions();
    }
  }, [user]);

  const checkUserRole = async () => {
    try {
      // If the user is as@gmail.com, grant admin access directly
      if (user?.email === 'as@gmail.com') {
        setUserRole('admin');
        return;
      }
      // First check in user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();

      if (roleError) {
        console.error('Error checking user role:', roleError);
        setUserRole('user');
      } else {
        setUserRole(roleData.role);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('user');
    }
  };

  const fetchAllProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          user_id,
          type,
          amount,
          status,
          description,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch profiles separately and merge the data
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name');
      
      const transactionsWithProfiles = data?.map(transaction => ({
        ...transaction,
        profiles: profilesData?.find(p => p.user_id === transaction.user_id)
      })) || [];
      
      setTransactions(transactionsWithProfiles);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const updateUserBalance = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      const balance = editBalance !== "" ? parseFloat(editBalance) : selectedUser.balance;
      const total_invested = editInvested !== "" ? parseFloat(editInvested) : selectedUser.total_invested;
      const total_gains = editGains !== "" ? parseFloat(editGains) : selectedUser.total_gains;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance, total_invested, total_gains })
        .eq('id', selectedUser.id);
      if (updateError) throw updateError;
      toast({
        title: "Success",
        description: `Account updated for ${selectedUser.full_name}`,
      });
      fetchAllProfiles();
      fetchAllTransactions();
      setSelectedUser(null);
      setEditBalance("");
      setEditInvested("");
      setEditGains("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating account",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const updateTransactionStatus = async (transactionId: string, status: string) => {
    try {
      // Fetch the transaction to get user_id, type, and amount
      const { data: transaction, error: fetchError } = await supabase
        .from('transactions')
        .select('id, user_id, type, amount, status')
        .eq('id', transactionId)
        .single();
      if (fetchError) throw fetchError;

      // If approving an investment, update user's profile
      if (transaction && status === 'completed' && transaction.type === 'investment') {
        // Fetch the user's profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, balance, total_invested')
          .eq('user_id', transaction.user_id)
          .single();
        if (profileError) throw profileError;
        // Increment balance and total_invested
        const newBalance = (profile.balance || 0) + (transaction.amount || 0);
        const newInvested = (profile.total_invested || 0) + (transaction.amount || 0);
        const { error: updateProfileError } = await supabase
          .from('profiles')
          .update({ balance: newBalance, total_invested: newInvested })
          .eq('id', profile.id);
        if (updateProfileError) throw updateProfileError;
      }

      // Update the transaction status
      const { error } = await supabase
        .from('transactions')
        .update({ status, completed_at: status === 'completed' ? new Date().toISOString() : null })
        .eq('id', transactionId);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction status updated",
      });
      fetchAllTransactions();
      fetchAllProfiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating transaction status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="flex items-center gap-4">
          <CoinAnimation size="lg" className="animate-float" />
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Card className="glass-dark">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>You don't have admin privileges.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalUsers = profiles.length;
  const totalInvested = profiles.reduce((sum, profile) => sum + profile.total_invested, 0);
  const totalGains = profiles.reduce((sum, profile) => sum + profile.total_gains, 0);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 glass-dark backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Settings className="h-8 w-8 text-primary animate-glow-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Settings className="h-8 w-8 text-primary opacity-20" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Panel
              </span>
              <div className="text-sm text-muted-foreground">HAbbyforexAcademy Management</div>
            </div>
            <CoinAnimation size="sm" className="ml-2" />
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="animate-glow-pulse">
              Administrator
            </Badge>
            <Button variant="outline" size="sm" onClick={signOut} className="hover-glow">
              <LogOut className="h-4 w-4 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6 animate-slide-in-up">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-dark hover-scale transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-primary animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalUsers}</div>
              <div className="flex items-center gap-2 mt-2">
                <CoinAnimation size="sm" />
                <span className="text-xs text-success">Active investors</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark hover-scale transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-5 w-5 text-success animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{totalInvested.toLocaleString()} FCFA</div>
              <div className="text-xs text-muted-foreground mt-2">Platform volume</div>
            </CardContent>
          </Card>

          <Card className="glass-dark hover-scale transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
              <TrendingUp className="h-5 w-5 text-warning animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{totalGains.toLocaleString()} FCFA</div>
              <div className="text-xs text-muted-foreground mt-2">User profits</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 glass-dark">
            <TabsTrigger value="users" className="hover-glow">User Management</TabsTrigger>
            <TabsTrigger value="transactions" className="hover-glow">Transaction Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="glass-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  All Users
                  <CoinAnimation size="sm" />
                </CardTitle>
                <CardDescription>
                  Manage user accounts and balances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead>Name</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Total Invested</TableHead>
                        <TableHead>Total Gains</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id} className="border-border/50 hover:bg-muted/50">
                          <TableCell className="font-medium">{profile.full_name}</TableCell>
                          <TableCell className="text-primary font-semibold">{profile.balance.toLocaleString()} FCFA</TableCell>
                          <TableCell>{profile.total_invested.toLocaleString()} FCFA</TableCell>
                          <TableCell className="text-success font-semibold">{profile.total_gains.toLocaleString()} FCFA</TableCell>
                          <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(profile);
                                    setEditBalance(profile.balance.toString());
                                    setEditInvested(profile.total_invested.toString());
                                    setEditGains(profile.total_gains.toString());
                                  }}
                                  className="hover-glow"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="glass-dark">
                                <DialogHeader>
                                  <DialogTitle>Edit Account for {profile.full_name}</DialogTitle>
                                  <DialogDescription>
                                    Adjust user balance, total invested, and total gains
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-balance">Balance (FCFA)</Label>
                                    <Input
                                      id="edit-balance"
                                      type="number"
                                      placeholder="Enter balance"
                                      value={editBalance}
                                      onChange={(e) => setEditBalance(e.target.value)}
                                      className="glass"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-invested">Total Invested (FCFA)</Label>
                                    <Input
                                      id="edit-invested"
                                      type="number"
                                      placeholder="Enter total invested"
                                      value={editInvested}
                                      onChange={(e) => setEditInvested(e.target.value)}
                                      className="glass"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-gains">Total Gains (FCFA)</Label>
                                    <Input
                                      id="edit-gains"
                                      type="number"
                                      placeholder="Enter total gains"
                                      value={editGains}
                                      onChange={(e) => setEditGains(e.target.value)}
                                      className="glass"
                                    />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => {
                                        setSelectedUser(null);
                                        setEditBalance("");
                                        setEditInvested("");
                                        setEditGains("");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      onClick={updateUserBalance}
                                      disabled={isLoading}
                                      className="hover-glow"
                                    >
                                      {isLoading ? "Updating..." : "Update"}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="glass-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  All Transactions
                  <CoinAnimation size="sm" />
                </CardTitle>
                <CardDescription>
                  Manage and approve user transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-border/50 hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {transaction.profiles?.full_name || 'Unknown User'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              transaction.type === 'investment' ? 'default' :
                              transaction.type === 'gain' ? 'secondary' :
                              transaction.type === 'deposit' ? 'outline' : 'destructive'
                            }>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{transaction.amount.toLocaleString()} FCFA</TableCell>
                          <TableCell>
                            <Badge variant={
                              transaction.status === 'completed' ? 'default' : 
                              transaction.status === 'pending' ? 'secondary' : 'destructive'
                            }>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {transaction.description}
                          </TableCell>
                          <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {transaction.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => updateTransactionStatus(transaction.id, 'completed')}
                                    className="hover-glow"
                                  >
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => updateTransactionStatus(transaction.id, 'cancelled')}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
