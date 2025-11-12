export type SiteType = 'house' | 'apartment' | 'parking';

export interface ChargerSite {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  siteType: SiteType;
  location: string;
  chargerCount: number;
  activeChargers: number;
  inactiveChargers: number;
  loadBalancing: boolean;
}

export interface DataTableFromFigmaProps {
  data: ChargerSite[];
  onRowClick?: (row: ChargerSite) => void;
  onSettingsClick?: (row: ChargerSite) => void;
  onMoreClick?: (row: ChargerSite) => void;
}
