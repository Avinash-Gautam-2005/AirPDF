'use client';

import { 
  QrCode, 
  Zap, 
  Lock, 
  FileText, 
  Wallet, 
  Building2, 
  Upload, 
  CheckCircle,
  Twitter,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';

export const features = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'QR Code Upload',
    description: 'Scan the shop\'s QR code with your phone and instantly start uploading. No app download required.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Real-time Updates',
    description: 'Track your print job status live. Know exactly when your document is printing and ready for pickup.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Secure & Private',
    description: 'Your files are encrypted and auto-deleted after 24 hours. No phone number sharing with shops.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'PDF Support',
    description: 'Upload any PDF document. Choose color mode, page range, copies, and double-sided printing.',
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Easy Payments',
    description: 'Pay online or at the shop. Transparent pricing with no hidden fees. Coming soon: UPI integration.',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Multi-Shop Support',
    description: 'Find and use any AirPDF-enabled shop near you. One account works everywhere.',
  },
];


export const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Help Center', href: '/help' },
    { label: 'API', href: '/api-docs' },
    { label: 'Status', href: '/status' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export const socialLinks = [
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <Github className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram className="w-5 h-5" />,
  },
];

export const steps = [
  {
    number: '01',
    title: 'Scan QR Code',
    description: 'Visit any AirPDF-enabled shop and scan their unique QR code with your phone camera.',
    icon: <QrCode className="w-8 h-8" />,
  },
  {
    number: '02',
    title: 'Upload Your PDF',
    description: 'Select your document, choose print options like copies, color mode, and page range.',
    icon: <Upload className="w-8 h-8" />,
  },
  {
    number: '03',
    title: 'Track & Pickup',
    description: 'Monitor your print status in real-time. Collect your prints when ready — no waiting!',
    icon: <CheckCircle className="w-8 h-8" />,
  },
];
