import Head from 'next/head'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer';
import Header from '../Components/Header'
import LargeCard from '../Components/LargeCard';
import MediumCard from '../Components/MediumCard';
import SmallCard from '../Components/SmallCard';

export default function Home({exploreData, cardsData}) {
  return (
    <div className="">
      <Head>
        <title>Air BNB Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Explore Nearby
          </h2>
          {/* Pull some date from a server API ENDPOINT */}
          <div className="grid grid-cols-1 s:grid-cols-2 lg:grid-cols3 xl:grid-cols-4"> 
          {exploreData?.map(({img, distance, location}) => (
          <SmallCard
          key={img} 
          img={img} 
          distance={distance} 
          location={location}/>
          ))}
          </div>
         <section>
           <h2 className="text-4xl font-semibold py-8">Live Anywhere
           </h2>
           <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">{cardsData?.map(({ img, title}) => (
             <MediumCard key={img} img={img} title={title} />
           ))}</div>
           
         </section>
        </section>
        <LargeCard
        img="https://links.papareact.com/4cj"
        title="The Greatest Outdoors"
        description="Wishlists curated by AirBnb." 
        buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
const exploreData = await fetch ("https://links.papareact.com/pyp").
then(
  (res) => res.json()
);

const cardsData = await fetch ('https://links.papareact.com/zp1').
then(
  (res) => res.json()
);

return {
  props: {
    exploreData,
    cardsData
  }
}
}
// Server Side Rendering vs Static Rendering
// A user comes to the website and they get an entire React Bundle
// The React Bundle is good but the problem comes when it is bigger.
// NextJS introduces a server which is a sync between the two points.
// A User would make a request to go to the site, using NextJS, and then the server delivers the page.
// Server side rendering, everytime the user comes to the website, it will go ahead and build the page and then deploy it
// which is still much faster than React. 
// NB Any request made to the internet uses await fetch
// We pass the information from the server into our functional component. 
// Static Props prefetches the information and pass it over as props to the component. 