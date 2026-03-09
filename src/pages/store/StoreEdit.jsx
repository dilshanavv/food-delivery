
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  CircularProgress
} from "@mui/material";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MainCard from 'components/MainCard';
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import ImageIcon from "@mui/icons-material/Image";
export default function StoreEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [branchGroups, setBranchGroups] = useState([]);
  const [storeTypes, setStoreTypes] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    branch_group_id: "",
    store_type_id: "",
    title_en: "",
    title_ar: "",
    address_en: "",
    address_ar: "",
    primary_contact: "",
    secondary_contact: "",
    logo: "",
    cover_image: "",
    from_time: null,
    to_time: null,
    latitude: "",
    longitude: "",
    minimum_purchase: "",
    commission_rate: "",
    delivery_charge: "",
    delivery_range: "",
    cod_pay: false,
    online_pay: false,
    wallet_pay: false,
    card_pay: false,
    dining: false,
    take_away: false,
    delivery: false,
    busy: false,
    pure_veg: false,
    status: true
  });

 useEffect(() => {
  loadDropdowns();
  loadStore();
}, [id]);

  //  Load Dropdowns
  const loadDropdowns = async () => {
    try {
      const branchRes = await api.get("/branch-groups");
      const storeTypeRes = await api.get("/store-types");

      const branchData = Array.isArray(branchRes.data)
        ? branchRes.data
        : branchRes.data?.data || [];

      const storeTypeData = Array.isArray(storeTypeRes.data)
        ? storeTypeRes.data
        : storeTypeRes.data?.data || [];

      setBranchGroups(branchData);
      setStoreTypes(storeTypeData);

    } catch (error) {
      console.log("Dropdown Load Error:", error);
    }
  };
