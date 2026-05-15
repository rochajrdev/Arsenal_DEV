export interface IUser {
  id: string;
  name: string;
  email: string;
  githubId?: string;
  createdAt: Date;
}

export interface ITool {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  pricingType: 'FREE' | 'FREEMIUM' | 'PAID' | 'OPEN_SOURCE';
  category: string;
}
