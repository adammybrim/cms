import { useState, useEffect, useCallback } from 'react';
import { Site, SiteTableRow } from '../types/site.types';
import { transformSiteToTableRow } from '../utils/siteUtils';
import { mockSites, generateMockSites } from '../mocks/tableData';

export const useSites = () => {
  const [sites, setSites] = useState<SiteTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/sites');
      // const data = await response.json();
      
      // For now, use mock data
      const allSites = [...mockSites, ...generateMockSites(12)]; // 3 from mocks + 12 generated
      const transformedSites = allSites.map(transformSiteToTableRow);
      
      setSites(transformedSites);
    } catch (err) {
      console.error('Error fetching sites:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch sites'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  // Function to update a site
  const updateSite = useCallback((updatedSite: SiteTableRow) => {
    setSites(prevSites => 
      prevSites.map(site => 
        site.id === updatedSite.id ? updatedSite : site
      )
    );
  }, []);

  // Function to add a new site
  const addSite = useCallback((newSite: Omit<SiteTableRow, 'id' | 'lastUpdated'>) => {
    const siteWithId: SiteTableRow = {
      ...newSite,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    
    setSites(prevSites => [siteWithId, ...prevSites]);
    return siteWithId;
  }, []);

  // Function to delete a site
  const deleteSite = useCallback((siteId: string) => {
    setSites(prevSites => prevSites.filter(site => site.id !== siteId));
  }, []);

  return {
    sites,
    isLoading,
    error,
    refresh: fetchSites,
    updateSite,
    addSite,
    deleteSite
  };
};
