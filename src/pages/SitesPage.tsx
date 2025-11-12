import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack, 
  TextField, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  CircularProgress,
  MenuList,
  ListItem
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon, 
  Block as BlockIcon, 
  Delete as DeleteIcon,
  Home as HomeIcon,
  FiberManualRecord as StatusDotIcon
} from '@mui/icons-material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Check as CheckIcon,
  LocationOn as LocationIcon,
  Tune as TuneIcon,
  Public as RegionIcon
} from '@mui/icons-material';
import PageTemplate from './PageTemplate';
import DataTableFromFigma from '../components/tables/DataTableFromFigma';
import { Site, SiteTableRow, SiteStatus } from '../types/site.types';
import { transformSiteToTableRow } from '../utils/siteUtils';
import { useSites } from '../hooks/useSites';

// Settings menu component
const SettingsMenu: React.FC<{ siteId: string }> = ({ siteId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`${action} site ${siteId}`);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          padding: '4px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <MoreVertIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleAction('Edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Site</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('Deactivate')}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deactivate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleAction('Delete')} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

// UK Regions for filtering
const UK_REGIONS = [
  'All Regions',
  'London',
  'South East',
  'South West',
  'East of England',
  'Midlands',
  'North West',
  'North East',
  'Yorkshire and the Humber',
  'Wales',
  'Scotland',
  'Northern Ireland'
];

const SitesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [loadBalancingFilter, setLoadBalancingFilter] = useState<boolean | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const { sites, isLoading, error } = useSites();
  const filterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(e.target.value);
  };

  const toggleLoadBalancing = () => {
    setLoadBalancingFilter(prev => prev === null ? true : prev ? false : null);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const clearFilters = () => {
    setLocationFilter('');
    setLoadBalancingFilter(null);
    setSelectedRegion('All Regions');
  };

  // Transform site data to match the DataTableFromFigma format
  const chargerSites = sites.map(site => {
    // Simple way to assign a site type based on site name for demo purposes
    // In a real app, this would come from your data
    const siteTypes: ('house' | 'apartment' | 'parking')[] = ['house', 'apartment', 'parking'];
    const randomType = siteTypes[Math.floor(Math.random() * siteTypes.length)];
    
    // Generate a random number of chargers between 10 and 200
    const chargerCount = Math.floor(Math.random() * 191) + 10; // 10-200 chargers
    // Calculate active chargers (80-95% of total)
    const activePercentage = 0.8 + (Math.random() * 0.15); // 80-95%
    const activeChargers = Math.round(chargerCount * activePercentage);
    // Ensure we don't have more active chargers than total chargers
    const inactiveChargers = chargerCount - activeChargers;
    
    return {
      id: site.id,
      name: site.name,
      status: site.status.toLowerCase() as 'online' | 'offline' | 'maintenance',
      siteType: randomType,
      location: site.location,
      chargerCount,
      activeChargers,
      inactiveChargers,
      loadBalancing: Math.random() > 0.5 // Random true/false for demo
    };
  });

  // Filter sites based on search and filters
  const filteredSites = chargerSites.filter(site => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Location filter
    const matchesLocation = locationFilter === '' || 
      site.location.toLowerCase().includes(locationFilter.toLowerCase());

    // Load balancing filter
    const matchesLoadBalancing = loadBalancingFilter === null || 
      site.loadBalancing === loadBalancingFilter;

    // Region filter
    const matchesRegion = selectedRegion === 'All Regions' || 
      site.location.includes(selectedRegion);

    return matchesSearch && matchesLocation && matchesLoadBalancing && matchesRegion;
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
    // Navigate to site detail page or open edit modal
  };

  const handleSettingsClick = (row: any) => {
    console.log('Settings clicked for:', row);
    // Open settings modal or perform action
  };

  const handleMoreClick = (row: any) => {
    console.log('More options clicked for:', row);
    // Show more options menu
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageTemplate title="Sites">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, maxWidth: '800px' }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleFilterClick}
            startIcon={<FilterListIcon />}
            sx={{
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              backgroundColor: 'background.paper',
              '&:hover': {
                borderColor: 'text.secondary',
                backgroundColor: 'background.paper',
              },
              ...((locationFilter || loadBalancingFilter !== null || selectedRegion !== 'All Regions') && {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'primary.main',
                color: 'primary.main',
              })
            }}
          >
            {locationFilter || loadBalancingFilter !== null || selectedRegion !== 'All Regions' 
              ? 'Filters Active' 
              : 'Filter'}
          </Button>
          <TextField
            size="small"
            placeholder="Search sites..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ 
              flex: 1,
              minWidth: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: 'background.paper',
              },
            }}
          />
        </Box>
        <Menu
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              width: 300,
              p: 2,
            },
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight={600}>Filters</Typography>
            <Button 
              size="small" 
              onClick={clearFilters}
              disabled={!locationFilter && loadBalancingFilter === null && selectedRegion === 'All Regions'}
            >
              Clear all
            </Button>
          </Box>
          
          {/* Location Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationIcon fontSize="small" />
              Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by location..."
              value={locationFilter}
              onChange={handleLocationChange}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                },
              }}
            />
          </Box>

          {/* Load Balancing Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <TuneIcon fontSize="small" />
              Load Balancing
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={loadBalancingFilter === true ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setLoadBalancingFilter(true)}
                startIcon={loadBalancingFilter === true ? <CheckIcon /> : null}
                sx={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                }}
              >
                Enabled
              </Button>
              <Button
                variant={loadBalancingFilter === false ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setLoadBalancingFilter(false)}
                startIcon={loadBalancingFilter === false ? <CheckIcon /> : null}
                sx={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                }}
              >
                Disabled
              </Button>
            </Box>
          </Box>

          {/* UK Region Filter */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <RegionIcon fontSize="small" />
              UK Region
            </Typography>
            <Box sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              {UK_REGIONS.map((region) => (
                <MenuItem
                  key={region}
                  selected={selectedRegion === region}
                  onClick={() => handleRegionSelect(region)}
                  sx={{
                    py: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {selectedRegion === region && <CheckIcon fontSize="small" />}
                  </ListItemIcon>
                  <ListItemText primary={region} />
                </MenuItem>
              ))}
            </Box>
          </Box>
        </Menu>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => console.log('Add new site')}
          sx={{ boxShadow: 'none !important' }}
        >
          Add Site
        </Button>
      </Box>

      <DataTableFromFigma
        data={filteredSites}
        onRowClick={handleRowClick}
        onSettingsClick={handleSettingsClick}
        onMoreClick={handleMoreClick}
      />
    </PageTemplate>
  );
};

export default SitesPage;
