import { Box, CircularProgress } from "@mui/material"

const ApiLoader = () => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default ApiLoader;