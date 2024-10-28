import Banner from './Banner';
import BestQualities from './BestQualities';
import ExploreBaryon from './ExploreBaryon';
import TrendingToken from './TrendingTokens';

const Home = () => {
  
  return (
    <div className="container mb-24">
      <div className="min-h-[calc(100dvh-4.75rem)] phone:min-h-0 -mt-6 content-center">
        <Banner />
      </div>
      <div className="mt-10 mb-40">
        <TrendingToken />
      </div>
      <div className="mb-40">
        <ExploreBaryon />
      </div>
      <div className="mb-40">
        <BestQualities />
      </div>
    </div>
  );
};

export default Home;
