import React from 'react'

const Chat = ({ acendingOrderMessages }: any) => {

  return (
    <>
    <div className="p-[20px] h-[60vh] md:h-[58vh] overflow-y-auto flex flex-col-reverse">
        {acendingOrderMessages.reduce((acc: any, message: any) => {
          const messageDate = new Date(message.timestamp).toLocaleDateString();
          const lastMessageDate = acc.length > 0 ? acc[acc.length - 1].date : null;

          // Create new date separator if date changes
          if (messageDate !== lastMessageDate) {
            acc.push({ date: messageDate, messages: [] });
          }

          // Add message to current date group
          acc[acc.length - 1].messages.push(message);

          return acc;
        }, []).map((group: any) => (
          <div key={group.date}>
            <div className="text-gray-500 font-medium mt-4 justify-center text-center"><span>-----</span>{group.date}<span>-----</span></div>
            {group.messages.map((message: any, index: number) => (
              <div key={index} className="bg-gray-300 rounded-2xl p-4 mt-4">
                <div className="flex items-center mb-2">

                    <img src={`uploads/${message.photo}`} alt="Profile" className="mr-3 w-10 h-10 rounded-full" />

                  <p className="font-semibold">{message.name}</p>
                  <p className="text-gray-500 text-sm ml-2">{formatDate(message.timestamp)}</p>
                </div>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <div className="p-[20px] h-[60vh] overflow-y-auto flex flex-col-reverse">
        {acendingOrderMessages.map((message: any, index: any) => (
          <div key={index} className="bg-gray-300 rounded-2xl p-4 mt-4">
            <div className="flex items-center mb-2">
              {message.img && (
                <img src='' alt="Profile Picture" className="mr-2 w-10 h-10 rounded-full" />
              )}
              <p className="font-semibold">{message.name}</p>
              <p className="text-gray-500 text-sm ml-2">{formatDate(message.timestamp)}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div> */}
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