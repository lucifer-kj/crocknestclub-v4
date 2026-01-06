export type UserRole = 'USER' | 'ADMIN';

export interface Product {
    id: string;
    title: string;
    description: string;
    basePrice: number;
    images: string[];
}
