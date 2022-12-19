export const styles = {
  button: {
    '&.MuiButtonBase-root': {
      color: 'var(--accent-text-color)',
      boxShadow: 'var( --outset-box-shadow)',
      borderRadius: '40px',
      lineHeight: 'normal',
      '&:disabled, &:active': {
        boxShadow: 'var(--inset-input-shadow)',
        transform: 'scale(0.99)',
        color: 'var(--active-color)',
      },

    }
  }
}
