import { Button as MuiButton, type ButtonProps } from "@mui/material";

const Button = ({ children }: ButtonProps) => {
  return (
    <MuiButton
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        py: 1,
        borderRadius: 2,
        backgroundColor: "primary.main",
        textTransform: "uppercase",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#efefef",
          color: "text.secondary",
        },
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
