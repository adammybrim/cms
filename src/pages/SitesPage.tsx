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
  CircularProgress
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon, 
  Block as BlockIcon, 
  Delete as DeleteIcon,
  Home as HomeIcon,
  FiberManualRecord as StatusDotIcon
} from '@mui/icons-material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageTemplate from './PageTemplate';
import DataTable, { Column } from '../components/tables/DataTable';
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

const SitesPage: React.FC = () => {
  const [selected, setSelected] = useState<SiteTableRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { sites, isLoading, error } = useSites();

  // Filter rows based on search term
  const filteredRows = sites.filter((row: SiteTableRow) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Define columns
  const columns: Column<SiteTableRow>[] = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 250,
      sortable: true,
      headerAlign: 'left',
      format: (value: string, row: SiteTableRow) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            <HomeIcon />
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={500} color="text.primary">
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StatusDotIcon 
                fontSize="small" 
                sx={{
                  fontSize: '0.5rem',
                  color: (theme) => {
                    switch(row.status) {
                      case SiteStatus.ONLINE:
                        return theme.palette.success.main;
                      case SiteStatus.OFFLINE:
                        return theme.palette.error.main;
                      case SiteStatus.MAINTENANCE:
                        return theme.palette.warning.main;
                      default:
                        return 'text.secondary';
                    }
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {row.status.charAt(0) + row.status.slice(1).toLowerCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 200,
      sortable: true,
      align: 'left',
      headerAlign: 'left',
      format: (value: string) => (
        <Box sx={{ lineHeight: 1.4 }}>
          {value}
        </Box>
      ),
    },
    {
      id: 'chargers',
      label: 'Chargers',
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: true,
    },
    {
      id: 'lastUpdated',
      label: 'Last Updated',
      minWidth: 150,
      align: 'right',
      headerAlign: 'center',
      sortable: true,
    },
    {
      id: 'id',
      label: '',
      minWidth: 48,
      width: 48,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      format: (_, row) => <SettingsMenu key={row.id} siteId={row.id} />,
    } as Column<SiteTableRow>,
  ];

  const handleRowClick = (row: SiteTableRow) => {
    console.log('Row clicked:', row);
    // Navigate to site detail page or open edit modal
  };

  const handleSelectionChange = (selected: SiteTableRow[]) => {
    setSelected(selected);
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
        <TextField
          size="small"
          placeholder="Search sites..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => console.log('Add new site')}
        >
          Add Site
        </Button>
      </Box>

      <DataTable<SiteTableRow>
        columns={columns}
        rows={filteredRows}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={5}
        showCheckboxes={true}
        getRowId={(row) => row.id}
      />

      {selected.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => console.log('Deactivate selected')}
              disabled={selected.length === 0}
            >
              Deactivate ({selected.length})
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log('Edit selected')}
              disabled={selected.length !== 1}
            >
              Edit Site
            </Button>
          </Stack>
        </Box>
      )}
    </PageTemplate>
  );
};

export default SitesPage;
