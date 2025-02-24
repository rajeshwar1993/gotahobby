import { Entity, TimeStats } from "./generics";

export type User = Entity &
  TimeStats & {
    // Basic information
    username?: string;
    email: string;
    fullName: string;

    // Profile details
    displayName: string;
    // avatar?: string;
    bio?: string;
    dateOfBirth?: string;
    phoneNumber?: string;

    // Address information
    // address?: {
    //   street?: string;
    //   city?: string;
    //   state?: string;
    //   country?: string;
    //   postalCode?: string;
    // };

    // Account status and preferences
    isActive: boolean;
    isVerified: boolean;
    // isTwoFactorEnabled: boolean;
    // preferredLanguage?: string;
    // timezone?: string;

    // Social connections
    // followers?: number;
    // following?: number;

    // Security and privacy
    // roles: string[];
    // permissions?: string[];
    // privacySettings?: {
    //   isProfilePublic: boolean;
    //   showEmail: boolean;
    //   showPhoneNumber: boolean;
    // };

    // Notification preferences
    // notificationSettings?: {
    //   email: boolean;
    //   push: boolean;
    //   sms: boolean;
    // };
  };
