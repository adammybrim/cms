import React, { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import subMonths from 'date-fns/subMonths';

type DateRange = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'custom';

interface DateIntervalProps {
  onDateRangeChange?: (range: { start: Date; end: Date }) => void;
  initialRange?: DateRange;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '6px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&:not(:first-of-type)': {
      borderRadius: '6px',
      marginLeft: 0,
    },
    '&:first-of-type': {
      borderRadius: '6px',
    },
  },
}));

const ButtonContainer = styled(Box)({
  display: 'fill',
  justifyContent: 'flex-end',
  width: '100%',
  marginRight: 'auto',
});

const DateInterval: React.FC<DateIntervalProps> = ({ onDateRangeChange, initialRange = 'thisWeek' }) => {
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState<DateRange>(initialRange);

  const getDateRange = (range: DateRange) => {
    const now = new Date();
    const start = new Date();
    const end = new Date();
    let text = '';

    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        text = 'Today';
        break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        text = 'Yesterday';
        break;
      case 'thisWeek':
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        start.setDate(diff);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        text = 'This Week';
        break;
      case 'lastWeek':
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        const lastWeekDay = lastWeek.getDay();
        const lastWeekDiff = lastWeek.getDate() - lastWeekDay + (lastWeekDay === 0 ? -6 : 1);
        start.setDate(lastWeekDiff);
        start.setHours(0, 0, 0, 0);
        end.setDate(lastWeekDiff + 6);
        end.setHours(23, 59, 59, 999);
        text = 'Last Week';
        break;
      case 'thisMonth':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        text = 'This Month';
        break;
      case 'lastMonth':
        start.setMonth(start.getMonth() - 1, 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(0); // Last day of previous month
        end.setHours(23, 59, 59, 999);
        text = 'Last Month';
        break;
      case 'custom':
        // Custom date range logic would go here
        text = 'Custom Range';
        break;
    }

    return { start, end, text };
  };

  const handleRangeChange = (event: React.MouseEvent<HTMLElement>, newRange: DateRange | null) => {
    if (newRange !== null) {
      setSelectedRange(newRange);
      const { start, end } = getDateRange(newRange);
      onDateRangeChange?.({ start, end });
    }
  };


  return (
    <Box sx={{ width: '100%' }}>
      <StyledToggleButtonGroup
        value={selectedRange}
        exclusive
        onChange={handleRangeChange}
        aria-label="date range"
        size="small"
        sx={{ width: '100%', justifyContent: 'flex-end' }}
      >
        <ToggleButton value="today" aria-label="today">
          Today
        </ToggleButton>
        <ToggleButton value="yesterday" aria-label="yesterday">
          Yesterday
        </ToggleButton>
        <ToggleButton value="thisWeek" aria-label="this week">
          This Week
        </ToggleButton>
        <ToggleButton value="lastWeek" aria-label="last week">
          Last Week
        </ToggleButton>
        <ToggleButton value="thisMonth" aria-label="this month">
          This Month
        </ToggleButton>
        <ToggleButton value="lastMonth" aria-label="last month">
          Last Month
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default DateInterval;
