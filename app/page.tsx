import BestHotels from "@/components/best-hotels/bestHotels";
import Hero from "@/components/hero/hero";
import PopularLocations from "@/components/popular-locations/popularLocations";
import sea from "@/public/sea.jpg"
import hotel_image from "@/public/hr_10.jpg"

export default function Home() {
  return (
    <>
      <Hero image={sea.src} mainHeader="Are you ready for an adventure?" 
      secondaryHeader="Browse though the popular locations."
      />
      <PopularLocations/>
      <Hero image={hotel_image.src} mainHeader="Get the best offer for your hotel!"
      secondaryHeader="Pick your desired place."
      />
      <BestHotels/>
    </>
  );
}
