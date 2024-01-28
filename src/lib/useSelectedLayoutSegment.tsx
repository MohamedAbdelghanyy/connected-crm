// useSelectedLayoutSegment.ts
import { useState } from 'react';

interface SelectedLayoutSegmentHook {
  selectedLayoutSegment: string | null;
  selectLayoutSegment: (segment: string | null) => void;
}

const useSelectedLayoutSegment = (): SelectedLayoutSegmentHook => {
  const [selectedLayoutSegment, setSelectedLayoutSegment] = useState<string | null>(null);

  const selectLayoutSegment = (segment: string | null) => {
    setSelectedLayoutSegment(segment);
  };

  return {
    selectedLayoutSegment,
    selectLayoutSegment,
  };
};

export default useSelectedLayoutSegment;
