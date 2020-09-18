// import css
import "./Sections/NavBar.css";

// import lib and utils
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button } from "antd";
import { AlignRightOutlined, HomeFilled } from "@ant-design/icons";
import { history } from "../../../_helpers/history";

// import components
import { LeftMenu } from "./Sections/LeftMenu";
import { RightMenu } from "./Sections/RightMenu";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("");
  const unListenHistory = useRef();

  useEffect(() => {
    unListenHistory.current = history.listen((location) => {
      if (location.pathname === "/") {
        setCurrent("");
      }
    });
    return () => {
      unListenHistory.current();
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangeCurrentTab = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <nav className="menu">
        <div className="menu__logo">
          <a href="/">
            <HomeFilled />
            <span>Home</span>
          </a>
        </div>
        <div className="menu__container">
          <div className="menu__left">
            <LeftMenu
              mode="horizontal"
              current={current}
              onChange={onChangeCurrentTab}
            />
          </div>
          <div className="menu__right">
            <RightMenu
              mode="horizontal"
              current={current}
              onChange={onChangeCurrentTab}
            />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <AlignRightOutlined />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu__drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          ></Drawer>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
