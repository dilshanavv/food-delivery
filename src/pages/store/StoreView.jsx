
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Divider
// } from "@mui/material";

// export default function StoreView() {
//   const { id } = useParams();

//   const [store, setStore] = useState(null);
//   const [storeTypes, setStoreTypes] = useState([]);
//   const [branchGroups, setBranchGroups] = useState([]);

//   useEffect(() => {
//     fetchStore();
//     fetchStoreTypes();
//     fetchBranchGroups();
//   }, [id]);

//   const fetchStore = async () => {
//     const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
//     setStore(res.data.data || res.data);
//   };

//  const fetchStoreTypes = async () => {
//   const res = await axios.get("http://localhost:5000/api/store-types");
//   setStoreTypes(res.data); 
// };

// const fetchBranchGroups = async () => {
//   const res = await axios.get("http://localhost:5000/api/branch-groups");
//   setBranchGroups(res.data); 
// };

//   if (!store) return <div>Loading...</div>;
//   console.log("STORE OBJECT:", store);
// console.log("STORE TYPE ID:", store.store_type_id);
// console.log("BRANCH GROUP ID:", store.branch_group_id);
// console.log("STORE TYPES ARRAY:", storeTypes);
// console.log("BRANCH GROUPS ARRAY:", branchGroups);

//   const yesNo = (val) => (val ? "Yes" : "No");

// const getStoreTypeName = (id) => {
//   if (!id || !storeTypes?.length) return "";

//   const match = storeTypes.find(
//     (t) =>
//       (t.store_type_id || t.id)?.toLowerCase() === id?.toLowerCase()
//   );

//   return match?.type_name || "";
// };

// const getBranchGroupName = (id) => {
//   if (!id || !branchGroups?.length) return "";

//   const match = branchGroups.find(
//     (g) =>
//       (g.branch_group_id || g.id)?.toLowerCase() === id?.toLowerCase()
//   );

//   return match?.franchise_name || "";
// };

//   const Field = ({ label, value }) => {
//     if (!value && value !== 0) return null;
//     return (
//       <Typography>
//         <strong>{label}:</strong> {value}
//       </Typography>
//     );
//   };

//   const Section = ({ title, condition, children }) => {
//     if (!condition) return null;
//     return (
//       <>
//         <Typography variant="h6" sx={{ mt: 4 }}>
//           {title}
//         </Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Grid container spacing={2}>
//           {children}
//         </Grid>
//       </>
//     );
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Store Details
//         </Typography>

//         {/* ================= BASIC INFORMATION ================= */}
//         <Section
//           title="Basic Information"
//           condition={
//             store.store_code ||
//             store.title_en ||
//             store.title_ar ||
//             store.store_type_id ||
//             store.branch_group_id
//           }
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             <Field label="Store Code" value={store.store_code} />
//             <Field label="Title English" value={store.title_en} />
//             <Field label="Title Arabic" value={store.title_ar} />
//             <Field
//               label="Store Type"
//               value={getStoreTypeName(store.store_type_id)}
//             />
//             <Field
//               label="Branch Group"
//               value={getBranchGroupName(store.branch_group_id)}
//             />
//           </Grid>
//         </Section>

//         {/* ================= CONTACT INFORMATION ================= */}
//         <Section
//           title="Contact Information"
//           condition={store.primary_contact || store.secondary_contact}
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             <Field label="Primary Contact" value={store.primary_contact} />
//             <Field label="Secondary Contact" value={store.secondary_contact} />
//           </Grid>
//         </Section>

//         {/* ================= LOCATION INFORMATION ================= */}
//         <Section
//           title="Location Information"
//           condition={
//             store.latitude ||
//             store.longitude ||
//             store.address_en ||
//             store.address_ar
//           }
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             <Field label="Latitude" value={store.latitude} />
//             <Field label="Longitude" value={store.longitude} />
//             <Field label="Address English" value={store.address_en} />
//             <Field label="Address Arabic" value={store.address_ar} />
//           </Grid>
//         </Section>

//         {/* ================= STORE TIMING ================= */}
//         <Section
//           title="Store Timing"
//           condition={store.from_time || store.to_time}
//         >
//         <Grid size={{ xs: 12, md: 6 }}>
//             <Field label="Opening Time" value={store.from_time} />
//             <Field label="Closing Time" value={store.to_time} />
//           </Grid>
//         </Section>

