import React, { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { currencyOptions } from "@/utils";
import { Note } from "@/types/note.type";

interface StatisticsProps {
  notes: Note[];
}

const calculateSeriesByCurrency = (notes: Note[]) =>
  currencyOptions.map((currency) => {
    const filterByTypeAndCurrency = (type: string) =>
      notes
        .filter((transaction) => transaction.type === type && transaction.currency === currency.value)
        .map((transaction) => transaction.total_amount);

    const totalIncome = filterByTypeAndCurrency("Income").reduce((sum, amount) => sum + amount, 0);
    const totalExpense = filterByTypeAndCurrency("Expense").reduce((sum, amount) => sum + amount, 0);

    return [
      { name: "Income", data: totalIncome },
      { name: "Expense", data: totalExpense },
    ];
  }).flat();

const Statistics: React.FC<StatisticsProps> = ({ notes }) => {
  const categories = useMemo(() => currencyOptions?.map((item) => item?.label), []);
  const seriesByCurrency = useMemo(() => calculateSeriesByCurrency(notes), [notes]);

  const series = useMemo(
    () => [
      { name: "Income", data: seriesByCurrency.filter((item) => item.name === "Income").map((item) => item.data) },
      { name: "Expense", data: seriesByCurrency.filter((item) => item.name === "Expense").map((item) => item.data) },
    ],
    [seriesByCurrency]
  );

  const statistics: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Notes statistics",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Amount",
      },
    },
    tooltip: {
      valueSuffix: " (Amount)",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: series,
  };

  return (
    <div className="px-2 py-3.5 bg-white shadow-lg rounded-2xl">
      {statistics?.series?.length ? <HighchartsReact highcharts={Highcharts} options={statistics} /> : ""}
    </div>
  );
};

export default Statistics;