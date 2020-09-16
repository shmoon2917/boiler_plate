import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

export function SearchFeature({ handleSearchFilter }) {
  const [SearchTerm, setSearchTerm] = useState("");

  const onSearchHandler = (event) => {
    setSearchTerm(event.currentTarget.value);
    handleSearchFilter(event.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="search Text"
        onChange={onSearchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}
