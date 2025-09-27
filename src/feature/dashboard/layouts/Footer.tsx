import { Paper, Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Email, CalendarMonth } from "@mui/icons-material";

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <Paper
      component="footer"
      sx={{
        mt: 7,
        background: darkMode
          ? "linear-gradient(to right, #292F45, #3F4861 70%  , #151D32)"
          : "linear-gradient(to right, #F3FAFE, #CCDDDD9E 70%  , #F3FAFE)",
        py: 4,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: { xs: 4, md: 0 },
        }}
      >
        <Avatar
          sx={{ width: 40, height: 40 }}
          src="/svgs/landing/nodinsoft.svg"
        />
        <Typography variant="h6">{t("dashboard.servedBy")}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: { xs: "space-between", md: "inherit" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Email />
          <Typography variant="h6">{t("dashboard.contactUs")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarMonth />
          <Typography variant="h6">{t("dashboard.published")}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Footer;
