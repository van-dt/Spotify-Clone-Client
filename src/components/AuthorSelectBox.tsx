"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthorData } from "../types";
import { fetchSecureApi } from "../utils";
import { ToastContext } from "../contexts/ToastContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

interface AuthorSelectBoxProps {
  id: string;
  disabled: boolean;
  register: UseFormRegisterReturn<"author">;
  authorData: AuthorData | null;
  setAuthorData: Dispatch<SetStateAction<AuthorData | null>>;
}

const AuthorSelectBox = ({
  id,
  disabled,
  register,
  authorData,
  setAuthorData,
}: AuthorSelectBoxProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly AuthorData[]>([]);
  const loading = open && options.length === 0;
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const newAuthorData = await fetchSecureApi<AuthorData[]>(
          "get",
          `author`
        );
        if (active && newAuthorData) {
          setOptions(newAuthorData);
        }
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, notify]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      className="w-full text-white"
      disabled={disabled}
      value={authorData}
      onChange={(event, value) => {
        setAuthorData(value);
      }}
      disablePortal
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.authorName}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          <Image
            loading="lazy"
            width={20}
            height={20}
            src={option.image ? `${apiUrl}${option.image}` : "/images/user.png"}
            alt="Author image"
          />
          {option.authorName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Song author"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...register}
        />
      )}
    />
  );
};

export default AuthorSelectBox;
