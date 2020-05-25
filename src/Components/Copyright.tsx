import React from "react";
import { Typography, Link } from "@material-ui/core"

export const Copyright: React.FC = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://houseofkabobmd.com/">
                House of Kabob
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

export default Copyright;