const handleFileChange = (e) => {
  const { name, files } = e.target;
  setForm({
    ...form,
    [name]: files[0]
  });
};
  //  Load Store By ID
  const loadStore = async () => {
  if (!id) return;

  try {
    setLoading(true);
    const res = await api.get(`/stores/${id}`);
      const data = res.data.data || res.data;

      setForm({
        ...data,
        from_time: data.from_time
          ? dayjs(data.from_time, "HH:mm:ss")
          : null,
        to_time: data.to_time
          ? dayjs(data.to_time, "HH:mm:ss")
          : null,
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        minimum_purchase: data.minimum_purchase ?? "",
        commission_rate: data.commission_rate ?? "",
        delivery_charge: data.delivery_charge ?? "",
        delivery_range: data.delivery_range ?? ""
      });

      setLoading(false);

    } catch (error) {
      console.log("Load Store Error:", error);
      alert("Failed to load store");
      setLoading(false);
    }
  };

  // 🔹 Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value === ""
          ? ""
          : type === "number"
          ? Number(value)
          : value
    }));
  };

  // 🔹 Update Store
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,

        branch_group_id: form.branch_group_id || null,
        store_type_id: form.store_type_id || null,

        latitude:
          form.latitude === "" ? null : Number(form.latitude),

        longitude:
          form.longitude === "" ? null : Number(form.longitude),

        delivery_range:
          form.delivery_range === "" ? null : Number(form.delivery_range),

        minimum_purchase:
          form.minimum_purchase === "" ? null : Number(form.minimum_purchase),

        commission_rate:
          form.commission_rate === "" ? null : Number(form.commission_rate),

        delivery_charge:
          form.delivery_charge === "" ? null : Number(form.delivery_charge),

        from_time: form.from_time
          ? dayjs(form.from_time).format("HH:mm:ss")
          : null,

        to_time: form.to_time
          ? dayjs(form.to_time).format("HH:mm:ss")
          : null
      };

      await api.put(`/stores/${id}`, payload);

      alert("Store Updated Successfully");
      navigate("/store/list");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
  
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box p={3}>
      <MainCard title="Edit Store">
        <form onSubmit={handleSubmit}>
         <Grid container spacing={4}>

  {/* ================= BASIC INFO CARD ================= */}
  <Grid item xs={12}>
    <MainCard
      contentSX={{ p: 3 }}
      sx={{ borderRadius: 3 }}
      title={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BusinessIcon color="primary" />
          <Typography variant="h6">Basic Information</Typography>
        </Box>
      }
    >
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Branch Group"
            name="branch_group_id"
            value={form.branch_group_id || ""}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select Branch</em>
            </MenuItem>
            {branchGroups.map((bg) => (
              <MenuItem key={bg.branch_group_id} value={bg.branch_group_id}>
                {bg.franchise_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Store Type"
            name="store_type_id"
            value={form.store_type_id || ""}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select Store Type</em>
            </MenuItem>
            {storeTypes.map((st) => (
              <MenuItem key={st.store_type_id} value={st.store_type_id}>
                {st.type_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Title English"
            name="title_en"
            value={form.title_en}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Title Arabic"
            name="title_ar"
            value={form.title_ar}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </MainCard>
  </Grid>


  {/* ================= CONTACT CARD ================= */}
  <Grid item xs={12}>
    <MainCard
      contentSX={{ p: 3 }}
      sx={{ borderRadius: 3 }}
      title={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon color="primary" />
          <Typography variant="h6">Contact Information</Typography>
        </Box>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Primary Contact"
            name="primary_contact"
            value={form.primary_contact}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Secondary Contact"
            name="secondary_contact"
            value={form.secondary_contact}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </MainCard>
  </Grid>


  {/* ================= LOCATION CARD ================= */}
  <Grid item xs={12}>
    <MainCard
      contentSX={{ p: 3 }}
      sx={{ borderRadius: 3 }}
      title={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="h6">Location Information</Typography>
        </Box>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            fullWidth
            label="Latitude"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            fullWidth
            label="Longitude"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Address English"
    name="address_en"
    value={form.address_en}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Address Arabic"
    name="address_ar"
    value={form.address_ar}
    onChange={handleChange}
  />
</Grid>
      </Grid>
      {/* ================= TIMING CARD ================= */}
<Grid item xs={12}>
  <MainCard
    contentSX={{ p: 3 }}
    sx={{ borderRadius: 3 }}
    title={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AccessTimeIcon color="primary" />
        <Typography variant="h6">Store Timing</Typography>
      </Box>
    }
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TimePicker
          label="Opening Time"
          value={form.from_time}
          onChange={(newValue) =>
            setForm(prev => ({ ...prev, from_time: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TimePicker
          label="Closing Time"
          value={form.to_time}
          onChange={(newValue) =>
            setForm(prev => ({ ...prev, to_time: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
    </Grid>
  </MainCard>
</Grid>
{/* ================= DELIVERY SETTINGS ================= */}
<Grid item xs={12}>
  <MainCard
    contentSX={{ p: 3 }}
    sx={{ borderRadius: 3 }}
    title={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SettingsIcon color="primary" />
        <Typography variant="h6">Delivery Settings</Typography>
      </Box>
    }
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <TextField
          type="number"
          fullWidth
          label="Minimum Purchase"
          name="minimum_purchase"
          value={form.minimum_purchase}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          type="number"
          fullWidth
          label="Commission Rate"
          name="commission_rate"
          value={form.commission_rate}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          type="number"
          fullWidth
          label="Delivery Charge"
          name="delivery_charge"
          value={form.delivery_charge}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          type="number"
          fullWidth
          label="Delivery Range (KM)"
          name="delivery_range"
          value={form.delivery_range}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  </MainCard>
</Grid>
{/* ================= PAYMENT METHODS ================= */}
<Grid item xs={12}>
  <MainCard
    contentSX={{ p: 3 }}
    sx={{ borderRadius: 3 }}
    title={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PaymentIcon color="primary" />
        <Typography variant="h6">Payment Methods</Typography>
      </Box>
    }
  >
    <Grid container spacing={2}>
      {[
        { label: "COD", name: "cod_pay" },
        { label: "Online Pay", name: "online_pay" },
        { label: "Wallet Pay", name: "wallet_pay" },
        { label: "Card Pay", name: "card_pay" }
      ].map((item) => (
        <Grid item xs={12} md={3} key={item.name}>
          <FormControlLabel
            control={
              <Switch
                checked={form[item.name]}
                onChange={handleChange}
                name={item.name}
              />
            }
            label={item.label}
          />
        </Grid>
      ))}
    </Grid>
  </MainCard>
</Grid>
{/* ================= STORE FEATURES ================= */}
<Grid item xs={12}>
  <MainCard
    contentSX={{ p: 3 }}
    sx={{ borderRadius: 3 }}
    title={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessIcon color="primary" />
        <Typography variant="h6">Store Features</Typography>
      </Box>
    }
  >
    <Grid container spacing={2}>
      {[
        { label: "Dining", name: "dining" },
        { label: "Take Away", name: "take_away" },
        { label: "Delivery", name: "delivery" },
        { label: "Busy", name: "busy" },
        { label: "Pure Veg", name: "pure_veg" },
        { label: "Active Status", name: "status" }
      ].map((item) => (
        <Grid item xs={12} md={3} key={item.name}>
          <FormControlLabel
            control={
              <Switch
                checked={form[item.name]}
                onChange={handleChange}
                name={item.name}
              />
            }
            label={item.label}
          />
        </Grid>
      ))}
    </Grid>
  </MainCard>
</Grid>
{/* ================= STORE IMAGES ================= */}
<Grid item xs={12}>
  <MainCard
    contentSX={{ p: 3 }}
    sx={{ borderRadius: 3 }}
    title={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ImageIcon color="primary" />
        <Typography variant="h6">Store Images</Typography>
      </Box>
    }
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          Upload Logo
          <input
            type="file"
            hidden
            name="logo"
            onChange={handleFileChange}
          />
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            name="cover_image"
            onChange={handleFileChange}
          />
        </Button>
      </Grid>
    </Grid>
  </MainCard>
</Grid>
    </MainCard>
  </Grid>


  {/* ================= STICKY ACTION BAR ================= */}
  <Grid item xs={12}>
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        background: "white",
        p: 2,
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        zIndex: 10
      }}
    >
      <Button variant="outlined">
        Cancel
      </Button>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
      >
        Update Store
      </Button>
    </Box>
  </Grid>

</Grid>
        </form>
      </MainCard>
    </Box>
  </LocalizationProvider>
);
 
}