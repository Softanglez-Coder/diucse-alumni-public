import Marquee from "react-fast-marquee";
import { events } from "../../constants/home";
export default function NoticeBar() {
  return (
    <Marquee gradient={false} speed={50} className="font-semibold bg-green-100 p-3">
      {/* Notice from event , news  daynamicaly which is find on home.ts*/}
      {events.map((item) => (
        <div key={item.id} className="mx-4">
          <span className="text-blue-700 font-semibold">{item.title}</span> -{" "}
          <span className="text-gray-600">{item.description}</span>
        </div>
      ))}

    </Marquee>
  );
}
