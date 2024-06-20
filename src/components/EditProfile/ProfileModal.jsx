import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Avatar } from "@mui/material";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { baseUrl } from "../../utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  bgcolor: "#1e1e1e",
  border: "2px solid #dedce4",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  color: "#ffffff", // Enable vertical scrolling
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none", // IE and Edge
  "scrollbar-width": "none", // Firefox
};

const ProfileModal = ({ open, onClose }) => {
  const [user, setUser] = React.useState({
    userName: "",
    email: "",
    password: "",
    role: "",
    profilePicture: "",
    address: {
      area: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });

  const [selectedFile, setSelectedFile] = React.useState(null); // State to hold selected file

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log("User fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []); // Removed user dependency to prevent infinite loop

  const handleChange = (event) => {
    const { name, value, dataset } = event.target;
    if (dataset.type === "address") {
      setUser({
        ...user,
        address: {
          ...user.address,
          [name]: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    try {
      const url = await uploadToCloudinary(file, "image"); // Assuming uploadToCloudinary returns a promise with the cloudinary URL
      setUser({
        ...user,
        profilePicture: url,
      });
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User data to be updated:", user);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(`${baseUrl}/api/user`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Changed to JSON since we're sending user as JSON object
        },
      });

      console.log("User profile updated successfully:", response.data);
      setUser(response.data); // Update user state with response data
      onClose();
      fetchUser();
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleClickAvatar = () => {
    hiddenFileInput.current.click();
  };

  if (!user) {
    return null; // Handle case where user data is still loading
  }

  return (
    <Modal
      sx={{ background: "rgba(0, 0, 0, 0.5)" }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          My Profile
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, color: "white" }}
        >
          <Avatar
            src={user.profilePicture}
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={handleClickAvatar}
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <TextField
            label="Username"
            name="userName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.userName}
            onChange={handleChange}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="Role"
            name="role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.role.name}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="Area"
            name="area"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address.area}
            onChange={handleChange}
            inputProps={{ "data-type": "address" }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="City"
            name="city"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address.city}
            onChange={handleChange}
            inputProps={{ "data-type": "address" }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="District"
            name="district"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address.district}
            onChange={handleChange}
            inputProps={{ "data-type": "address" }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="State"
            name="state"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address.state}
            onChange={handleChange}
            inputProps={{ "data-type": "address" }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <TextField
            label="Pin Code"
            name="pinCode"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address.pinCode}
            onChange={handleChange}
            inputProps={{ "data-type": "address" }}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
