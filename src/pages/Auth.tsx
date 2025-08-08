
import { useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogIn, UserPlus, Mail, Lock, User, Globe, DollarSign, ArrowRight, Shield, TrendingUp } from "lucide-react";

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginEmail, loginPassword);
      
      if (!error) {
        // Navigate immediately after successful login
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loginEmail, loginPassword, signIn, navigate, isLoading]);

  const handleSignup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(signupEmail, signupPassword, signupFullName);
      
      if (!error) {
        // Reset form on successful signup
        setSignupEmail("");
        setSignupPassword("");
        setSignupFullName("");
        setActiveTab("login");
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [signupEmail, signupPassword, signupFullName, signUp, isLoading]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    // Reset forms when switching tabs
    if (value === "login") {
      setSignupEmail("");
      setSignupPassword("");
      setSignupFullName("");
    } else {
      setLoginEmail("");
      setLoginPassword("");
    }
  }, []);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome Content */}
        <div className="space-y-8 animate-fade-in-left">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HAbbyforexAcademy
              </h1>
                <p className="text-gray-600 font-medium">Professional Forex Academy</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to Professional Trading
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of successful investors and start earning consistent returns with our advanced trading algorithms and expert team.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Secure Platform</p>
                <p className="text-sm text-gray-600">Bank-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">High Returns</p>
                <p className="text-sm text-gray-600">Up to 1000% profit</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Expert Support</p>
                <p className="text-sm text-gray-600">24/7 assistance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Fast Payouts</p>
                <p className="text-sm text-gray-600">Quick withdrawals</p>
              </div>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Français' : 'English'}
            </Button>
          </div>
        </div>

        {/* Right Side - Auth Card */}
        <div className="animate-fade-in-right">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to your account or create a new one
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl mb-6">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-300 rounded-lg"
                  >
                <LogIn className="w-4 h-4 mr-2" />
                    Sign In
              </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-300 rounded-lg"
                  >
                <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
              </TabsTrigger>
            </TabsList>
            
                <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                          placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                    </div>
                    
                  <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                          placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                    </div>

                  <Button 
                    type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing In...
                      </div>
                    ) : (
                        <div className="flex items-center gap-2">
                          <LogIn className="w-5 h-5" />
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                  </Button>
                </form>
            </TabsContent>
            
                <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
                        Full Name
                    </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                          placeholder="Enter your full name"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                    </div>

                  <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                          placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                    </div>
                    
                  <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                          placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                  </div>
                    </div>

                  <Button 
                    type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Account...
                      </div>
                    ) : (
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-5 h-5" />
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                  </Button>
                </form>
            </TabsContent>
          </Tabs>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure & Protected</p>
                    <p className="text-xs text-gray-600">Your data is encrypted and secure</p>
                  </div>
                </div>
          </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Auth;
