import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import format from 'date-fns/format';
import PageTemplate from './PageTemplate';
import MetricCard from '../components/cards/MetricCard';
import DateInterval from '../components/common/DateInterval';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setDateRange(range);
    // Here you would typically fetch new data based on the selected date range
  };

  const formatDateRange = (start: Date, end: Date) => {
    const startFormatted = format(start, 'MMM d, yyyy');
    const endFormatted = format(end, 'MMM d, yyyy');
    
    if (startFormatted === endFormatted) {
      return startFormatted;
    }
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <PageTemplate 
      title="Dashboard" 
      subtitle={
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2, 
          width: '100%',
          mt: 0.5 
        }}>
          <Box sx={{ flexShrink: 0 }}>
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
              {formatDateRange(dateRange.start, dateRange.end)}
            </Typography>
          </Box>
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'flex-end',
            width: '100%',
            maxWidth: { sm: 'calc(100% - 200px)' },
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            <DateInterval onDateRangeChange={handleDateRangeChange} />
          </Box>
        </Box>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Revenue"
              value="$24,780"
              change={12.5}
              trend="up"
              icon={<AttachMoneyIcon />}
              period="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Users"
              value="1,842"
              change={8.2}
              trend="up"
              icon={<PeopleIcon />}
              period="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="New Orders"
              value="356"
              change={-3.1}
              trend="down"
              icon={<ShoppingCartIcon />}
              period="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Avg. Session"
              value="4m 23s"
              change={5.7}
              trend="up"
              icon={<BarChartIcon />}
              period="vs last month"
            />
          </Grid>
        </Grid>
      </Box>
    </PageTemplate>
  );
};

export default DashboardPage;
