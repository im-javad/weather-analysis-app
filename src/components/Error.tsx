import { Card, Typography, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorProps {
  headerText: string;
  minHeight: number;
}

const Error: React.FC<ErrorProps> = ({ headerText, minHeight }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ minHeight: minHeight }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {headerText}
        </Typography>
        <Typography color="error">{t("dashboard.error")}</Typography>
      </CardContent>
    </Card>
  );
};

export default Error;
