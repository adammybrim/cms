import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  IconButton,
  Chip
} from '@mui/material';
import { ChargerSite } from './types/chargerTable.types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

// Define site types and their corresponding icons
const siteIcons = {
  house: HomeOutlinedIcon,
  apartment: ApartmentOutlinedIcon,
  parking: LocalParkingOutlinedIcon,
  default: HomeOutlinedIcon
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  height: 75,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #E5E7EB',
    padding: '16px 24px',
    boxShadow: '0 1px 0 0 #E5E7EB',
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#111827',
    borderBottom: '1px solid #E5E7EB',
    padding: '16px 24px',
  },
}));

const StatusBadge = ({ status }: { status: 'online' | 'offline' | 'maintenance' }) => {
  const statusConfig = {
    online: {
      bgColor: '#ECFDF5',
      dotColor: '#10B981',
      textColor: '#065F46',
      label: 'Online'
    },
    offline: {
      bgColor: '#FEF2F2',
      dotColor: '#EF4444',
      textColor: '#991B1B',
      label: 'Offline'
    },
    maintenance: {
      bgColor: '#FFFBEB',
      dotColor: '#F59E0B',
      textColor: '#92400E',
      label: 'Maintenance'
    }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        padding: '2px 8px',
        borderRadius: '12px',
        backgroundColor: config.bgColor,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: config.dotColor,
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: config.textColor,
          fontWeight: 500,
          textTransform: 'capitalize',
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        {config.label}
      </Typography>
    </Box>
  );
};

interface ChargerStatusProps {
  active: number;
  inactive: number;
}

const ChargerStatus: React.FC<ChargerStatusProps> = ({ active, inactive }) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Chip
      label={`${active} Active`}
      size="small"
      variant="outlined"
      sx={{
        color: '#065F46',
        borderColor: '#A7F3D0',
        backgroundColor: '#ECFDF5',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '16px',
        height: '24px',
      }}
    />
    <Chip
      label={`${inactive} Inactive`}
      size="small"
      variant="outlined"
      sx={{
        color: '#92400E',
        borderColor: '#FCD34D',
        backgroundColor: '#FFFBEB',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '16px',
        height: '24px',
      }}
    />
  </Box>
);

interface DataTableFromFigmaProps {
  data: ChargerSite[];
  onRowClick?: (row: ChargerSite) => void;
  onSettingsClick?: (row: ChargerSite) => void;
  onMoreClick?: (row: ChargerSite) => void;
}

const DataTableFromFigma: React.FC<DataTableFromFigmaProps> = ({
  data,
  onRowClick,
  onSettingsClick,
  onMoreClick,
}) => {
  const handleRowClick = (row: ChargerSite) => {
    if (onRowClick) onRowClick(row);
  };

  const handleSettingsClick = (e: React.MouseEvent, row: ChargerSite) => {
    e.stopPropagation();
    if (onSettingsClick) onSettingsClick(row);
  };

  const handleMoreClick = (e: React.MouseEvent, row: ChargerSite) => {
    e.stopPropagation();
    if (onMoreClick) onMoreClick(row);
  };

  return (
    <TableContainer 
      sx={{ 
        borderRadius: '8px', 
        border: '1px solid #E5E7EB',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFFFFF',
        '& .MuiTable-root': {
          backgroundColor: '#FFFFFF',
        },
        '& .MuiTableHead-root': {
          backgroundColor: '#F8F9FB',
        },
        '& .MuiTableBody-root': {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ 
            backgroundColor: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#FFFFFF !important',
            },
          }}>
            <StyledTableCell sx={{ fontWeight: 700, fontSize: '16px' }}>Charging Site</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700, fontSize: '16px' }}>Location</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700, fontSize: '16px' }}>No. of Chargers</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700, fontSize: '16px' }}>Charger Status</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700, fontSize: '16px' }}>Load Balancing</StyledTableCell>
            <StyledTableCell sx={{ width: '48px' }}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow 
              key={row.id} 
              hover 
              onClick={() => handleRowClick(row)}
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#F3F4F6',
                      '&:hover': {
                        backgroundColor: '#E5E7EB',
                      },
                    }}
                  >
                    {React.createElement(siteIcons[row.siteType || 'default'], {
                      fontSize: 'small',
                      sx: { 
                        color: '#6B7280',
                        fontSize: '18px'
                      }
                    })}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {row.name}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <StatusBadge status={row.status} />
                    </Box>
                  </Box>
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2" color="text.secondary">
                  {row.location}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2" fontWeight={500}>
                  {row.chargerCount}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <ChargerStatus
                  active={row.activeChargers}
                  inactive={row.inactiveChargers}
                />
              </StyledTableCell>
              <StyledTableCell>
                <Chip
                  label={row.loadBalancing ? 'Enabled' : 'Disabled'}
                  size="small"
                  variant={row.loadBalancing ? 'filled' : 'outlined'}
                  sx={{
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    backgroundColor: row.loadBalancing ? '#EFF6FF' : 'transparent',
                    borderColor: row.loadBalancing ? '#BFDBFE' : '#E5E7EB',
                    color: row.loadBalancing ? '#1E40AF' : '#6B7280',
                    height: '24px',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>
                <IconButton 
                  size="small" 
                  onClick={(e) => handleMoreClick(e, row)}
                  sx={{
                    color: '#6B7280',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <MoreVertOutlinedIcon fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTableFromFigma;
