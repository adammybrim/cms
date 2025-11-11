import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';

interface ButtonProps extends Omit<MuiButtonProps, 'color' | 'variant' | 'size'> {
  /**
   * The variant of the button
   * @default 'contained'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * The color of the button
   * @default 'primary'
   */
  color?: ButtonColor;
  /**
   * If `true`, the button will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If `true`, the button will show a loading indicator
   * @default false
   */
  loading?: boolean;
  /**
   * The position of the loading indicator when `loading` is true
   * @default 'start'
   */
  loadingPosition?: 'start' | 'end';
  /**
   * The size of the loading indicator
   * @default 20
   */
  loadingSize?: number;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => !['loading', 'loadingPosition', 'loadingSize'].includes(prop as string),
})<ButtonProps>(({ theme, variant = 'contained', size = 'medium', color = 'primary', fullWidth, loading }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  padding: size === 'large' ? '12px 24px' : size === 'small' ? '6px 16px' : '8px 20px',
  fontSize: size === 'large' ? '16px' : size === 'small' ? '14px' : '15px',
  lineHeight: 1.5,
  minWidth: size === 'large' ? '120px' : size === 'small' ? '80px' : '100px',
  '&:hover': {
    boxShadow: 'none',
    ...(variant === 'contained' && {
      backgroundColor: theme.palette[color].dark,
    }),
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    ...(variant === 'contained' && {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    }),
    ...(variant === 'outlined' && {
      borderColor: theme.palette.action.disabled,
      color: theme.palette.action.disabled,
    }),
    ...(variant === 'text' && {
      color: theme.palette.action.disabled,
    }),
  },
  ...(fullWidth && {
    width: '100%',
  }),
  ...(loading && {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
    },
  }),
}));

const LoadingWrapper = styled('span', {
  shouldForwardProp: (prop) => prop !== 'loadingPosition',
})<{ loadingPosition: 'start' | 'end' }>(({ theme, loadingPosition }) => ({
  display: 'inline-flex',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
}));

/**
 * A customizable button component that follows the design system.
 * 
 * ## Features
 * - Multiple variants: contained (default), outlined, text
 * - Multiple sizes: small, medium (default), large
 * - Multiple colors: primary (default), secondary, error, success, warning, info
 * - Loading state with configurable position and size
 * - Full-width support
 * - Responsive design
 * - Accessible by default
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  loading = false,
  loadingPosition = 'start',
  loadingSize = 20,
  startIcon,
  endIcon,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      loading={loading}
      loadingPosition={loadingPosition}
      {...props}
    >
      {loading && (
        <LoadingWrapper loadingPosition={loadingPosition}>
          <CircularProgress 
            color={variant === 'contained' ? 'inherit' : color} 
            size={loadingSize} 
          />
        </LoadingWrapper>
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </StyledButton>
  );
};

export default Button;

// Example usage:
/*
<Button 
  variant="contained"
  color="primary"
  size="medium"
  fullWidth={false}
  loading={false}
  loadingPosition="start"
  startIcon={<AddIcon />}
  onClick={() => console.log('Button clicked')}
>
  Add Item
</Button>
*/
