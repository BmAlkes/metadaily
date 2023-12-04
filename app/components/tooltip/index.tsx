import React, { ReactComponentElement, ReactNode, useState } from "react";

const ToolTip = ({ text, children }: { text: string; children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="flex items-center relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="bg-green-500 text-neutral-900 p-1 rounded-lg absolute top-[-10px] right-[-40px] font-sans">
          {text}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
