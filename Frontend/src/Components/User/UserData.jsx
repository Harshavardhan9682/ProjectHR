// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/store";
// import { fetchUsers } from "../../slice/userSlice";

// import {
//   Box,
//   CircularProgress,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import SearchQuestion from "../Search";

// const Users = () => {
//   const dispatch = useAppDispatch();

//   const { users, loading, error } = useAppSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!users || users.length === 0)
//     return <Typography>No users found</Typography>;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{display:"flex", alignItems:"center", gap:"10px", justifyContent:"space-around"}}>
//         <Typography variant="h5" gutterBottom>
//         Users

//       </Typography>
//       <Box>
//         <SearchQuestion />
//       </Box>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>S.No</b></TableCell>
//               <TableCell><b>Name</b></TableCell>
//               <TableCell><b>Email</b></TableCell>
//               <TableCell><b>Category</b></TableCell>
//               <TableCell><b>Attempts</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user, index) => (
//               <TableRow key={user._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.category}</TableCell>
//                 <TableCell>{user.count}</TableCell>
//                  <TableCell
//                   sx={{
//                     color: user.status === "Active" ? "green" : "red",
//                     fontWeight: "bold",
//                     display:"flex",
//                     gap:"10px"
//                   }}
//                 >
//                   {user.status}
//                     <Typography>
//                         <img
//                             src="/editIcon.png"
//                             alt="edit"
//                             width={15}
//                             height={15}

//                             style={{ cursor: "pointer" }}
//                           />
//                           <img
//                             src="/delete.png"
//                             alt="delete"
//                             width={20}
//                             height={20}

//                             style={{ cursor: "pointer" }}
//                           />
//                     </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Users;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchUsers, updateUser, deleteUser } from "../../slice/userSlice";
import Switch from "@mui/material/Switch";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchQuestion from "../Search";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* ✅ Edit → Set status to Active */
  const handleStatusSwitch = (user, checked) => {
    const newStatus=user.status==="Active" ? "Inactive" : "Active"
    dispatch(
      updateUser({
        id: user._id,
        updateData: {
          status:newStatus
        },
      })
    );
       dispatch(fetchUsers());
  };

  /* ✅ Delete user */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";

    dispatch(
      updateUser({
        id: user._id,
        updateData: { status: newStatus },
      })
    );
    dispatch(fetchUsers());
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!users || users.length === 0)
    return <Typography>No users found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h5">Users</Typography>
        <SearchQuestion />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>S.No</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Category</b>
              </TableCell>
              <TableCell>
                <b>Attempts</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>{user.count}</TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: user.status === "Active" ? "green" : "red",
                      minWidth: "70px",
                    }}
                  >
                    {user.status}
                  </Typography>

                  {/* ✅ Switch */}
                  <Switch
                    checked={user.status === "Active"}
                    onChange={(e) => handleStatusSwitch(user, e.target.checked)}
                    color="success"
                  />

                  {/* 🗑 Delete */}
                  <img
                    src="/delete.png"
                    alt="delete"
                    width={20}
                    height={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(user._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
