


// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/store";
// import {
//   fetchUsers,
//   deleteUser,
//   assignExam,
//   updateUser,
// } from "../../slice/userSlice";
// import { fetchExamQuestions } from "../../slice/examQuestionsSlice";

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
//   Button,
//   Checkbox,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import Switch from "@mui/material/Switch";
// import SearchQuestion from "../Search";

// const Users = () => {
//   const dispatch = useAppDispatch();

//   /* REDUX STATE */
//   const { users, loading, error } = useAppSelector((state) => state.user);
//   const { data } = useAppSelector((state) => state.examQuestions);

//   /* LOCAL STATE */
//   const [query, setQuery] = useState("");
//   const [category, setType] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedUserIds, setSelectedUserIds] = useState([]);
//   const [selectedExamId, setSelectedExamId] = useState("");

//   /* FETCH USERS */
//   useEffect(() => {
//     dispatch(fetchUsers({ query, category }));
//   }, [query, category, dispatch]);

//   /* FETCH EXAMS */
//   useEffect(() => {
//     dispatch(fetchExamQuestions());
//   }, [dispatch]);

//   /* TOGGLE USER STATUS */
//   const handleStatusSwitch = (user) => {
//     dispatch(
//       updateUser({
//         id: user._id,
//         updateData: {
//           status: user.status === "Active" ? "Inactive" : "Active",
//         },
//       })
//     );
//   };

//   /* DELETE USER */
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(id));
//     }
//   };

//   /* BULK ASSIGN EXAM */
//   const handleAssignExam = () => {
//     if (!selectedUserIds.length || !selectedExamId) return;

//     dispatch(
//       assignExam({
//         userIds: selectedUserIds,
//         examId: selectedExamId,
//       })
//     );

//     setIsEditMode(false);
//     setSelectedUserIds([]);
//     setSelectedExamId("");
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!users || users.length === 0)
//     return <Typography>No users found</Typography>;

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* HEADER */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 2,
//         }}
//       >
//         <Button
//           onClick={() => {
//             setIsEditMode((prev) => !prev);
//             setSelectedUserIds([]);
//             setSelectedExamId("");
//           }}
//         >
//           <img src="/editIcon.png" width="30px" />
//         </Button>

//         <Typography variant="h5">Users</Typography>

//         <SearchQuestion
//           query={query}
//           setQuery={setQuery}
//           type={category}
//           setType={setType}
//         />
//       </Box>

//       {/* EXAM DROPDOWN + UPDATE BUTTON */}
//       {isEditMode && (
//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <Select
//             value={selectedExamId}
//             onChange={(e) => setSelectedExamId(e.target.value)}
//             displayEmpty
//             disabled={!selectedUserIds.length}
//             sx={{ minWidth: 220 }}
//           >
//             <MenuItem value="">
//               <em>Select Exam</em>
//             </MenuItem>

//             {data.map((exam) => (
//               <MenuItem key={exam._id} value={exam._id}>
//                 {exam.title}
//               </MenuItem>
//             ))}
//           </Select>

//           <Button
//             variant="contained"
//             disabled={!selectedUserIds.length || !selectedExamId}
//             onClick={handleAssignExam}
//           >
//             Update Exam
//           </Button>
//         </Box>
//       )}

