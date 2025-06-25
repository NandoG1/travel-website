import BestHotels from "@/components/best-hotels/bestHotels";
import Hero from "@/components/hero/hero";
import PopularLocations from "@/components/popular-locations/popularLocations";

export default function Home() {
  return (
    <>
      <Hero/>
      <PopularLocations/>
      <Hero/>
      <BestHotels/>
    </>
  );
}
