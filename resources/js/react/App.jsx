import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { ColorModeContext } from "./theme/ColorModeContext";
import { useUser } from "./context/UserContext";

export default function App() {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const { activeUser, setActiveUser, users } = useUser();
    const hasUsers = users.length > 0;

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Staff Idea Board
                    </Typography>

                    <Typography variant="body2" sx={{ mr: 1, opacity: 0.8 }}>
                        Acting as:
                    </Typography>
                    <FormControl size="small" sx={{ mr: 2, minWidth: 160 }}>
                        <Select
                            value={activeUser?.id ?? ""}
                            disabled={!hasUsers}
                            onChange={(e) => {
                                const selected = users.find(
                                    (u) => u.id === e.target.value,
                                );
                                setActiveUser(selected);
                            }}
                            sx={{
                                color: "inherit",
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                                ".MuiSvgIcon-root": { color: "inherit" },
                            }}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name} ({user.role})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Tooltip
                        title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
                    >
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {mode === "light" ? (
                                <Brightness4Icon />
                            ) : (
                                <Brightness7Icon />
                            )}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth="xl"
                sx={{
                    pt: 3,
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
}
