import {
  Box,
  Typography,
  Collapse,
  ListItemButton,
  ListItemText,
  List,
  ListItemIcon,
  ListItem,
  IconButton,
  Stack,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import StarBorder from "@mui/icons-material/StarBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import { CategoryTyp } from "@/pages/best-seller";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#ad2526",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

interface CategoryProps {
  title: string;
  queryName: string;
  itemList: CategoryTyp[];
}

const Category = ({
  title,
  queryName,
  itemList,
}: CategoryProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };

  const navigateSearch = (newChecked: Array<number>) => {
    if (newChecked.length != 0) {
      const arrStr = newChecked.map((num) => num.toString()).join(",");
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [queryName]: arrStr,
        },
      });
    } else {
      let page = router.query[queryName];
      delete router.query[queryName];
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
        },
      });
    }
  };
  const [checked, setChecked] = useState([-1]);
  const handleToggle = (value: number) => () => {
    let currentIndex;
    if (checked.length !== 0) currentIndex = checked.indexOf(value);
    else currentIndex = -1;
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const newArr = newChecked.filter((value) => {
      return value !== -1;
    });
    setChecked(newArr);
    navigateSearch(newArr);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        pl={{ xs: "10px", md: "0.125rem" }}
        pb="15px"
        mt="15px"
        borderBottom="1px solid #d9d9d9"
      >
        <ListItemButton
          disableTouchRipple={false}
          disableRipple={false}
          onClick={handleClick}
          sx={{
            marginLeft: "-20px",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "18px",
            }}
          >
            {open ? (
              <RemoveIcon fontSize="small" className={styles.rmvIcon} />
            ) : (
              <AddOutlinedIcon fontSize="small" className={styles.addIcon} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              fontSize: { xs: "15px", sm: "12px", md: "15px" },
              lineHeight: "22px",
              fontWeight: "400",
            }}
          />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Stack
            sx={{ flexDirection: { xs: "row", md: "column" } }}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            {itemList !== null &&
              itemList?.map((category) => {
                const labelId = `checkbox-list-${title}-${category.categoryId}`;
                return (
                  <ListItem key={parseInt(category.categoryId)} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(parseInt(category.categoryId))}
                      sx={{
                        paddingBlock: "0",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          height: "16px",
                          minWidth: { xs: "5px", sm: "20px" },
                        }}
                      >
                        <Checkbox
                          size="small"
                          edge="start"
                          checked={
                            checked.indexOf(parseInt(category.categoryId)) !==
                            -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <Tooltip
                        disableFocusListener
                        disableTouchListener
                        title={category.description}
                        placement="bottom"
                      >
                        <ListItemText
                          id={labelId}
                          primary={`${category.name}`}
                          primaryTypographyProps={{
                            fontSize: "14px",
                            fontWeight: 100,
                            lineHeight: "20px",
                            marginLeft: "8px",
                            maxWidth: "260px",
                            // color: "rgb(68,68,68)",
                            color: "rgb(68,68,68)",
                            textTransform: "capitalize",
                          }}
                        />
                      </Tooltip>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </Stack>
        </Collapse>

        {/* <Box display="flex" alignItems="center" gap={0.5}>
        <AddOutlinedIcon fontSize="small" />
        <Typography
          variant="h4"
          fontSize="15px"
          lineHeight="22px"
          fontWeight="400"
        >
          {title}
        </Typography>
      </Box> */}
      </Box>
    </ThemeProvider>
  );
};

export default Category;
