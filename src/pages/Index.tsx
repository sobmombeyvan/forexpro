import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { CoinAnimation } from "@/components/ui/coin-animation";
import { Shield, TrendingUp, Users, ArrowRight, Globe, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t, language, setLanguage } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: "Plateforme Sécurisée",
      description: "Vos investissements sont protégés par les technologies de sécurité les plus avancées du marché.",
    },
    {
      icon: TrendingUp,
      title: "Rendements Garantis",
      description: "Profitez de rendements garantis et prévisibles sur tous vos investissements.",
    },
    {
      icon: Users,
      title: "Support Expert",
      description: "Notre équipe d'experts est disponible 24/7 pour vous accompagner dans vos investissements.",
    },
  ];

  const packages = [
    {
      name: "Débutant",
      duration: 7,
      minInvestment: 50000,
      returns: 15,
      popular: false,
    },
    {
      name: "Professionnel",
      duration: 14,
      minInvestment: 100000,
      returns: 25,
      popular: true,
    },
    {
      name: "Expert",
      duration: 30,
      minInvestment: 250000,
      returns: 40,
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Investisseuse",
      content: "ForexPro a transformé mon avenir financier. Les rendements sont constants et la plateforme est incroyablement sécurisée. Je recommande vivement !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Jean-Pierre Martin",
      role: "Trader",
      content: "Service professionnel avec un support excellent. J'investis depuis 6 mois et je ne pourrais pas être plus satisfait. Les gains sont réels !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Sophie Laurent",
      role: "Propriétaire d'entreprise",
      content: "Les rendements garantis m'ont donné confiance pour investir. Je recommande fortement ForexPro à tous mes amis !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Pierre Moreau",
      role: "Retraité",
      content: "À 65 ans, j'ai enfin trouvé une plateforme fiable pour mes économies. Les gains me permettent de vivre confortablement ma retraite.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Camille Rousseau",
      role: "Médecin",
      content: "En tant que médecin, je n'ai pas beaucoup de temps pour gérer mes finances. ForexPro fait tout le travail pour moi avec des résultats exceptionnels.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Antoine Leroy",
      role: "Ingénieur",
      content: "J'ai analysé plusieurs plateformes d'investissement et ForexPro est de loin la plus transparente et la plus rentable. Investissement parfait !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Isabelle Fontaine",
      role: "Enseignante",
      content: "Avec mon salaire d'enseignante, j'ai pu économiser et investir grâce à ForexPro. Les rendements sont incroyables !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Thomas Bernard",
      role: "Chef d'entreprise",
      content: "Ma PME génère des bénéfices, mais ForexPro me permet de les faire fructifier encore plus. Plateforme exceptionnelle !",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Nathalie Girard",
      role: "Avocate",
      content: "En tant qu'avocate, je suis très méfiante. Mais ForexPro a gagné ma confiance avec sa transparence et ses résultats prouvés.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Marc Durand",
      role: "Architecte",
      content: "J'ai commencé avec un petit investissement et aujourd'hui, mes gains me permettent de réaliser mes projets architecturaux.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Valérie Simon",
      role: "Pharmacienne",
      content: "ForexPro m'a aidée à diversifier mes investissements. Les rendements sont stables et le support client est remarquable.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "François Mercier",
      role: "Consultant",
      content: "Je conseille ForexPro à tous mes clients. C'est la plateforme d'investissement la plus fiable que j'ai jamais utilisée.",
      rating: 5,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <CoinAnimation size="lg" />
          <div>
            <span className="text-2xl font-bold text-white">
              ForexPro
            </span>
            <div className="text-xs text-muted-foreground">Trading Professionnel</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="hover-glow"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'en' ? 'FR' : 'EN'}
          </Button>
          
          <div className="flex gap-2">
            <Button asChild variant="outline" className="hover-glow">
              <Link to="/auth">Connexion</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover-glow">
              <Link to="/auth">Commencer</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-slide-in-up">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-6">
            <Badge className="glass px-4 py-2 text-sm">
              🚀 Plateforme d'Investissement Professionnelle
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Investissez dans Votre Avenir Financier
          </h1>
          
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Rejoignez des milliers d'investisseurs satisfaits et commencez à construire votre avenir financier dès aujourd'hui avec des rendements garantis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary hover-glow px-8 py-6 text-lg">
              <Link to="/auth">
                Commencer Maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="glass hover-glow px-8 py-6 text-lg">
              En Savoir Plus
            </Button>
          </div>
          
          <div className="flex justify-center mt-12">
            <CoinAnimation size="lg" className="animate-float" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Pourquoi Choisir ForexPro ?</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Conçu pour les investisseurs modernes qui exigent sécurité, performance et transparence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-dark hover-scale transition-smooth group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Investment Packages */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Nos Forfaits d'Investissement</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Choisissez le forfait qui correspond le mieux à vos objectifs financiers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`glass-dark hover-scale transition-smooth relative ${
                pkg.popular ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                  Le Plus Populaire
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CoinAnimation size="md" />
                </div>
                <CardTitle className="text-2xl text-foreground">{pkg.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {pkg.returns}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Rendements en {pkg.duration} jours
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">Minimum: {pkg.minInvestment.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">Rendements garantis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">Support 24/7</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className={`w-full ${pkg.popular ? 'bg-gradient-primary' : 'bg-gradient-success'} hover-glow`}
                >
                  <Link to="/auth">Investir Maintenant</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Témoignages de Nos Clients</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Découvrez ce que nos investisseurs satisfaits disent de leur expérience avec ForexPro
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              comment={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-dark text-center p-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex justify-center">
              <CoinAnimation size="lg" className="animate-float" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Prêt à Commencer à Investir ?
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Rejoignez des milliers d'investisseurs satisfaits et commencez à construire votre avenir financier dès aujourd'hui.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover-glow px-12 py-6 text-lg">
              <Link to="/auth">
                Commencer Maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 glass-dark backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CoinAnimation size="md" />
                <span className="text-xl font-bold text-white">
                  ForexPro
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plateforme d'investissement forex professionnelle avec des rendements garantis et une sécurité maximale.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Entreprise</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>À Propos</div>
                <div>Contact</div>
                <div>Carrières</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Légal</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Conditions</div>
                <div>Confidentialité</div>
                <div>Politique Cookies</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Suivez-Nous</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Twitter</div>
                <div>LinkedIn</div>
                <div>Facebook</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ForexPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;