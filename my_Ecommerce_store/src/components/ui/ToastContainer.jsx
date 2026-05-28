import { CheckCircle2, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-4 top-20 z-50 grid w-[min(22rem,calc(100vw-2rem))] gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="surface flex items-start gap-3 rounded-lg p-4">
          {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-teal-600" /> : <Info className="h-5 w-5 text-sky-600" />}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} aria-label="Dismiss notification">
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
