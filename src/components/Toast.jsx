import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const styles = {
  success: { bar: 'bg-forest-800',  text: 'text-forest-800',  bg: 'bg-white border-gray-200' },
  error:   { bar: 'bg-burgundy',    text: 'text-burgundy',    bg: 'bg-white border-gray-200' },
  info:    { bar: 'bg-charcoal',    text: 'text-charcoal',    bg: 'bg-white border-gray-200' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      {toasts.map(toast => {
        const s = styles[toast.type] || styles.success;
        return (
          <div
            key={toast.id}
            className={`flex items-stretch border shadow-classic-md toast-enter ${s.bg}`}
          >
            <div className={`w-1 flex-shrink-0 ${s.bar}`} />
            <div className="flex items-center justify-between gap-3 px-4 py-3 flex-1">
              <p className={`text-sm font-sans font-medium ${s.text}`}>{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-charcoal-lighter hover:text-charcoal flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
