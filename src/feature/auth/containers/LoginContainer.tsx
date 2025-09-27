import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Button from "../../../components/Button";

const LoginContainer: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      navigate("/dashboard");
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "fa" ? "rtl" : "ltr";
  };

  const isRTL = i18n.language === "fa";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "#ffffff",
            minHeight: 500,
          }}
        >
          <Grid container sx={{ minHeight: 500 }}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                background: "#D3E1E7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                order: { xs: 1, md: isRTL ? 1 : 2 },
                p: 4,
                minHeight: 250,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/svgs/auth/pic-1.svg)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  top: "20%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/svgs/auth/pic-2.svg)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  top: "50%",
                  left: "-10%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(/svgs/auth/pic-3.svg)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  top: "70%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 2, md: isRTL ? 2 : 1 },
                p: 6,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "text.secondary",
                    mb: 4,
                  }}
                >
                  {t("login.loginButton")}
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    placeholder={t("login.nameLabel")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    sx={{
                      mb: 4,
                      "& .MuiInputBase-input": {
                        textAlign: isRTL ? "right" : "left",
                        direction: isRTL ? "rtl" : "ltr",
                      },
                    }}
                  />

                  <Button>{t("login.loginButton")}</Button>
                </form>

                <Box sx={{ mt: 6 }}>
                  <FormControl sx={{ minWidth: 150, mb: 2 }}>
                    <InputLabel
                      variant="standard"
                      htmlFor="language"
                      sx={{
                        textAlign: isRTL ? "right" : "left",
                        alignSelf: isRTL ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      {t("settings.language")}
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"en"}
                      inputProps={{
                        name: "language",
                        id: "language",
                      }}
                      onChange={toggleLanguage}
                      sx={{
                        color: "black",
                      }}
                    >
                      <option value={"en"}>{t("settings.english")}</option>
                      <option value={"fa"}>{t("settings.persian")}</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginContainer;
