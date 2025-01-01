
export type PreOrderedimages = {
  name: string;
  url: string;
}

export type RealImages = {
  name: string;
  url: string;
}

export type Reviews = {
  name: string;
  url: string;
}

export type SectionImage = {
  name: string;
  url: string;
}

export const sectionImages: {
  preOrdered: PreOrderedimages[];
  real: RealImages[];
  reviews: Reviews[];
} = {
  preOrdered: [
    {
      name: 'image1',
      url: 'https://i.imgur.com/aPDEmth.jpeg',
    },
    {
      name: 'image2',
      url: 'https://i.imgur.com/tz0Hc02.jpeg',
    },
    {
      name: 'image3',
      url: 'https://i.imgur.com/raTUAxf.jpeg',
    },
    {
      name: 'image4',
      url: 'https://i.imgur.com/DCCt0Pa.jpeg',
    },
    {
      name: 'image5',
      url: 'https://i.imgur.com/ynC4HwB.jpeg',
    },
    {
      name: 'image6',
      url: 'https://i.imgur.com/lKRiFDC.jpeg',
    },
    {
      name: 'image7',
      url: 'https://i.imgur.com/zTYXTrf.jpeg',
    },
  ],
  real: [
    {
      name: 'image1',
      url: 'https://i.imgur.com/HAveSTC.jpeg',
    },
    {
      name: 'image2',
      url: 'https://i.imgur.com/uQKVUCq.jpeg',
    },
    {
      name: 'image3',
      url: 'https://i.imgur.com/oWZWqUK.jpeg',
    },
    {
      name: 'image4',
      url: 'https://i.imgur.com/um67Zsq.jpeg',
    },
    {
      name: 'image5',
      url: 'https://i.imgur.com/LPPISPk.jpeg',
    },
    {
      name: 'image6',
      url: 'https://i.imgur.com/pGApZdb.jpeg',
    },
    {
      name: 'image6',
      url: 'https://i.imgur.com/KzuQKne.jpeg',
    },
  ],
  reviews: [
    {
      name: 'image1',
      url: 'https://i.imgur.com/171w6kU.jpeg',
    },
    {
      name: 'image2',
      url: 'https://i.imgur.com/3KiDFJw.jpeg',
    },
    {
      name: 'image3',
      url: 'https://i.imgur.com/tT8LvRT.jpeg',
    },
    {
      name: 'image4',
      url: 'https://i.imgur.com/nrrdEh5.jpeg',
    },
    {
      name: 'image5',
      url: 'https://i.imgur.com/RObnb0Z.jpeg',
    },
    {
      name: 'image6',
      url: 'https://i.imgur.com/mF7I3Jv.jpeg',
    },
    {
      name: 'image7',
      url: 'https://i.imgur.com/g6UCcfD.jpeg',
    },
  ],
};
