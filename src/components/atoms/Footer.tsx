import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();


  return (
    <footer className="bg-gray-200 p-4">
      <Typography variant="body2" align="center">
        {t("conditions")}{" "}
      </Typography>
    </footer>
  );
};

export default Footer;
