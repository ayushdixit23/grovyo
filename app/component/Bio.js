// import React, { useEffect, useState } from "react";
// import { BsWhatsapp, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
// import { FaSnapchatSquare } from "react-icons/fa";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';


// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
// });

// const Bio = ({ bio }) => {
//   const [position, setPosition] = useState(null)
//   const [location, setLocation] = useState(null)


//   useEffect(() => {
//     if (bio) {
//       if (bio?.location?.coordinates?.latitude && bio?.location?.coordinates?.longitude) {
//         setPosition([bio?.location?.coordinates?.latitude, bio?.location?.coordinates?.longitude])
//         setLocation(bio?.location?.streetaddress + " " + bio?.location?.city + " " + bio?.location?.state)
//       }
//     }
//   }, [bio])


//   return (
//     <>

//       {bio?.isAbout && (
//         <div className=" dark:text-white w-full">
//           <div className="flex w-[100%] pn:max-sm:flex-col mt-2 space-y-1">
//             <div className="sm:w-[50%] w-[100%] flex flex-col justify-start items-start">
//               <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Bio:</div>
//               <div className=" mr-10 mt-5" >{bio?.bio}</div>
//               {bio.showContact && <>
//                 <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Contact Us:</div>
//                 {bio?.email && !/undefined/.test(bio.email) && <div><span className="font-medium">Email :</span> {bio?.email}</div>}
//                 {bio?.phone && !/undefined/.test(bio.phone) && <div>

//                   <span className="font-medium">Phone :</span> +{bio?.phone}</div>}

//               </>}


//               {Object.keys(bio?.links || {}).every(
//                 (key) => bio?.links[key] == "undefined"
//               ) ? null : (
//                 <>
//                   <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Links:</div>
//                   <div className="flex w-full text-black dark:text-white items-center flex-wrap">
//                     <div className="flex w-full text-black dark:text-white items-center flex-wrap">
//                       {bio?.links.yt != "undefined" && (
//                         <a
//                           target="_blank"
//                           href={bio?.links.yt}
//                           className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
//                         >
//                           <BsYoutube className="text-red-600" />

//                           <div className="text-sm font-medium">Youtube</div>
//                         </a>
//                       )}
//                       {bio?.links?.insta != "undefined" && (
//                         <a
//                           target="_blank"
//                           href={bio?.links?.insta}
//                           className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
//                         >
//                           <BsInstagram className="text-red-600" />

//                           <div className="text-sm font-medium">Instagram</div>
//                         </a>
//                       )}

//                       {bio?.links?.x != "undefined" && (
//                         <a
//                           target="_blank"
//                           href={bio?.links?.x}
//                           className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
//                         >
//                           <BsWhatsapp className="text-green-600" />

//                           <div className="text-sm font-medium">X</div>
//                         </a>
//                       )}
//                       {bio?.links?.linkdin != "undefined" && (
//                         <a
//                           target="_blank"
//                           href={bio?.links?.linkdin}
//                           className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
//                         >
//                           <BsLinkedin className="text-blue-600 text-sm font-medium" />

//                           <div className="text-sm font-medium">Linkedin</div>
//                         </a>
//                       )}
//                       {bio?.links?.snap != "undefined" && (
//                         <a
//                           target="_blank"
//                           href={bio?.links?.snap}
//                           className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
//                         >
//                           <FaSnapchatSquare className=" text-[#FFFF00]" />

//                           <div className="text-sm font-medium">Snapchat</div>
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}

//             </div>
//             {position && <div className="sm:w-[50%] w-[100%] sm:h-[300px] rounded-xl overflow-hidden h-[300px]">
//               <MapContainer center={position} zoom={13} zoomControl={false} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={position}>
//                   <Popup>
//                     {location}
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//             }

//           </div>
//         </div >
//       )}
//     </>
//   );
// };

// export default Bio;
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { BsWhatsapp, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaSnapchatSquare } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

// Memoize the links section
const LinksSection = React.memo(({ links }) => {
  const linkElements = useMemo(() => {
    return Object.entries(links).map(([key, url]) => {
      if (url === "undefined") return null;
      const iconComponents = {
        yt: <BsYoutube className="text-red-600" />,
        insta: <BsInstagram className="text-red-600" />,
        x: <BsWhatsapp className="text-green-600" />,
        linkdin: <BsLinkedin className="text-blue-600" />,
        snap: <FaSnapchatSquare className="text-[#FFFF00]" />,
      };
      const labels = {
        yt: "Youtube",
        insta: "Instagram",
        x: "X",
        linkdin: "Linkedin",
        snap: "Snapchat",
      };
      return (
        <a
          key={key}
          target="_blank"
          href={url}
          className="flex justify-between py-2 px-5 m-2 items-center space-x-2 bg-white rounded-lg"
        >
          {iconComponents[key]}
          <div className="text-sm font-medium">{labels[key]}</div>
        </a>
      );
    });
  }, [links]);

  return (
    <div className="flex w-full text-black dark:text-white items-center flex-wrap">
      {linkElements}
    </div>
  );
});

const Bio = React.memo(({ bio }) => {
  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (bio) {
      const { latitude, longitude } = bio?.location?.coordinates || {};
      if (latitude && longitude) {
        setPosition([latitude, longitude]);
        setLocation(`${bio?.location?.streetaddress || ""} ${bio?.location?.city || ""} ${bio?.location?.state || ""}`);
      }
    }
  }, [bio]);

  // Memoize MapContainer options
  const mapOptions = useMemo(() => ({
    center: position,
    zoom: 13,
  }), [position]);

  return (
    <>
      {bio?.isAbout && (
        <div className="dark:text-white w-full">
          <div className="flex w-[100%] pn:max-sm:flex-col mt-2 space-y-1">
            <div className="sm:w-[50%] w-[100%] flex flex-col justify-start items-start">
              <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Bio:</div>
              <div className="mr-10 mt-5">{bio?.bio}</div>
              {bio.showContact && (
                <>
                  <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Contact Us:</div>
                  {bio?.email && !/undefined/.test(bio.email) && <div><span className="font-medium">Email :</span> {bio?.email}</div>}
                  {bio?.phone && !/undefined/.test(bio.phone) && <div><span className="font-medium">Phone :</span> +{bio?.phone}</div>}
                </>
              )}
              {Object.keys(bio?.links || {}).some(key => bio?.links[key] !== "undefined") && (
                <>
                  <div className="text-[16px] pn:max-sm:text-[14px] font-semibold">Links:</div>
                  <LinksSection links={bio?.links || {}} />
                </>
              )}
            </div>
            {position && (
              <div className="sm:w-[50%] w-[100%] sm:h-[300px] rounded-xl overflow-hidden h-[300px]">
                <MapContainer {...mapOptions} zoomControl={false} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>{location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Bio;
