'use client';

import { COMMON_IMAGES } from '@/public';
import { Icon } from '@ne/uikit-dex';
import { toast as toastify } from 'react-toastify';

export type TypeToast = 'error' | 'success' | 'warning';

interface ToastConfig {
  title?: string;
  duration?: number;
  heading?: string;
  text?: string;
  type: TypeToast;
}

export const useToast = () => {
  const toast = ({
    type = 'error',
    heading,
    text,
    duration = 5000,
    ...params
  }: ToastConfig) => {
    toastify(
      <div className="flex-between  gap-2 items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-background-secondary p-1">
            <img
              src={COMMON_IMAGES.TOAST_ERROR}
              alt="icon"
              className="w-6 h-6"
            />
          </div>
          <div>
            <span className="block text-txt-primary ">{heading}</span>
            <span className="text-txt-secondary text-xs">{text}</span>
          </div>
        </div>
        <Icon onClick={() => toastify.dismiss()} size="xl" iconName="close" />
      </div>,
      {
        className:
          'bg-background-primary toast-custom flex flex-col pb-4 shadow-md',
        autoClose: duration,
        progressStyle: { background: 'var(--brand-primary)' },
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        position: 'bottom-right',
        hideProgressBar: false,
        ...params,
      },
    );
  };

  return { toast };
};
