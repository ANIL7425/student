
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";



function IDCard({data,template}){
    const cardRefs=useRef();
    const downloadImage=()=>{
        htmlToImage.toPng(cardRefs.current).then((dataUrl)=>{
            const link=document.createElement("a");
            link.download=`${data.name}_id.png`;
            link.href=dataUrl;
            link.click();
        });

    };
    return(
        <div ref={cardRefs}
        className={`mt-6 ml-8 mr-8 p-6 rounded-2xl shadow-lg transition-all duration-300 ${
          template === "template1"
            ? "bg-gradient-to-br from-white to-blue-400 border border-blue-200"
            : "bg-gradient-to-br from-gray-100 to-gray-900 border border-gray-400"
        }`}>
        <div className="flex flex-col sm-flex-row items-center gap-6">
           <img src={data.photo} alt="student_photo"  className="w-45 h-40 rounded-sm object-cover border-4 border-blue-400 shadow-md"/>
           <div>
            <h2 className="text-2xl font-bold text-blue-800">{data.name}</h2>
            <p className="text-sm text-gray-700">Roll no:<strong>{data.roll}</strong></p>
            <p className="text-sm text-gray-700">class:<strong>{data.classDiv}</strong></p>
          
            <p className="text-sm text-gray-700">Route No:<strong>{data.busRoute}</strong></p>
            {data.allergiesList && data.allergiesList.length>0 &&(
            <p className="text-sm text-red-600 mt-1">
                Allergies:<strong>{data.allergiesList.join(",")}</strong>
                </p>
            )}
           </div>    
        </div>
        <div className="mt-6 flex items-center justify-between">
            <QRCode 
              value={JSON.stringify({
                name:data.name,
                roll:data.roll,
                classDiv:data.classDiv,
                rack:data.rack,
                Route:data.busRoute,
                allergiesList:data.allergiesList,

})} size={90} bgColor="#ffff"
/>
<button onClick={downloadImage}
          className="ml-auto mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          Download ID Card
        </button>
        </div>
        
        </div>
    )

}

export default IDCard;

