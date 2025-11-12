export enum SiteStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ChargerType {
  type: string;
  powerKW: number;
  count: number;
}

export interface OperatingHours {
  [day: string]: {
    open: string;
    close: string;
    is24h?: boolean;
    isClosed?: boolean;
  };
}

export interface Pricing {
  currency: string;
  pricePerKwh: number;
  parkingFee?: {
    amount: number;
    timeUnit: 'HOUR' | 'DAY' | 'WEEK';
  };
}

export interface Site {
  // Core Fields
  id: string;
  name: string;
  address: Address;
  
  // Charger Information
  totalChargers: number;
  availableChargers: number;
  chargerTypes: ChargerType[];
  
  // Status
  status: SiteStatus | string;
  lastHeartbeat?: string;
  isActive: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  
  // Additional Fields
  timezone?: string;
  operatingHours?: OperatingHours;
  pricing?: Pricing;
}

export interface SitesResponse {
  data: Site[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// Utility type for table display
export interface SiteTableRow {
  id: string;
  name: string;
  location: string;
  chargers: number;
  status: string;
  lastUpdated: string;
}
