"use client";

import { setSearchTextAction } from "@/lib/features/posts/postSlice";
import { useDebounce } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";

const SearchBar = () => {
  const t = useTranslations("SearchBar");
  const preservedSearchText = useSelector(
    (state: RootState) => state.posts.searchText
  );
  const [searchText, setSearchText] = useState<string>(preservedSearchText);
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const dispatch = useDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    console.log("debouncedSearchText", debouncedSearchText);
    dispatch(setSearchTextAction(debouncedSearchText));
  }, [debouncedSearchText]);
  return (
    <Input
      type="text"
      className="w-[50%]"
      placeholder={t("search")}
      onChange={handleSearch}
      value={searchText}
    />
  );
};

export default SearchBar;
