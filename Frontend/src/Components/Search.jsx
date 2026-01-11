
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomTextField from "../custom/customTextField";
const SearchQuestion = ({ query, setQuery, type, setType }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 ,alignItems:"center"}}>
      <CustomTextField
        label="Search"
        value={query}
        onChange={(val) => setQuery(val)}
      />

      <FormControl sx={{ minWidth: 150 }  }>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Node">Node</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchQuestion