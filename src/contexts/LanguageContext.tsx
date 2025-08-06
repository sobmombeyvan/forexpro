
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    admin: "Admin",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    
    // Hero Section
    heroTitle: "Invest in Forex with ForexPro",
    heroSubtitle: "Professional investment platform with guaranteed returns and maximum security",
    getStarted: "Get Started Now",
    learnMore: "Learn More",
    
    // Features
    securePlatform: "Secure Platform",
    secureDesc: "Your investments are protected by cutting-edge security systems",
    guaranteedReturns: "Guaranteed Returns",
    returnsDesc: "Get fixed and predictable returns on your investments",
    expertSupport: "Expert Support",
    supportDesc: "Our expert team supports you at every step",
    
    // Investment Packages
    investmentPackages: "Our Investment Packages",
    choosePackage: "Choose your ideal package",
    duration: "Duration",
    days: "days",
    investment: "Investment",
    returns: "Returns",
    investNow: "Invest Now",
    
    // Testimonials
    testimonials: "Client Testimonials",
    testimonialsDesc: "Discover the experiences of our satisfied clients",
    
    // Auth
    welcomeBack: "Welcome Back!",
    loginDesc: "Sign in to your account to continue",
    createAccount: "Create Account",
    signupDesc: "Join ForexPro and start investing today",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    phone: "Phone",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    
    // Dashboard
    welcome: "Welcome",
    totalBalance: "Total Balance",
    totalInvested: "Total Invested",
    totalGains: "Total Gains",
    recentTransactions: "Recent Transactions",
    type: "Type",
    amount: "Amount",
    status: "Status",
    date: "Date",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    
    // Footer
    aboutUs: "About Us",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved",
  },
  fr: {
    // Navigation
    home: "Accueil",
    dashboard: "Tableau de bord",
    admin: "Administration",
    login: "Connexion",
    logout: "Déconnexion",
    signup: "S'inscrire",
    
    // Hero Section
    heroTitle: "Investissez dans le Forex avec ForexPro",
    heroSubtitle: "Plateforme d'investissement professionnelle avec des rendements garantis et une sécurité maximale",
    getStarted: "Commencer maintenant",
    learnMore: "En savoir plus",
    
    // Features
    securePlatform: "Plateforme Sécurisée",
    secureDesc: "Vos investissements sont protégés par des systèmes de sécurité de pointe",
    guaranteedReturns: "Rendements Garantis",
    returnsDesc: "Obtenez des rendements fixes et prévisibles sur vos investissements",
    expertSupport: "Support Expert",
    supportDesc: "Notre équipe d'experts vous accompagne à chaque étape",
    
    // Investment Packages
    investmentPackages: "Nos Packages d'Investissement",
    choosePackage: "Choisissez votre package idéal",
    duration: "Durée",
    days: "jours",
    investment: "Investissement",
    returns: "Retours",
    investNow: "Investir maintenant",
    
    // Testimonials
    testimonials: "Témoignages Clients",
    testimonialsDesc: "Découvrez les expériences de nos clients satisfaits",
    
    // Auth
    welcomeBack: "Bon retour !",
    loginDesc: "Connectez-vous à votre compte pour continuer",
    createAccount: "Créer un compte",
    signupDesc: "Rejoignez ForexPro et commencez à investir dès aujourd'hui",
    email: "Email",
    password: "Mot de passe",
    fullName: "Nom complet",
    phone: "Téléphone",
    noAccount: "Pas de compte ?",
    hasAccount: "Déjà un compte ?",
    
    // Dashboard
    welcome: "Bienvenue",
    totalBalance: "Balance Totale",
    totalInvested: "Total Investi",
    totalGains: "Gains Totaux",
    recentTransactions: "Transactions Récentes",
    type: "Type",
    amount: "Montant",
    status: "Statut",
    date: "Date",
    pending: "En attente",
    completed: "Terminé",
    cancelled: "Annulé",
    
    // Footer
    aboutUs: "À Propos",
    contact: "Contact",
    terms: "Conditions",
    privacy: "Confidentialité",
    followUs: "Suivez-nous",
    allRightsReserved: "Tous droits réservés",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Changed default to English

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
