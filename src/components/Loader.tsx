import { Card, Typography, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoaderProps {
  headerText: string;
  minHeight: number;
}

const Loader: React.FC<LoaderProps> = ({ headerText, minHeight }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ minHeight: minHeight }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {headerText}
        </Typography>
        <Typography>{t("dashboard.loading")}</Typography>
      </CardContent>
    </Card>
  );
};

export default Loader;
