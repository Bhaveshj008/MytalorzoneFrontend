import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-red-500" />
  </div>
);