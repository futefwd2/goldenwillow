import Header from "../components/Header";
import bgImage from '../assets/goldenwillows/projecthighlights.jpg'

export default function VideoPreview() {
   
    return (
 <div
      className="h-screen w-screen relative bg-cover bg-no-repeat overflow-hidden bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <div className='absolute bg-black/70 h-screen w-screen'></div>

      {/* Wistia video overlay using iframe */}
      <div className="absolute top-1/4 md:top-[20%] lg:top-5 left-0 w-full h-full flex items-center justify-center text-white">
        <div
          style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://fast.wistia.net/embed/iframe/uhlrcyrlsv?seo=false&videoFoam=true&autoplay=1&muted=1&playbar=false"
            title="Wistia Video"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "0",
            }}
          />
        </div>
      </div>
      {/* <Navbar /> */}

    </div>

       

    );
}
