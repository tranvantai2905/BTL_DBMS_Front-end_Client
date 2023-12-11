import { getUserById } from "@/pages/api";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ReloadContext from "@/contexts/ReloadContext";

const Sidebar: React.FC = () => {
  const { reload, setReload } = useContext(ReloadContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [localReload, setLocalReload] = useState(false);
  const fetchData = async () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const dataUser = await getUserById(user.user.userId);
      console.log({ dataUser });

      if (dataUser) {
        if (dataUser.data.data.user.name) {
          setName(dataUser.data.data.user.name);
        }
        if (dataUser.data.data.user.avatar) {
          setAvatar(dataUser.data.data.user.avatar);
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload]);
  return (
    <Box sx={{ width: { xs: "100%", md: "25%" } }}>
      <Stack width="100%" height="100%">
        <Stack
          justifyContent="center"
          alignItems="center"
          border="1px solid #444"
          p="20px 10px"
          borderRadius="10px"
          // height=""
        >
          <img
            style={{ borderRadius: "50%" }}
            width="200px"
            height="200px"
            src={avatar ? avatar : "https://lep.vn/icons/ic-account.svg"}
          />
          <Typography mt="20px">{name}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
