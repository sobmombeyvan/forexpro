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
      title: "Secure Platform",
      description: "Your investments are protected by the most advanced security technologies in the market.",
    },
    {
      icon: TrendingUp,
      title: "Guaranteed Returns",
      description: "Enjoy guaranteed and predictable returns on all your investments.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of experts is available 24/7 to assist you with your investments.",
    },
  ];

  const packages = [
    {
      name: "Starter",
      duration: 7,
      minInvestment: 50000,
      returns: 15,
      popular: false,
    },
    {
      name: "Professional",
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
      name: "Sarah Johnson",
      role: "Investor",
      content: "ForexPro has transformed my financial future. The returns are consistent and the platform is incredibly secure. I was able to withdraw 70% of my total gains, which is reasonable given the market conditions.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "Trader",
      content: "Professional service with excellent support. I've been investing for 6 months and couldn't be happier. Withdrawal process was smooth, got 78% of my gains which I'm satisfied with.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Emma Williams",
      role: "Business Owner",
      content: "The guaranteed returns gave me the confidence to invest. However, I could only withdraw 70% of my total gains. Still, it's better than other platforms I've tried.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "David Rodriguez",
      role: "Retiree",
      content: "At 65, I finally found a reliable platform for my savings. The gains allow me to live comfortably in retirement. Withdrawal was 75% of total gains, which is acceptable.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Jennifer Smith",
      role: "Doctor",
      content: "As a doctor, I don't have much time to manage my finances. ForexPro does all the work for me with exceptional results. Got 78% of my gains on withdrawal.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Robert Wilson",
      role: "Engineer",
      content: "I've analyzed several investment platforms and ForexPro is by far the most transparent and profitable. Withdrawal rate of 70% is standard in this industry.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Lisa Thompson",
      role: "Teacher",
      content: "With my teacher's salary, I was able to save and invest thanks to ForexPro. The returns are incredible! Withdrawal was smooth, got 75% of my total gains.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "James Anderson",
      role: "Business Owner",
      content: "My SME generates profits, but ForexPro helps me grow them even more. Exceptional platform! Withdrawal rate of 78% is reasonable for the service provided.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Amanda Davis",
      role: "Lawyer",
      content: "As a lawyer, I'm very cautious. But ForexPro won my trust with its transparency and proven results. Withdrawal was 70% of gains, which is industry standard.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Christopher Brown",
      role: "Architect",
      content: "I started with a small investment and today, my gains allow me to realize my architectural projects. Withdrawal rate of 75% is fair for the returns I received.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Michelle Garcia",
      role: "Pharmacist",
      content: "ForexPro helped me diversify my investments. The returns are stable and customer support is remarkable. Withdrawal was 78% of total gains.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Thomas Martinez",
      role: "Consultant",
      content: "I recommend ForexPro to all my clients. It's the most reliable investment platform I've ever used. Withdrawal rate of 70% is standard and acceptable.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Rachel Lee",
      role: "Marketing Manager",
      content: "Great platform with consistent returns. I was able to withdraw 75% of my gains, which is reasonable. The platform is user-friendly and secure.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Daniel Taylor",
      role: "IT Professional",
      content: "ForexPro offers excellent investment opportunities. The withdrawal process was straightforward, got 78% of my total gains. Highly recommend!",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Nicole White",
      role: "Real Estate Agent",
      content: "I've been using ForexPro for over a year now. The returns are impressive and withdrawal was 70% of gains. The platform is reliable and trustworthy.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Kevin Johnson",
      role: "Financial Analyst",
      content: "As a financial analyst, I'm impressed with ForexPro's performance. Withdrawal rate of 75% is industry standard. The platform is well-managed and secure.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Stephanie Clark",
      role: "Entrepreneur",
      content: "ForexPro has been a game-changer for my business investments. Withdrawal was smooth, got 78% of my gains. The platform is professional and reliable.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Mark Lewis",
      role: "Sales Manager",
      content: "Excellent investment platform with consistent returns. Withdrawal rate of 70% is reasonable given the market volatility. Customer service is outstanding.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Ashley Hall",
      role: "Healthcare Worker",
      content: "ForexPro helped me build a solid investment portfolio. Withdrawal was 75% of total gains, which is fair. The platform is easy to use and secure.",
      rating: 4,
      image: "/placeholder.svg"
    },
    {
      name: "Brian Allen",
      role: "Project Manager",
      content: "I've been investing with ForexPro for 8 months. The returns are excellent and withdrawal process was transparent. Got 78% of my gains, which I'm satisfied with.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Melissa Young",
      role: "Designer",
      content: "ForexPro offers great investment opportunities. Withdrawal rate of 70% is standard in the industry. The platform is user-friendly and the returns are consistent.",
      rating: 4,
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
            <div className="text-xs text-muted-foreground">Professional Trading</div>
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
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover-glow">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-slide-in-up">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-6">
            <Badge className="glass px-4 py-2 text-sm">
              🚀 Professional Investment Platform
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Invest in Your Financial Future
          </h1>
          
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied investors and start building your financial future today with guaranteed returns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary hover-glow px-8 py-6 text-lg">
              <Link to="/auth">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="glass hover-glow px-8 py-6 text-lg">
              Learn More
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
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose ForexPro?</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Built for modern investors who demand security, performance, and transparency
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
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Investment Packages</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Choose the package that best fits your financial goals
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
                  Most Popular
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
                    Returns in {pkg.duration} days
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
                    <span className="text-sm text-foreground">Guaranteed returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">24/7 support</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className={`w-full ${pkg.popular ? 'bg-gradient-primary' : 'bg-gradient-success'} hover-glow`}
                >
                  <Link to="/auth">Invest Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Discover what our satisfied investors say about their experience with ForexPro
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
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Join thousands of satisfied investors and start building your financial future today.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover-glow px-12 py-6 text-lg">
              <Link to="/auth">
                Get Started Now
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
                Professional forex investment platform with guaranteed returns and maximum security.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Company</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About Us</div>
                <div>Contact</div>
                <div>Careers</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Terms</div>
                <div>Privacy</div>
                <div>Cookie Policy</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Follow Us</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Twitter</div>
                <div>LinkedIn</div>
                <div>Facebook</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ForexPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;