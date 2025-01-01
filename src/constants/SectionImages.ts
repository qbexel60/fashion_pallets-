
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

export const sectionImages: { preOrderedimages: PreOrderedimages[], realImages: RealImages[], reviews: Reviews[] } = {
  preOrderedimages: [
    {
      name: 'image1',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image2',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image3',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image4',
      url: 'https://picsum.photos/200/300',
    },
  ],
  realImages: [
    {
      name: 'image1',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image2',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image3',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image4',
      url: 'https://picsum.photos/200/300',
    },
  ],
  reviews: [
    {
      name: 'image1',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image2',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image3',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'image4',
      url: 'https://picsum.photos/200/300',
    },
  ]
};
