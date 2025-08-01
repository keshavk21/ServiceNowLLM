import React from 'react';
import { Box } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Box className="w-6 h-6 text-blue-600" />
      <span className="text-xl font-semibold">SupportForce</span>
    </div>
  );
};