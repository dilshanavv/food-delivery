import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Tooltip,
  Button
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  fetchStores();
  fetchStoreTypes(); 
}, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stores");
      setStores(res.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  const [storeTypes, setStoreTypes] = useState([]);

const fetchStoreTypes = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/store-types");
   setStoreTypes(res.data || []);
  } catch (error) {
    console.error(error);
  }
};
const getStoreTypeName = (id) => {
  if (!id || !storeTypes.length) return "-";

  const type = storeTypes.find(
    (st) => st.store_type_id?.toLowerCase() === id?.toLowerCase()
  );

  return type?.type_name || "-";
};
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this store?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/stores/${id}`);
      fetchStores();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
    <Stack 
  direction="row" 
  justifyContent="flex-end" 
  spacing={2} 
  sx={{ mb: 2 }}
>

  {/* Back Button */}
  <Button
    variant="outlined"
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate(-1)}
  >
    Back
  </Button>

  {/* Add Store Button */}
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={() => navigate("/store/create")}
  >
    Add Store
  </Button>

</Stack>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Store List
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Store Type</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Min Purchase</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stores.length > 0 ? (
                stores.map((store) => (
                  <TableRow key={store.store_id}>
                    <TableCell>{store.title_en}</TableCell>
                    <TableCell>{getStoreTypeName(store.store_type_id)}</TableCell>
                    <TableCell>{store.primary_contact}</TableCell>
                    <TableCell>{store.minimum_purchase}</TableCell>
                    <TableCell>{store.commission_rate}%</TableCell>
                    <TableCell>
                      {store.delivery ? "Yes" : "No"}
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        
                        {/* View */}
                        <Tooltip title="View">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/store/view/${store.store_id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        {/* Edit */}
                        <Tooltip title="Edit">
                          <IconButton
                            color="warning"
                            onClick={() =>
                              navigate(`/store/edit/${store.store_id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        {/* Delete */}
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(store.store_id)
                            }
                          >
               
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Stores Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}