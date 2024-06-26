"use client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Input from "../../../components/Input";

interface SearchPlaylistInputProps {
  id: string;
}

const SearchPlaylistInput = ({ id }: SearchPlaylistInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: `/playlist/${id}`,
      query: query,
    });

    router.push(url);
  }, [debouncedValue, id, router]);

  return (
    <Input
      placeholder="Search for songs of this playlist"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchPlaylistInput;
