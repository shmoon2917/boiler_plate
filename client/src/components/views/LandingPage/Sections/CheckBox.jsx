import React, { useEffect, useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  const [Checked, setChecked] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    handleFilters(Checked);
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
      <React.Fragment key={index}>
        <Checkbox
          key={index}
          onChange={onHandleCheckBox(item._id)}
          checked={Checked.indexOf(item._id) === -1 ? false : true}
        />
        <span>{item.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
