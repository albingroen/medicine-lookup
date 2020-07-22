import React from "react";
import { Grid } from "basikit";
import MedicineCard from "./medicine-card";

interface IMedicinesListProps {
  medicines: any[];
  pushModal: (values: {
    title: string;
    content: React.ReactNode;
    id: string;
  }) => void;
  isLoading: boolean;
  value: string;
}

const MedicinesList: React.FC<IMedicinesListProps> = ({
  medicines,
  pushModal,
  isLoading,
  value,
}) => (
  <div className="medicines-list">
    <Grid gap="1rem" columns="repeat(auto-fit, minmax(400px, 1fr))">
      {medicines?.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          pushModal={pushModal}
          isLoading={isLoading}
          link={{
            pathname: `/${medicine.id}`,
            state: { search: value },
          }}
        />
      ))}
    </Grid>
  </div>
);

export default MedicinesList;
