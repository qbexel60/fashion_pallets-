type Video = {
  id: string;
  url: string; // Changed to store just the video URL/ID
};

// Extract just the video IDs/URLs for cleaner data structure
const videos: Video[] = [
  {
    id: '1',
    url: '1609748973711124',
  },
  {
    id: '2',
    url: '25424152670590437',
  },

  {
    id: '3',
    url: '855303260610489',
  },
  {
    id: '4',
    url: '3698723900263472',
  },
  {
    id: '5',
    url: '1219597409757209',
  },
];

export { videos };