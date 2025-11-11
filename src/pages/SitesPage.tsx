import React, { useState } from 'react';
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
  Divider 
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon, 
  Block as BlockIcon, 
  Delete as DeleteIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import PageTemplate from './PageTemplate';
import DataTable, { Column } from '../components/tables/DataTable';

// Types
type Site = {
  id: string;
  name: string;
  location: string;
  chargers: number;
  active: boolean;
  status: 'Online' | 'Offline' | 'Maintenance';
  lastUpdated: string;
};

// Sample data
const createData = (
  id: string,
  name: string,
  location: string,
  chargers: number,
  active: boolean,
  status: 'Online' | 'Offline' | 'Maintenance',
  lastUpdated: string
): Site => ({
  id,
  name,
  location,
  chargers,
  active,
  status,
  lastUpdated,
});

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

const rows: Site[] = [
  createData('1', 'Downtown Charging', '123 Main St, City', 4, true, 'Online', '2023-11-10 14:30'),
  createData('2', 'Mall Parking', '456 Mall Rd, City', 8, true, 'Online', '2023-11-10 15:15'),
  createData('3', 'Airport Terminal A', '789 Airport Rd', 6, true, 'Maintenance', '2023-11-09 10:45'),
  createData('4', 'University Campus', '101 College Ave', 10, true, 'Online', '2023-11-10 16:20'),
  createData('5', 'Suburban Station', '202 Train St', 5, false, 'Offline', '2023-11-08 09:10'),
];

const SitesPage: React.FC = () => {
  const [selected, setSelected] = useState<Site[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter rows based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns
  const columns: Column<Site>[] = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 250,
      sortable: true,
      headerAlign: 'left',
      format: (value: string, row: Site) => (
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
            flexShrink: 0,
          }}>
            <HomeIcon fontSize="small" sx={{ color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={500} color="text.primary">
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.chargers} available • {row.status}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 200,
      sortable: true,
      align: 'center',
      headerAlign: 'center',
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
      id: 'status',
      label: 'Status',
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: true,
      format: (value: string) => {
        const colorMap = {
          Online: 'success',
          Offline: 'error',
          Maintenance: 'warning',
        } as const;
        
        return (
          <Chip 
            label={value} 
            color={colorMap[value as keyof typeof colorMap] || 'default'}
            size="small"
            sx={{
              height: '24px',
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '0.75rem',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        );
      },
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
      id: 'id',  // Using 'id' as a fallback since it exists in Site type
      label: '',
      minWidth: 48,
      width: 48,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      format: (_, row) => <SettingsMenu siteId={row.id} />,
    } as Column<Site>,
  ];

  const handleRowClick = (row: Site) => {
    console.log('Row clicked:', row);
    // Navigate to site detail page or open edit modal
  };

  const handleSelectionChange = (selected: Site[]) => {
    setSelected(selected);
  };

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

      <DataTable
        columns={columns}
        rows={filteredRows}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={5}
        showCheckboxes={true}
        stickyHeader={true}
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
