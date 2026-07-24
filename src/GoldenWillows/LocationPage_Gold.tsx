import bgImage from '../assets/projecthighexterior.webp';
import Header from '../components/Header';



export default function LocationPage_Gold() {
  return (
    <div
      className="h-screen w-screen relative bg-cover bg-no-repeat overflow-hidden bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <div className='absolute bg-black/70 h-screen w-screen'></div>

      {/* Wistia video overlay using iframe */}
      <div className="absolute top-[30%] md:top-[20%] lg:top-5 left-0 w-full h-full flex items-center justify-center text-white">
        <div
          style={{
            position: "absolute",
            width: "80%",        // ⬅ increased width (was 66%)
            height: "80%",       // ⬅ slightly taller
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://fast.wistia.net/embed/iframe/nxzj4cbvyh?videoFoam=true&autoplay=1&muted=1&playbar=false"
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