//         {/* ================= DELIVERY SETTINGS ================= */}
//         <Section
//           title="Delivery Settings"
//           condition={
//             store.minimum_purchase ||
//             store.commission_rate ||
//             store.delivery_charge ||
//             store.delivery_range
//           }
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             <Field label="Minimum Purchase" value={store.minimum_purchase} />
//             <Field
//               label="Commission Rate"
//               value={
//                 store.commission_rate
//                   ? store.commission_rate + "%"
//                   : null
//               }
//             />
//             <Field label="Delivery Charge" value={store.delivery_charge} />
//             <Field label="Delivery Range (KM)" value={store.delivery_range} />
//           </Grid>
//         </Section>

//         {/* ================= PAYMENT METHODS ================= */}
//         <Section
//           title="Payment Methods"
//           condition={
//             store.cod_pay ||
//             store.online_pay ||
//             store.wallet_pay ||
//             store.card_pay
//           }
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             {store.cod_pay && <Field label="COD" value="Yes" />}
//             {store.online_pay && <Field label="Online Pay" value="Yes" />}
//             {store.wallet_pay && <Field label="Wallet Pay" value="Yes" />}
//             {store.card_pay && <Field label="Card Pay" value="Yes" />}
//           </Grid>
//         </Section>

//         {/* ================= STORE FEATURES ================= */}
//         <Section
//           title="Store Features"
//           condition={
//             store.dining ||
//             store.take_away ||
//             store.delivery ||
//             store.busy ||
//             store.pure_veg ||
//             store.status
//           }
//         >
//          <Grid size={{ xs: 12, md: 6 }}>
//             {store.dining && <Field label="Dining" value="Yes" />}
//             {store.take_away && <Field label="Take Away" value="Yes" />}
//             {store.delivery && <Field label="Delivery" value="Yes" />}
//             {store.busy && <Field label="Busy" value="Yes" />}
//             {store.pure_veg && <Field label="Pure Veg" value="Yes" />}
//             {store.status && <Field label="Active Status" value="Active" />}
//           </Grid>
//         </Section>

//       </Paper>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider
} from "@mui/material";

