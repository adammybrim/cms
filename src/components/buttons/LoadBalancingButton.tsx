import React from 'react';
import { Button, styled, ButtonProps } from '@mui/material';
import { SvgIcon, SvgIconProps } from '@mui/material';

interface LoadBalancingButtonProps extends ButtonProps {
  /**
   * If `true`, the button will be in the disabled state
   */
  disabled?: boolean;
  /**
   * The label to display on the button
   */
  label: string;
  /**
   * The sublabel to display below the main label
   */
  sublabel?: string;
  /**
   * Callback fired when the button is clicked
   */
  onClick?: () => void;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  textTransform: 'none',
  padding: theme.spacing(0.5, 1),
  borderRadius: '4px',
  border: '1px solid',
  borderColor: disabled ? theme.palette.grey[300] : theme.palette.primary.main,
  backgroundColor: disabled ? theme.palette.grey[100] : 'transparent',
  width: '100px',
  height: '32px',
  minWidth: 'unset',
  '&:hover': {
    backgroundColor: disabled ? theme.palette.grey[100] : theme.palette.action.hover,
  },
}));

const Label = styled('span', {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  fontWeight: 500,
  fontSize: '0.75rem',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
}));

const Sublabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
  fontSize: '0.625rem',
  lineHeight: 1.2,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
}));


const LoadBalancingButton: React.FC<LoadBalancingButtonProps> = ({
  disabled = false,
  label,
  sublabel = 'Click to configure',
  onClick,
  ...props
}) => {
  return (
    <div style={{ width: '100%' }}>
      <StyledButton 
        variant="outlined" 
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <Label disabled={disabled}>
            {label}
          </Label>
          {sublabel && (
            <Sublabel disabled={disabled}>
              {sublabel}
            </Sublabel>
          )}
        </div>
      </StyledButton>
    </div>
  );
};

export default LoadBalancingButton;
