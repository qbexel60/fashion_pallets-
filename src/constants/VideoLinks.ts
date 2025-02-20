type Video = {
  id: string;
  url: string; // Changed to store just the video URL/ID
};

// Extract just the video IDs/URLs for cleaner data structure
const videos: Video[] = [
  {
    id: '1',
    url: '636354885494155',
  },
  {
    id: '2',
    url: '452647917353904',
  },

  {
    id: '3',
    url: '948828960071913',
  },
  {
    id: '4',
    url: '1161380162106980',
  },
  {
    id: '5',
    url: '9031729030203531',
  },
];

export { videos };