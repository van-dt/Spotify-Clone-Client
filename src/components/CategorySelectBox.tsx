import Autocomplete from "@mui/material/Autocomplete";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryData } from "../types";
import { fetchSecureApi } from "../utils";
import TextField from "@mui/material/TextField";
import { ToastContext } from "../contexts/ToastContext";

interface CategorySelectBoxProps {
  id: string;
  disabled: boolean;
  categories: CategoryData[];
  setCategories: Dispatch<SetStateAction<CategoryData[]>>;
}

const CategorySelectBox = ({
  id,
  disabled,
  categories,
  setCategories,
}: CategorySelectBoxProps) => {
  const { notify } = useContext(ToastContext);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const newCategoriesData = await fetchSecureApi<CategoryData[]>(
          "get",
          "categories"
        );

        if (newCategoriesData) setCategoriesData(newCategoriesData);
      } catch (error) {
        notify("error", "Something went wrong!");
        console.error(error);
      }
    };
    fetchCategories();
  }, [notify]);

  return (
    <Autocomplete
      disablePortal
      multiple
      id={id}
      disabled={disabled}
      value={categories}
      onChange={(event, newValue) => {
        setCategories(newValue);
      }}
      options={categoriesData}
      getOptionLabel={(option) => option.categoryName}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Song category"
          placeholder="Select categories for you song"
        />
      )}
    />
  );
};

export default CategorySelectBox;