//       {/* USERS TABLE */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {isEditMode && <TableCell><b>Select</b></TableCell>}
//               <TableCell><b>S.No</b></TableCell>
//               <TableCell><b>Name</b></TableCell>
//               <TableCell><b>Email</b></TableCell>
//               <TableCell><b>Category</b></TableCell>
//               <TableCell><b>Attempts</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//               <TableCell><b>Action</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user, index) => (
//               <TableRow key={user._id}>
//                 {isEditMode && (
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedUserIds.includes(user._id)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedUserIds([
//                             ...selectedUserIds,
//                             user._id,
//                           ]);
//                         } else {
//                           setSelectedUserIds(
//                             selectedUserIds.filter(
//                               (id) => id !== user._id
//                             )
//                           );
//                         }
//                       }}
//                     />
//                   </TableCell>
//                 )}

//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.category}</TableCell>
//                 <TableCell>{user.count}</TableCell>

//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     color: user.status === "Active" ? "green" : "red",
//                   }}
//                 >
//                   {user.status}
//                 </TableCell>

//                 <TableCell>
//                   <Switch
//                     checked={user.status === "Active"}
//                     onChange={() => handleStatusSwitch(user)}
//                   />

//                   <img
//                     src="/delete.png"
//                     alt="delete"
//                     width={20}
//                     height={20}
//                     style={{ cursor: "pointer", marginLeft: 10 }}
//                     onClick={() => handleDelete(user._id)}
//                   />
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

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchUsers,
  deleteUser,
  assignExam,
  updateUser,
} from "../../slice/userSlice";
import { fetchExamQuestions } from "../../slice/examQuestionsSlice";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import SearchQuestion from "../Search";
import TableSkeleton from "./TableComponent";

const Users = () => {
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector((state) => state.user);
  const { data } = useAppSelector((state) => state.examQuestions);
const [loading1, setloading] =useState(true)
  const [query, setQuery] = useState("");
  const [category, setType] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ query, category }));
    setTimeout(()=>{
      setloading(false)
    },1000)
  }, [query, category, dispatch]);

  useEffect(() => {
    dispatch(fetchExamQuestions());
    
  }, [dispatch]);

  const handleStatusSwitch = (user) => {
    dispatch(
      updateUser({
        id: user._id,
        updateData: {
          status: user.status === "Active" ? "Inactive" : "Active",
        },
      })
    );
  };
if(users.length <= 0){
  setTimeout(()=>{
      setloading(false)
    },1000)
}
  
    

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleAssignExam = () => {
    if (!selectedUserIds.length || !selectedExamId) return;

    dispatch(assignExam({ userIds: selectedUserIds, examId: selectedExamId }));

    setIsEditMode(false);
    setSelectedUserIds([]);
    setSelectedExamId("");
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Button
          onClick={() => {
            setIsEditMode((prev) => !prev);
            setSelectedUserIds([]);
            setSelectedExamId("");
          }}
        >
          <img src="/editIcon.png" width="30px" alt="edit" />
        </Button>

        <Typography variant="h5">Users</Typography>

        <SearchQuestion
          query={query}
          setQuery={setQuery}
          type={category}
          setType={setType}
        />
      </Box>

      {/* EXAM ASSIGN */}
      {isEditMode && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            displayEmpty
            disabled={!selectedUserIds.length}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">
              <em>Select Exam</em>
            </MenuItem>

            {data.map((exam) => (
              <MenuItem key={exam._id} value={exam._id}>
                {exam.title}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            disabled={!selectedUserIds.length || !selectedExamId}
            onClick={handleAssignExam}
          >
            Update Exam
          </Button>
        </Box>
      )}

      {/* USERS TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {isEditMode && <TableCell><b>Select</b></TableCell>}
              <TableCell><b>S.No</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Attempts</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading1 ? (
              <TableSkeleton
                rows={6}
                columns={7}
                isEditMode={isEditMode}
              />
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="center">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user._id}>
                  {isEditMode && (
                    <TableCell>
                      <Checkbox
                        checked={selectedUserIds.includes(user._id)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelectedUserIds([...selectedUserIds, user._id])
                            : setSelectedUserIds(
                                selectedUserIds.filter((id) => id !== user._id)
                              )
                        }
                      />
                    </TableCell>
                  )}

                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.category}</TableCell>
                  <TableCell>{user.count}</TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: user.status === "Active" ? "green" : "red",
                    }}
                  >
                    {user.status}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={user.status === "Active"}
                      onChange={() => handleStatusSwitch(user)}
                    />
                    <img
                      src="/delete.png"
                      alt="delete"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer", marginLeft: 10 }}
                      onClick={() => handleDelete(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
 

