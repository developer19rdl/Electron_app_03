// import React from "react";
// import ReactECharts from "echarts-for-react";

// const AnalyticsBoxPlot = ({ graph }) => {
//     const option = {
//         tooltip: {
//             trigger: "item",
//             axisPointer: { type: "shadow" }
//         },
//         grid: {
//             top: 5,           // 🔥 removes top gap
//             left: "10%",
//             right: "10%",
//             bottom: "15%"
//         },
//         xAxis: {
//             type: "category",
//             data: graph.data.map(b => b.label),
//             axisLabel: { rotate: 20 }
//         },
//         yAxis: {
//             type: "value",
//             name: graph.unit || ""
//         },
//         series: [
//             {
//                 name: "Box Plot",
//                 type: "boxplot",
//                 data: graph.data.map(b => [
//                     b.min,
//                     b.q1,
//                     b.median,
//                     b.q3,
//                     b.max
//                 ]),
//                 itemStyle: {
//                     borderWidth: 2
//                 }
//             }
//         ]
//     };

//     return <ReactECharts option={option} style={{ height: 250, }} />;
// };

// export default AnalyticsBoxPlot;

////////New////.
// import React from "react";
// import ReactECharts from "echarts-for-react";

// const AnalyticsBoxPlot = ({ graph, isDarkMode }) => {

//     // 🎨 Generate Random Color
//     const generateRandomColor = () => {
//         const hue = Math.floor(Math.random() * 360);
//         const lightness = isDarkMode ? 70 : 40;
//         return `hsl(${hue}, 70%, ${lightness}%)`;
//     };

//     const boxColor = generateRandomColor();

//     const option = {
//         tooltip: {
//             trigger: "item",
//             axisPointer: { type: "shadow" }
//         },
//         grid: {
//             top: 5,
//             left: "10%",
//             right: "10%",
//             bottom: "15%"
//         },
//         xAxis: {
//             type: "category",
//             data: graph.data.map(b => b.label),
//             axisLabel: {
//                 rotate: 20,
//                 color: isDarkMode ? "#ffffff" : "#000000"
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: isDarkMode ? "#ffffff" : "#000000"
//                 }
//             }
//         },
//         yAxis: {
//             type: "value",
//             name: graph.unit || "",
//             axisLabel: {
//                 color: isDarkMode ? "#ffffff" : "#000000"
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: isDarkMode ? "#ffffff" : "#000000"
//                 }
//             }
//         },
//         series: [
//             {
//                 name: "Box Plot",
//                 type: "boxplot",
//                 data: graph.data.map(b => [
//                     b.min,
//                     b.q1,
//                     b.median,
//                     b.q3,
//                     b.max
//                 ]),
//                 itemStyle: {
//                     color: boxColor,          // ✅ fill color
//                     borderColor: boxColor,    // ✅ border color
//                     borderWidth: 2
//                 }
//             }
//         ]
//     };

//     return <ReactECharts option={option} style={{ height: 250 }} />;
// };

// export default AnalyticsBoxPlot;

///////end//////

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

// 🎨 Professional fixed palette
const COLOR_PALETTE = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#9c27b0",
    "#d32f2f",
    "#0288d1",
    "#f57c00",
    "#7b1fa2",
];

const AnalyticsBoxPlot = ({ graph, isDarkMode }) => {

    // ✅ Stable color based on analyticId
    const boxColor = useMemo(() => {
        const index = graph.analyticId % COLOR_PALETTE.length;
        return COLOR_PALETTE[index];
    }, [graph.analyticId]);

    // ✅ Memoize full chart option (performance optimization)
    const option = useMemo(() => ({
        tooltip: {
            trigger: "item",
            axisPointer: { type: "shadow" }
        },
        grid: {
            top: 5,
            left: "10%",
            right: "10%",
            bottom: "15%"
        },
        xAxis: {
            type: "category",
            data: graph.data.map(b => b.label),
            axisLabel: {
                rotate: 20,
                color: isDarkMode ? "#ffffff" : "#000000"
            },
            axisLine: {
                lineStyle: {
                    color: isDarkMode ? "#ffffff" : "#000000"
                }
            }
        },
        yAxis: {
            type: "value",
            name: graph.unit || "",
            axisLabel: {
                color: isDarkMode ? "#ffffff" : "#000000"
            },
            axisLine: {
                lineStyle: {
                    color: isDarkMode ? "#ffffff" : "#000000"
                }
            }
        },
        series: [
            {
                name: "Box Plot",
                type: "boxplot",
                data: graph.data.map(b => [
                    b.min,
                    b.q1,
                    b.median,
                    b.q3,
                    b.max
                ]),
                itemStyle: {
                    color: boxColor,
                    borderColor: boxColor,
                    borderWidth: 2
                }
            }
        ]
    }), [graph.data, graph.unit, isDarkMode, boxColor]);

    return <ReactECharts option={option} style={{ height: 250 }} />;
};

export default AnalyticsBoxPlot;
