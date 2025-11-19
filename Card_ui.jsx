import React from 'react';
import { Card } from 'primereact/card';

const Card_ui = ({iconBg,icon, title, value }) => {
  return (
    <div className="w-full">
      <Card className="shadow-md rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
        <div className="flex items-center gap-4 p-4">

          {/* ICON */}
          <div className={`${iconBg} text-white p-4 rounded-2xl shadow-sm`}>
            <i className={`${icon} text-3xl`}></i>
          </div>

          {/* TEXT */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">{title}</span>
            <span className="text-3xl font-bold">{value}</span>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default Card_ui;
