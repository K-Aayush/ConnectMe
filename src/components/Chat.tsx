import React from 'react'

const Chat = ({ acendingOrderMessages }: any) => {

  return (
    <>
      <div className="p-[20px] h-[60vh] overflow-y-auto flex flex-col-reverse">
        {acendingOrderMessages.map((message: any, index: any) => (
          <div key={index} className="bg-gray-300 rounded-2xl p-4 mt-4">
            <div className="flex items-center mb-2">
              {message.img && (
                <img src={message.img} alt="Profile Picture" className="w-[40px] h-[40px] rounded-full mr-2" />
              )}
              <p className="font-semibold">{message.name}</p>
              <p className="text-gray-500 text-sm ml-2">{formatDate(message.timestamp)}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${period}`;
}


export default Chat