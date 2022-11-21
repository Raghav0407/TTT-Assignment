
import React, {useState} from 'react';

import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Display.css';


function Display()
{
    const [data,setData] = useState();
    function getContent()
{
    
        fetch("https://www.terriblytinytales.com/test.txt")
        .then((response)=>{
           return response.text();
        }).then((data)=>{
             const chars = {};
            const arr = data.split(' ');
    
            for (let word of arr)
            {
                if(!chars[word])
                {
                    chars[word] = 1;
                }
                else{
                    chars[word]++;
                }
            }
           setData(Object.entries(chars).sort((a,b)=>b[1]-a[1]).slice(0,20).map(item=>{
                return{
                word:item[0],
                Frequency:item[1]
                }
                }));
        })
}
console.log(data);
    return (
        <>
     <div className="submit">
        <button className="btn" onClick={getContent}>Submit</button>
     </div>
      {data && <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Frequency" fill="#ff4500" />
        </BarChart>
      </ResponsiveContainer>
      }
     </>

    )
}

export default Display;