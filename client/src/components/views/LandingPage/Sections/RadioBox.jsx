import React, { useEffect, useRef, useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

export function RadioBox({ list, handleFilters }) {
  const [Selected, setSelected] = useState([]);
  const isFirstRendered = useRef(true);

  useEffect(() => {
    if (isFirstRendered.current) {
      isFirstRendered.current = false;
    } else {
      handleFilters(Selected);
    }
  }, [Selected]);

  const onHandleRadioBox = (e) => {
    setSelected(e.target.value);
  };

  const renderRadioBoxLists = () =>
    list && (
      <Radio.Group onChange={onHandleRadioBox} value={Selected}>
        {list.map((item, index) => (
          <div
            className="radioBoxWrapper"
            key={index}
            style={{ display: "inline-block", marginRight: "10px" }}
          >
            <Radio className="radioBoxWrapper__radioBox" value={item._id}>
              {item.name}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    );

  return (
    <Collapse className="collapse" style={{ margin: "1rem auto" }}>
      <Panel header="price">{renderRadioBoxLists()}</Panel>
    </Collapse>
  );
}
