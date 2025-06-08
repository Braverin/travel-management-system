'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelDemo: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    // 读取 Excel 文件
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const json = XLSX.utils.sheet_to_json(ws);
            setData(json);
        };
        reader.readAsBinaryString(file);
    };

    // 导出为 Excel
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    return (
        <div>
            <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
            <button onClick={handleExport} disabled={data.length === 0}>导出 Excel</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ExcelDemo;