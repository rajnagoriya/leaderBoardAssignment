import React from 'react'

function LeaderBoardCard({data,clickHandle}) {
  return (
    <div className="cursor-pointer " onClick={()=>clickHandle(data.username)}>
        <div className="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded shadow">
            <span className="text-lg font-medium cursor-pointer ">
              {data.firstName}   {data.lastName}
            </span>
            <span className="text-sm text-gray-600">Points: {data.Points}</span>
          </div>
    </div>
  )
}

export default LeaderBoardCard