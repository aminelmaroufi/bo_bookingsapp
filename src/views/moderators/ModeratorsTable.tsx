import { FC, ChangeEvent, useState, useEffect } from "react";
import Moment from "moment";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Pagination,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Rating,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { BlockTwoTone } from "@mui/icons-material";
import { IAdmin } from "src/models";

interface CustomersTableProps {
  moderators: Array<IAdmin>;
  openConfirmationDialog: (moderator: IAdmin) => void;
}

const ModeratorsTable: FC<CustomersTableProps> = ({
  moderators,
  openConfirmationDialog,
}) => {
  const theme = useTheme();

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Moderator Details</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Adress</TableCell>
              <TableCell>Create at</TableCell>
              <TableCell>Last update</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moderators.map((moderator) => {
              return (
                <TableRow hover key={moderator._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moderator.fullname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moderator.firstname}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moderator.lastname}
                    </Typography>
                  </TableCell>
                  <TableCell>{moderator.email}</TableCell>
                  <TableCell>
                    {Moment(moderator.created_at).format("ll")}
                  </TableCell>
                  <TableCell>
                    {Moment(moderator.updated_at).format("ll")}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip
                      title="Delete Customer"
                      arrow
                      onClick={() => openConfirmationDialog(moderator)}
                    >
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ModeratorsTable;
