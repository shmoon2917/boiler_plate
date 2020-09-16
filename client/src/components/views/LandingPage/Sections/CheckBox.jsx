import React, { useEffect, useRef, useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  const [Checked, setChecked] = useState([]);
  const isFirstRendered = useRef(true);

  useEffect(() => {
    if (isFirstRendered.current) {
      isFirstRendered.current = false;
    } else {
      handleFilters(Checked);
    }
  }, [Checked]);

  const onHandleCheckBox = (value) => () => {
    const currentIndex = Checked.indexOf(value);

    if (currentIndex === -1) {
      setChecked((prevState) => [...prevState, value]);
    } else {
      setChecked((prevState) =>
        prevState.filter((item, index) => index !== currentIndex)
      );
    }
  };

  const renderCheckboxLists = () =>
    list &&
    list.map((item, index) => (
      <div
        className="checkboxWrapper"
        key={index}
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <Checkbox
          className="checkboxWrapper__checkbox"
          key={index}
          onChange={onHandleCheckBox(item._id)}
          checked={Checked.indexOf(item._id) === -1 ? false : true}
        >
          {item.name}
        </Checkbox>
      </div>
    ));

  return (
    <Collapse className="collapse" style={{ margin: "2rem auto" }}>
      <Panel header="continents">{renderCheckboxLists()}</Panel>
    </Collapse>
  );
}

export default CheckBox;
