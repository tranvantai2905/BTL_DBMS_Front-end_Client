import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useRef, useState } from "react";
const UserInfo = ({
  address,
  setAddress,
  phone,
  setPhone,
  payment,
  setPayment,
  note,
  setNote,
}: {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  payment: string;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Box border={"1px solid black"} width={"100%"}>
      <Box>
        <Stack direction={{ xs: "column", md: "row" }}>
          <Stack
            width={{ xs: "100%", md: "50%" }}
            padding={{ xs: "20px 15px", md: "50px 20px" }}
            alignItems={"flex-start"}
            border={"1px solid black"}
            gap="20px"
          >
            <Stack direction={"row"} gap="20px">
              <ContactMailIcon fontSize="large" />
              <Typography
                fontWeight={400}
                fontSize={{ xs: "1rem", md: "1.25rem" }}
                lineHeight={{ xs: "1.5rem", md: "2rem" }}
                color="#444"
                textTransform={"uppercase"}
              >
                Địa chỉ
              </Typography>
            </Stack>
            <TextField
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#bdbdbd", // màu border mặc định
                  },
                  "&:hover fieldset": {
                    borderColor: "#ad2526", // màu border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ad2526", // màu border khi focus
                  },
                },
                "& label": {
                  color: "#bdbdbd", // màu label mặc định
                },
                "& label.Mui-focused": {
                  color: "#ad2526", // màu label khi focus
                },
              }}
            />
          </Stack>
          <Stack
            width={{ xs: "100%", md: "50%" }}
            padding={{ xs: "20px 15px", md: "50px 20px" }}
            alignItems={"flex-start"}
            border={"1px solid black"}
            gap="20px"
          >
            <Stack direction={"row"} gap="20px">
              <ContactMailIcon fontSize="large" />
              <Typography
                fontWeight={400}
                fontSize={{ xs: "1rem", md: "1.25rem" }}
                lineHeight={{ xs: "1.5rem", md: "2rem" }}
                color="#444"
                textTransform={"uppercase"}
              >
                số điện thoại
              </Typography>
            </Stack>
            <TextField
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#bdbdbd", // màu border mặc định
                  },
                  "&:hover fieldset": {
                    borderColor: "#ad2526", // màu border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ad2526", // màu border khi focus
                  },
                },
                "& label": {
                  color: "#bdbdbd", // màu label mặc định
                },
                "& label.Mui-focused": {
                  color: "#ad2526", // màu label khi focus
                },
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Stack
          direction={"column"}
          padding={{ xs: "20px 15px", md: "50px 20px" }}
          alignItems={"flex-start"}
          gap="20px"
          border={"1px solid black"}
        >
          <Stack gap="20px" direction={"row"}>
            <CarCrashIcon fontSize="large" />
            <Typography
              textTransform={"uppercase"}
              fontWeight={400}
              fontSize={{ xs: "1rem", md: "1.5rem" }}
              lineHeight={{ xs: "1.5rem", md: "2rem" }}
              color="#444"
            >
              Phương thức thanh toán
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={5}>
            <Button
              onClick={() => setPayment("Cash")}
              variant="outlined"
              sx={{
                paddingBlock: { xs: 0, md: 2 },
                paddingInline: { xs: 1, md: 5 },
                border: "1px solid #ad2526",
                color: payment !== "Cash" ? "#ad2526" : "white",
                backgroundColor: payment === "Cash" ? "#ad2526" : "white",
                "&:hover": {
                  color: "#ad2526",
                  border: "1px solid #ad2526",
                  opacity: 0.9,
                },
              }}
            >
              Tiền mặt
            </Button>
            <Button
              onClick={() => setPayment("Momo Pay")}
              variant="outlined"
              disabled={true}
              sx={{
                paddingBlock: 2,
                paddingInline: 5,
                opacity: 0.8,
                border: "1px solid #ad2526",
                color: payment !== "Momo Pay" ? "#ad2526" : "white",
                backgroundColor: payment === "Momo Pay" ? "#ad2526" : "white",
                "&:hover": {
                  color: "#ad2526",
                  border: "1px solid #ad2526",
                },
              }}
            >
              MOMO
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Stack
          direction={"column"}
          padding={{ xs: "20px 15px", md: "50px 20px" }}
          alignItems={"flex-start"}
          gap="20px"
          border={"1px solid black"}
        >
          <Stack direction={"row"} gap="20px">
            <MessageOutlinedIcon fontSize="large" />
            <Typography
              textTransform={"uppercase"}
              fontWeight={400}
              fontSize={{ xs: "1rem", md: "1.5rem" }}
              lineHeight={{ xs: "1.5rem", md: "2rem" }}
              color="#444"
            >
              Lời nhắn cho người bán
            </Typography>
          </Stack>
          <TextareaAutosize
            value={note}
            onChange={(event: any) => {
              setNote(event.target.value);
            }}
            aria-label="minimum height"
            minRows={3}
            placeholder="Lời nhắn cho người bán"
            style={{
              width: "90%",
              padding: "16px 24px",
              fontWeight: "300",
              display: "block",
              border: "0.0005px solid #444",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default UserInfo;
