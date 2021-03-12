import { useState, useEffect } from "react";

function App() {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  // fetch news
  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
    //console.log(news);
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  return (
    <div>
      <h2>Hacker News</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {loading ? <h2>Loading...</h2> : ""}
      {news.map((n, i) => (
        <div key={i}>
          <h2>{n.title}</h2>
          <p>Author: {n.author}</p>
          <p>Points: {n.points}</p>
        </div>
      ))}
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   });
//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>
//         This button has been clicked {count} many times
//       </button>
//     </div>
//   );
// }

export default App;
