import { AuthProvider } from './AuthContext.jsx';
import { CartProvider } from './CartContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { ToastProvider } from './ToastContext.jsx';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
