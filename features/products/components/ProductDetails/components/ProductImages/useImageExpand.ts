import { useState, useCallback } from 'react';

interface UseImageExpandProps {
  expandedUrl: string | null;
  handleImageClick: (url: string) => void;
  handleClose: () => void;
}

export const useImageExpand = (): UseImageExpandProps => {
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);

  const handleImageClick = useCallback((url: string) => {
    setExpandedUrl(url);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedUrl(null);
  }, []);

  return {
    expandedUrl,
    handleImageClick,
    handleClose,
  };
};
