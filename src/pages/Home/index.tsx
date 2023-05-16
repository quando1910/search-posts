import PostsList from "shared/components/PostsList";
import SearchBox from "shared/components/SearchBox";

const Home = () => {

  return (
    <div className="flex flex-col">
      <SearchBox />
      <PostsList />
    </div>
  );
};

export default Home;
