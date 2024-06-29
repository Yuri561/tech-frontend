import React from 'react';
import Chart from 'react-apexcharts';

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      },
    },
    foreColor: '#000'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      colors: {
        backgroundBarOpacity: 1,
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Completed', 'Pending', 'Needs Attention', 'In Progress', 'Delayed', 'Cancelled', 'On Hold'],
    labels: {
      style: {
        colors: '#ffffff'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Tasks',
      style: {
        color: '#ffffff'
      }
    },
    labels: {
      style: {
        colors: '#ffffff'
      }
    }
  },
  fill: {
    opacity: 1,
    colors: ['#FFC1CC', '#C1FFC1', '#C1D9FF', '#FFF1C1', '#D1C1FF', '#FFC1F1', '#C1FFF1']
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val) {
        return val.toString();
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    labels: {
      colors: '#ffffff'
    }
  }
};

const chartSeries: ApexCharts.ApexOptions['series'] = [
  {
    name: 'Tasks',
    data: [44, 55, 41, 37, 22, 43, 26]
  }
];

interface WorkOrdersChartProps {
  username: string;
}

const WorkOrdersChart: React.FC<WorkOrdersChartProps> = ({ username }) => {
  return (
    <section className="bg-gray-800 p-4 md:p-2 md:h-80 rounded" data-aos="zoom-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl text-white">TechTrack</h2>
        <div className="text-lg md:text-xl text-white">
          <span>Track: {username}</span>
        </div>
      </div>
      <div className="p-5 rounded h-80 w-full">
        <Chart options={chartOptions} series={chartSeries} type="bar" width="100%" height="100%" className='w-full h-full' />
      </div>
    </section>
  );
};

export default WorkOrdersChart;
