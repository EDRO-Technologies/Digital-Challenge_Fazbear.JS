import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const Charts: React.FC = () => {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create('chartdiv', am4charts.XYChart);

    // Создание оси X
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    // Создание оси Y
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Создание серии данных
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.name = 'Value';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    // Установка цвета столбцов на основе данных
    series.columns.template.adapter.add('fill', function(fill, target) {
      return am4core.color(target.dataItem.dataContext.color);
    });

    // Добавление данных
    chart.data = [
      { category: 'легкие',     value: 150, color: 'green' },
      { category: 'средние',    value: 55,  color: 'yellow' },
      { category: 'тяжелые',    value: 12,  color: 'orange' },
      { category: 'инциденты',  value: 10,  color: 'red' },
      { category: 'команды',    value: 38,  color: 'blue' },
    ];

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default Charts;
