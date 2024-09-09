// pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { DashboardTemplate } from '../templates/DashboardTemplate';
import { MedicationPriceChart } from '../organisms/MedicationPriceChart';
import { ResearchFundingChart } from '../organisms/ResearchFundingChart';
import { ClinicalTrialsChart } from '../organisms/ClinicalTrialsChart';

export const Dashboard: React.FC = () => {
  const [medicationData, setMedicationData] = useState<any>(null);
  const [researchData, setResearchData] = useState<any>(null);

  useEffect(() => {
    import('../../data/data_exemple2.json').then(module => setMedicationData(module.default));
    import('../../data/data_exemple3.json').then(module => setResearchData(module.default));
  }, []);

  if (!medicationData || !researchData) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardTemplate
      medicationChart={<MedicationPriceChart medicationData={medicationData} />}
      researchFundingChart={<ResearchFundingChart researchData={researchData} />}
      clinicalTrialsChart={<ClinicalTrialsChart researchData={researchData} />}
    />
  );
};