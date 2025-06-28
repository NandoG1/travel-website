import BestHotels from "@/components/best-hotels/bestHotels";
import Hero from "@/components/hero/hero";
import PopularLocations from "@/components/popular-locations/popularLocations";

export default function Home() {
  return (
    <>
      <Hero image={sea} mainHeader="Are you ready for an adventure?" 
      secondaryHeader="Browse though the popular locations"
      />
      <PopularLocations/>
      <Hero image={}/>
      <BestHotels/>
    </>
  );
}
