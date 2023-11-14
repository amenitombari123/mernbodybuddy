export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': '839005f05bmsh45b9d0a1d411c13p1e5f64jsnaaccbece9b18',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
 export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '839005f05bmsh45b9d0a1d411c13p1e5f64jsnaaccbece9b18',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };
