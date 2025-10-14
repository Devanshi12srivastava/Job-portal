import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'





const filterData=[{
    filterType:"Location",
    array:["Delhi","Noida","Mumbai","Lucknow","Gurgaon","Pune","Banglore","Hydrabad","Allahabad","Kanpur","Indore","surat","Jhamshedpur","Trichy","Warangal","Surathkal","Patna","Gwaliaor","Kerala","Chennai"]
  },
{
      filterType:"Industry",
    array:[ "Mernstack Developer",
  "Data Analyst",
  "AI Engeerier",
  "Education",
  "Frontend Developer",
  "FullStack Developer",
  "Telecommunications",
  "Media", 
  "Marketing",
  "Real Estate",
  "DevOps Developer",
  ]
},{
      filterType:"Salary",
    array:[  "0 - 3 LPA",
  "3 - 5 LPA",
  "5 - 8 LPA",
  "8 - 12 LPA",
  "12 - 15 LPA",
  "15 - 20 LPA",
  "20 - 25 LPA",
  "25 - 30 LPA",
  "30 - 40 LPA",
  "40 - 50 LPA",
  "50 - 75 LPA",
  "75 - 100 LPA",
  "100 - 150 LPA",
  "150 - 200 LPA",
  "200+ LPA",]
},
{
   filterType:"Experience",
    array:[ "0-1 Years",
  "1 - 3 Years",
  "3 - 5 Years",
  "5 - 7 Years",
  "7 - 10 Years",
  "10 - 12 Years",
  "12 - 15 Years",
  "15 - 20 Years",
  "Internship",
  "Entry Level",
  "Mid Level",
,]

}
]

const FilterCard = () => {

  
  return (
    <div className='w-full'>
      <h1 className='mt-2 text-2xl font-bold text-red-500 text-left' > Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='font-medium text-lg text-left text-purple-950'>{data.filterType}</h1>
              {
                data.array.map((item,index)=>{
                  return(
                    <div className='flex flex-items-center space-x-2 my-3 '>
                      <RadioGroupItem value={item}/>
                      <Label >
                      {item}
                      </Label>
                      </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard;
