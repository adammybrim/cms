import { Site, SiteTableRow, SiteStatus } from '../types/site.types';

/**
 * Transforms a Site object into a SiteTableRow for display in the table
 */
export const transformSiteToTableRow = (site: Site): SiteTableRow => ({
  id: site.id,
  name: site.name,
  location: formatAddress(site.address),
  chargers: site.availableChargers,
  status: site.status,
  lastUpdated: formatDate(site.updatedAt)
});

/**
 * Formats an address object into a display string
 */
export const formatAddress = (address: {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}): string => {
  const { line1, line2, city, state, postalCode, country } = address;
  return [line1, line2, `${city}, ${state} ${postalCode}`, country]
    .filter(Boolean)
    .join(', ');
};

/**
 * Formats a date string into a localized date string
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Gets the appropriate color for a status chip
 */
export const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'default' => {
  const colorMap: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
    [SiteStatus.ONLINE]: 'success',
    [SiteStatus.OFFLINE]: 'error',
    [SiteStatus.MAINTENANCE]: 'warning'
  };
  
  return colorMap[status] || 'default';
};

/**
 * Formats the status for display
 */
export const formatStatus = (status: SiteStatus): string => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};

/**
 * Calculates the charger availability percentage
 */
export const getChargerAvailability = (available: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((available / total) * 100);
};

/**
 * Gets the appropriate color for charger availability
 */
export const getAvailabilityColor = (available: number, total: number): 'success' | 'warning' | 'error' => {
  const percentage = getChargerAvailability(available, total);
  if (percentage > 50) return 'success';
  if (percentage > 20) return 'warning';
  return 'error';
};
