
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { CoinAnimation } from "@/components/ui/coin-animation";
import { LogIn, UserPlus, Mail, Lock, User, Globe } from "lucide-react";

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");

  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(loginEmail, loginPassword);
    
    if (!error) {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signUp(signupEmail, signupPassword, signupFullName);
    
    if (!error) {
      // Reset form
      setSignupEmail("");
      setSignupPassword("");
      setSignupFullName("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-success/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md space-y-6 animate-slide-in-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <CoinAnimation size="lg" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ForexPro
              </h1>
              <p className="text-sm text-muted-foreground">Professional Forex Investment</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="glass hover-glow"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Français' : 'English'}
            </Button>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="glass-dark shadow-glow">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass mb-6">
              <TabsTrigger value="login" className="hover-glow">
                <LogIn className="w-4 h-4 mr-2" />
                {t('login')}
              </TabsTrigger>
              <TabsTrigger value="signup" className="hover-glow">
                <UserPlus className="w-4 h-4 mr-2" />
                {t('signup')}
              </TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Connexion</CardTitle>
                <CardDescription>Connectez-vous à votre compte ForexPro</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="glass transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Mot de passe
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      minLength={6}
                      className="glass transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover-glow transition-smooth"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <CoinAnimation size="sm" />
                        Connexion en cours...
                      </div>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Se connecter
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Créer un Compte</CardTitle>
                <CardDescription>Rejoignez ForexPro et commencez à investir</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nom complet
                    </Label>
                    <Input
                      id="signup-fullname"
                      type="text"
                      placeholder="Votre nom complet"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                      required
                      className="glass transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="glass transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Mot de passe
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="glass transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-success hover-glow transition-smooth"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <CoinAnimation size="sm" />
                        Création du compte...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Créer un compte
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Sécurisé • Professionnel • Rentable</p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <CoinAnimation size="sm" />
            <span>Commencez votre parcours d'investissement aujourd'hui</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
