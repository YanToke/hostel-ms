import React from 'react'

const StasticCard = ({ stasticData }) => {
  console.log(stasticData)
  const cards = [
    {
      title: 'Total Residents',
      amount: stasticData.totalResidents,
      img: '/system-icons/people.png',
      custom_h: '40px',
      custom_w: null,
    },
    {
      title: 'Available Rooms',
      amount: stasticData.availableRoom,
      img: '/system-icons/door-open.png',
      custom_h: '40px',
      custom_w: null,
    },
    {
      title: 'Total Rooms',
      amount: stasticData.totalRooms,
      img: '/system-icons/door-close.png',
      custom_h: '40px',
      custom_w: null,
    },
    {
      title: 'Total Male Residents',
      amount: stasticData.totalMaleResidents,
      img: '/system-icons/male.png',
      custom_h: null,
      custom_w: '35px',
    },
    {
      title: 'Total Female Residents',
      amount: stasticData.totalFemaleResidents,
      img: '/system-icons/female.png',
      custom_h: null,
      custom_w: '35px',
    },
  ]
  return (
    <div className="flex flex-wrap gap-[24px] mb-[40px]">
      {cards.map((card) => (
        <div className="bg-white flex items-center w-[345px] h-[160px] p-[16px] justify-between shadow-lg">
          <div className="align-text-top h-[100%]">
            <p className="font-bold mb-[16px]">{card.title}</p>
            <p className="text-[32px] font-bold">{card.amount}</p>
          </div>
          <img
            src={card.img}
            className={`h-[${card.custom_h}] w-[${card.custom_w}]`}
            alt="total residents"
          />
        </div>
      ))}
    </div>
  )
}

export default StasticCard