export default function StoreView() {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [storeTypes, setStoreTypes] = useState([]);
  const [branchGroups, setBranchGroups] = useState([]);

  useEffect(() => {
    fetchStore();
    fetchStoreTypes();
    fetchBranchGroups();
  }, [id]);

  const fetchStore = async () => {
    const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
    setStore(res.data.data || res.data);
  };

  const fetchStoreTypes = async () => {
    const res = await axios.get("http://localhost:5000/api/store-types");
    setStoreTypes(res.data);
  };

  const fetchBranchGroups = async () => {
    const res = await axios.get("http://localhost:5000/api/branch-groups");
    setBranchGroups(res.data);
  };

  if (!store) return <div>Loading...</div>;
  console.log("Logo:", store.logo);
console.log("Cover:", store.cover_image);

  const getStoreTypeName = (id) => {
    if (!id || !storeTypes?.length) return "";
    const match = storeTypes.find(
      (t) => (t.store_type_id || t.id) == id
    );
    return match?.type_name || "";
  };

  const getBranchGroupName = (id) => {
    if (!id || !branchGroups?.length) return "";
    const match = branchGroups.find(
      (g) => (g.branch_group_id || g.id) == id
    );
    return match?.franchise_name || "";
  };

  const Field = ({ label, value }) => {
    if (!value && value !== 0) return null;
    return (
      <Typography>
        <strong>{label}:</strong> {value}
      </Typography>
    );
  };

  const Section = ({ title, condition, children }) => {
    if (!condition) return null;
    return (
      <>
        <Typography variant="h6" sx={{ mt: 4 }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {children}
        </Grid>
      </>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Store Details
        </Typography>

        {/* ================= STORE IMAGES ================= */}
        <Section
          title="Store Images"
          condition={store.logo || store.cover_image}
        >
          <Grid item xs={12} md={6}>
            {store.logo && (
              <Box>
                <Typography variant="subtitle1">Logo</Typography>
                <img
                  src={`http://localhost:5000/uploads/${store.logo}`}
                  alt="Logo"
                  style={{ marginTop: 10, maxHeight: 120 }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {store.cover_image && (
              <Box>
                <Typography variant="subtitle1">Cover Image</Typography>
                <img
                  src={`http://localhost:5000/uploads/${store.cover_image}`}
                  alt="Cover"
                  style={{ marginTop: 10, maxHeight: 180 }}
                />
              </Box>
            )}
          </Grid>
        </Section>

        {/* ================= BASIC INFORMATION ================= */}
        <Section
          title="Basic Information"
          condition={
            store.store_code ||
            store.title_en ||
            store.title_ar ||
            store.store_type_id ||
            store.branch_group_id
          }
        >
          <Grid item xs={12} md={6}>
            <Field label="Store Code" value={store.store_code} />
            <Field label="Title English" value={store.title_en} />
            <Field label="Title Arabic" value={store.title_ar} />
            <Field
              label="Store Type"
              value={getStoreTypeName(store.store_type_id)}
            />
            <Field
              label="Branch Group"
              value={getBranchGroupName(store.branch_group_id)}
            />
          </Grid>
        </Section>

        {/* ================= CONTACT INFORMATION ================= */}
        <Section
          title="Contact Information"
          condition={store.primary_contact || store.secondary_contact}
        >
          <Grid item xs={12} md={6}>
            <Field label="Primary Contact" value={store.primary_contact} />
            <Field label="Secondary Contact" value={store.secondary_contact} />
          </Grid>
        </Section>

        {/* ================= LOCATION INFORMATION ================= */}
        <Section
          title="Location Information"
          condition={
            store.latitude ||
            store.longitude ||
            store.address_en ||
            store.address_ar
          }
        >
          <Grid item xs={12} md={6}>
            <Field label="Latitude" value={store.latitude} />
            <Field label="Longitude" value={store.longitude} />
            <Field label="Address English" value={store.address_en} />
            <Field label="Address Arabic" value={store.address_ar} />
          </Grid>
        </Section>

        {/* ================= STORE TIMING ================= */}
        <Section
          title="Store Timing"
          condition={store.from_time || store.to_time}
        >
          <Grid item xs={12} md={6}>
            <Field label="Opening Time" value={store.from_time} />
            <Field label="Closing Time" value={store.to_time} />
          </Grid>
        </Section>

        {/* ================= DELIVERY SETTINGS ================= */}
        <Section
          title="Delivery Settings"
          condition={
            store.minimum_purchase ||
            store.commission_rate ||
            store.delivery_charge ||
            store.delivery_range
          }
        >
          <Grid item xs={12} md={6}>
            <Field label="Minimum Purchase" value={store.minimum_purchase} />
            <Field
              label="Commission Rate"
              value={
                store.commission_rate
                  ? store.commission_rate + "%"
                  : null
              }
            />
            <Field label="Delivery Charge" value={store.delivery_charge} />
            <Field label="Delivery Range (KM)" value={store.delivery_range} />
          </Grid>
        </Section>

        {/* ================= PAYMENT METHODS ================= */}
        <Section
          title="Payment Methods"
          condition={
            store.cod_pay ||
            store.online_pay ||
            store.wallet_pay ||
            store.card_pay
          }
        >
          <Grid item xs={12} md={6}>
            {store.cod_pay && <Field label="COD" value="Yes" />}
            {store.online_pay && <Field label="Online Pay" value="Yes" />}
            {store.wallet_pay && <Field label="Wallet Pay" value="Yes" />}
            {store.card_pay && <Field label="Card Pay" value="Yes" />}
          </Grid>
        </Section>

        {/* ================= STORE FEATURES ================= */}
        <Section
          title="Store Features"
          condition={
            store.dining ||
            store.take_away ||
            store.delivery ||
            store.busy ||
            store.pure_veg ||
            store.status
          }
        >
          <Grid item xs={12} md={6}>
            {store.dining && <Field label="Dining" value="Yes" />}
            {store.take_away && <Field label="Take Away" value="Yes" />}
            {store.delivery && <Field label="Delivery" value="Yes" />}
            {store.busy && <Field label="Busy" value="Yes" />}
            {store.pure_veg && <Field label="Pure Veg" value="Yes" />}
            {store.status && <Field label="Active Status" value="Active" />}
          </Grid>
        </Section>

      </Paper>
    </Box>
  );
}