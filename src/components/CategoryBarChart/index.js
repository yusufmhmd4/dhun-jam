import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList } from 'recharts';

function CategoryBarChart({ data }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const barGap = windowWidth >= 550 ? 80 : 40;

  const categories = [
    { dataKey: 'category_6', label: 'Custom' },
    { dataKey: 'category_7', label: 'Category 1' },
    { dataKey: 'category_8', label: 'Category 2' },
    { dataKey: 'category_9', label: 'Category 3' },
    { dataKey: 'category_10', label: 'Category 4' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[data]} barGap={barGap} barCategoryGap="90%">
        <XAxis dataKey="name" tick={false} fill='#fff' />
        <YAxis axisLine={true} tick={false} />
        {categories.map((category, index) => (
          <Bar key={index} dataKey={category.dataKey} fill="#F0C3F1" barSize={20}>
            <LabelList dataKey={category} position="bottom" fill="#FFFFFF" />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CategoryBarChart;
