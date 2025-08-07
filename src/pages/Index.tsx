import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { CoinAnimation } from "@/components/ui/coin-animation";
import { Shield, TrendingUp, Users, ArrowRight, Globe, Star, CheckCircle, DollarSign, Target, Zap, Award, Clock, Play, BarChart3, Lock, Headphones, BookOpen, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t, language, setLanguage } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your investments are protected with enterprise-grade encryption and secure infrastructure.",
    },
    {
      icon: TrendingUp,
      title: "Proven Strategies",
      description: "Access to institutional-grade trading algorithms and expert market analysis.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Learn from certified financial professionals with decades of trading experience.",
    },
  ];

  const investmentPlans = [
    {
      name: "Starter Plan",
      duration: "30 days",
      minInvestment: 500,
      maxInvestment: 5000,
      expectedReturn: "8-12%",
      risk: "Low",
      popular: false,
      features: [
        "Basic market analysis",
        "Email support",
        "Monthly performance report",
        "Risk management tools"
      ]
    },
    {
      name: "Professional Plan",
      duration: "90 days",
      minInvestment: 5000,
      maxInvestment: 25000,
      expectedReturn: "12-18%",
      risk: "Medium",
      popular: true,
      features: [
        "Advanced trading algorithms",
        "Priority support",
        "Weekly performance updates",
        "Personal account manager",
        "Risk management consultation"
      ]
    },
    {
      name: "Institutional Plan",
      duration: "180 days",
      minInvestment: 25000,
      maxInvestment: 100000,
      expectedReturn: "15-25%",
      risk: "Medium-High",
      popular: false,
      features: [
        "Custom trading strategies",
        "24/7 dedicated support",
        "Real-time portfolio monitoring",
        "Exclusive market insights",
        "Tax optimization guidance"
      ]
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Professional",
      content: "As a busy doctor, I needed a reliable investment solution. HAbbyforexAcademy's professional approach and consistent returns have exceeded my expectations. The educational resources are excellent.",
      rating: 5,
      image: "/placeholder.svg",
      verified: true
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "I've been investing with HAbbyforexAcademy for over a year. The platform is intuitive, the returns are consistent, and the customer service is outstanding. Highly recommended.",
      rating: 5,
      image: "/placeholder.svg",
      verified: true
    },
    {
      name: "Emma Williams",
      role: "Business Owner",
      content: "The professional guidance and risk management strategies have helped me grow my portfolio significantly. The team's expertise is evident in every interaction.",
      rating: 5,
      image: "/placeholder.svg",
      verified: true
    },
    {
      name: "David Rodriguez",
      role: "Retired Executive",
      content: "After retiring, I was looking for a reliable way to maintain my income. HAbbyforexAcademy's conservative approach and steady returns have been perfect for my needs.",
      rating: 4,
      image: "/placeholder.svg",
      verified: true
    },
    {
      name: "Jennifer Smith",
      role: "Financial Advisor",
      content: "As a financial professional myself, I appreciate the transparency and professional approach. The educational content is top-notch and the returns are realistic.",
      rating: 5,
      image: "/placeholder.svg",
      verified: true
    },
    {
      name: "Robert Wilson",
      role: "Entrepreneur",
      content: "I've tried many investment platforms, but HAbbyforexAcademy stands out for their professionalism and consistent performance. The risk management is excellent.",
      rating: 4,
      image: "/placeholder.svg",
      verified: true
    }
  ];

  const stats = [
    { number: "15,000+", label: "Active Investors", icon: Users },
    { number: "$150M+", label: "Assets Under Management", icon: DollarSign },
    { number: "95%", label: "Client Satisfaction", icon: Star },
    { number: "24/7", label: "Expert Support", icon: Headphones }
  ];

  const educationalFeatures = [
    {
      icon: BookOpen,
      title: "Comprehensive Education",
      description: "Access to professional trading courses, market analysis, and risk management strategies."
    },
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Daily market insights, technical analysis, and economic calendar updates."
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join our community of traders and investors for networking and knowledge sharing."
    },
    {
      icon: Calendar,
      title: "Live Sessions",
      description: "Weekly live trading sessions with expert analysis and Q&A opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HAbbyforexAcademy
              </span>
              <div className="text-xs text-gray-500">Professional Investment Academy</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="text-gray-600 hover:text-gray-900"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'FR' : 'EN'}
            </Button>
            
            <div className="flex gap-2">
              <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="flex mb-6">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm border-0">
                    🏆 Trusted by 15,000+ Investors
                  </Badge>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Professional
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Investment Academy
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of successful investors and learn professional trading strategies with our comprehensive educational platform and expert guidance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <Link to="/auth">
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <stat.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/src/img/WhatsApp Image 2025-08-07 at 03.26.38.jpeg" 
                    alt="Professional Investment Success" 
                    className="w-full h-auto object-cover"
                    style={{ minHeight: '500px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold text-lg">Success Stories</div>
                          <div className="text-gray-600 text-sm">Join our community of successful investors</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose HAbbyforexAcademy?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional expertise meets advanced technology for optimal investment results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Comprehensive Learning Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access professional-grade educational resources and expert guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {educationalFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/src/img/WhatsApp Image 2025-08-07 at 03.26.33.jpeg" 
                  alt="Professional Trading Training Session" 
                  className="w-full h-auto object-cover"
                  style={{ minHeight: '400px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-green-500 text-white px-4 py-2 text-sm border-0">
                    Live Training
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-green-600 font-semibold">Expert Training</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900">
                Learn from Professional Traders
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Our certified financial professionals provide comprehensive training sessions, market analysis, and personalized guidance to help you succeed in trading.
              </p>
              
              <div className="space-y-4">
                {[
                  "Live trading sessions with real-time analysis",
                  "Risk management strategies and techniques",
                  "Market psychology and discipline training",
                  "24/7 support from experienced professionals"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8 py-4 text-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link to="/auth">
                  Join Training Program
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Investment Plans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your investment goals and risk tolerance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {investmentPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-500 relative ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {plan.expectedReturn}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expected Return ({plan.duration})
                    </div>
                    <div className="text-sm text-gray-500">
                      Risk Level: {plan.risk}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Investment Range: ${plan.minInvestment.toLocaleString()} - ${plan.maxInvestment.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    asChild 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real testimonials from satisfied investors and learners
            </p>
          </div>
          
          {/* Featured Success Image */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/src/img/WhatsApp Image 2025-08-07 at 03.26.32.jpeg" 
                alt="HAbbyforexAcademy Success Stories" 
                className="w-full h-auto object-cover"
                style={{ minHeight: '300px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h3>
                  <p className="text-gray-700">Join thousands of successful traders who have transformed their financial future with professional guidance</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="hover:scale-105 transition-transform duration-300">
                <TestimonialCard
                  name={testimonial.name}
                  comment={testimonial.content}
                  rating={testimonial.rating}
                  image={testimonial.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Trust & Security</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your security and trust are our top priorities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border border-gray-200 text-center p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">Your data and investments are protected with enterprise-grade encryption and secure infrastructure.</p>
            </Card>
            
            <Card className="bg-white border border-gray-200 text-center p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Professionals</h3>
              <p className="text-gray-600">Our team consists of certified financial professionals with decades of combined experience.</p>
            </Card>
            
            <Card className="bg-white border border-gray-200 text-center p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support to assist you with any questions or concerns.</p>
            </Card>
            
            <Card className="bg-white border border-gray-200 text-center p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Regulated & Compliant</h3>
              <p className="text-gray-600">We operate under strict regulatory guidelines and maintain full compliance with financial regulations.</p>
            </Card>
          </div>
          
          {/* Additional Trust Badges */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Industry Leaders</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-semibold">ISO 27001</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-semibold">SOC 2 Type II</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-semibold">GDPR Compliant</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-semibold">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center p-12 max-w-4xl mx-auto shadow-xl">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of successful investors and start building your financial future with professional guidance.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-12 py-6 text-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link to="/auth">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  HAbbyforexAcademy
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Professional investment academy providing comprehensive trading education and expert guidance for investors worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Company</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">About Us</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Our Team</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Careers</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Contact</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Services</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Investment Plans</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Trading Education</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Market Analysis</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Risk Management</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Legal</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Risk Disclosure</div>
                <div className="hover:text-white transition-colors duration-300 cursor-pointer">Cookie Policy</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 HAbbyforexAcademy. All rights reserved. | Professional Investment Academy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;