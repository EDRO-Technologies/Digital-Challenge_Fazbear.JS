"use client"; // If used in Pages Router, is no need to add "use client"

import React from "react";
import { App, Button } from "antd";

const Home: React.FC = () => {
  const { message } = App.useApp();

  return (
    <div className="flex flex-row items-center justify-center h-full w-full bg-white rounded-lg">
      <div>
        <Button onClick={() => message.success("Балдеж!")} type="primary">
          СИНИЙ БОТТОН??? 
        </Button>
      </div>
    </div>
  );
};

export default Home;
