import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { DatePicker } from "antd";
import { t } from 'i18next';

const ChartThree: React.FC<{ data: any, setYear: (val: string | null) => void, setMonth: (val: string | null) => void }> = ({ data, setMonth, setYear }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  const series = hasData ? data.map((item: any) => item?.count) : [100];
  const labels = hasData ? data.map((item: any) => item?.name) : [t('NotFoundFromChart')];

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    labels: labels,
    legend: {
      show: true,
      position: 'right',
      fontSize: '14px',
      labels: {
        colors: hasData ? undefined : ['#F2F2F2'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    fill: {
      colors: hasData ? undefined : ['#F2F2F2'],
    },
    dataLabels: {
      enabled: false,
    },
    noData: {
      text: 'No Data Available',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: '#A3A3A3',
        fontSize: '14px',
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const handleYearChange = (date: any) => {
    if (date) setYear(date.year());
    else setYear(data)
  };

  const handleMonthChange = (date: any) => {
    if (date) setMonth(date.month());
    else setMonth(data)
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm bg-white px-5 pb-5 pt-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-md font-semibold text-black">{t('VisitorsAnalytics')}</h5>
        </div>
        <div className='flex gap-5'>
          <DatePicker
            allowClear
            onChange={handleYearChange}
            placeholder={t('SelectYear')}
            picker="year"
          />
          <DatePicker
            allowClear
            onChange={handleMonthChange}
            placeholder={t('SelectMonth')}
            picker="month"
          />
        </div>
      </div>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
