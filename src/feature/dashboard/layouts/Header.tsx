import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAuth } from "../../../feature/auth/context/AuthContext";
import type { City } from "../types/weather";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  SettingsOutlined,
  Language,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import citiesData from "../../../data/cities-info.json";
import { useState } from "react";

interface HeaderProps {
  setSelectedCity: (city: City) => void;
  selectedCity: City;
}

const Header: React.FC<HeaderProps> = ({ setSelectedCity, selectedCity }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { darkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCityChange = (event: any) => {
    const cityIndex = event.target.value;
    setSelectedCity(citiesData[cityIndex]);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "fa" ? "rtl" : "ltr";
  };

  const getCityName = (city: City) => {
    return i18n.language === "fa" ? city.city_fa : city.city_en;
  };

  return (
    <AppBar
      color="transparent"
      position="static"
      sx={{
        mb: 4,
        backgroundColor: "transparent",
        boxShadow: "0 0px 10px 0 rgb(104, 102, 102)",
        paddingY: 1,
      }}
    >
      <Toolbar>
        <Avatar
          src="/svgs/landing/weather.svg"
          sx={{
            width: 40,
            height: 40,
            mx: 1,
            display: { xs: "none", sm: "none", md: "block" },
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            {t("dashboard.currentWeather")}
          </Box>
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 250, mx: 2 }}>
            <InputLabel>{t("dashboard.selectCity")}</InputLabel>
            <Select
              value={citiesData.findIndex(
                (city) => city.city_en === selectedCity.city_en
              )}
              label={t("dashboard.selectCity")}
              onChange={handleCityChange}
            >
              {citiesData.map((city, index) => (
                <MenuItem key={city.city_en} value={index}>
                  {getCityName(city)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={() => setSettingsOpen(!settingsOpen)}>
            <SettingsOutlined />
          </IconButton>
          {settingsOpen && (
            <Box
              sx={{
                position: "absolute",
                top: 50,
                [i18n.language === "fa" ? "left" : "right"]: 30,
                backgroundColor: "background.default",
                zIndex: 1000,
                borderRadius: 3,
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                px: 1,
                py: 3,
              }}
            >
              <IconButton onClick={toggleTheme}>
                {darkMode ? (
                  <LightModeIcon color="primary" />
                ) : (
                  <DarkModeIcon color="primary" />
                )}
              </IconButton>
              <IconButton onClick={toggleLanguage}>
                <Language color="primary" />
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogoutIcon color="primary" />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
