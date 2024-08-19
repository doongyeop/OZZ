import { Style } from './clothing'

export interface ImageFile {
  fileId: number
  filePath: string
  fileName: string
  fileType: string
}

export interface Coordinate {
  coordinateId: number
  name: string
  styleList: Style[]
  createdDate: string
  imageFile: ImageFile
}

export interface FavoriteDetail {
  favoriteId: number
  coordinate: Coordinate
}

export interface Coordibook {
  favoriteGroupId: number
  name: string
  imageFileList: ImageFile[]
}

export const mockCoordibooks: Coordibook[] = [
  {
    favoriteGroupId: 1,
    name: '서터릿 코디',
    imageFileList: [
      {
        fileId: 1,
        filePath: '/images/coordibook1_image1.png',
        fileName: 'coordibook1_image1.png',
        fileType: 'image/png',
      },
      {
        fileId: 2,
        filePath: '/images/coordibook1_image2.png',
        fileName: 'coordibook1_image2.png',
        fileType: 'image/png',
      },
    ],
  },
  {
    favoriteGroupId: 2,
    name: '캐주얼 데일리 코디',
    imageFileList: [
      {
        fileId: 3,
        filePath: '/images/coordibook2_image1.png',
        fileName: 'coordibook2_image1.png',
        fileType: 'image/png',
      },
      {
        fileId: 4,
        filePath: '/images/coordibook2_image2.png',
        fileName: 'coordibook2_image2.png',
        fileType: 'image/png',
      },
    ],
  },
  {
    favoriteGroupId: 3,
    name: '여름 휴가 코디',
    imageFileList: [
      {
        fileId: 5,
        filePath: '/images/coordibook3_image1.png',
        fileName: 'coordibook3_image1.png',
        fileType: 'image/png',
      },
      {
        fileId: 6,
        filePath: '/images/coordibook3_image2.png',
        fileName: 'coordibook3_image2.png',
        fileType: 'image/png',
      },
    ],
  },
  {
    favoriteGroupId: 4,
    name: '비즈니스 캐주얼',
    imageFileList: [
      {
        fileId: 7,
        filePath: '/images/coordibook4_image1.png',
        fileName: 'coordibook4_image1.png',
        fileType: 'image/png',
      },
      {
        fileId: 8,
        filePath: '/images/coordibook4_image2.png',
        fileName: 'coordibook4_image2.png',
        fileType: 'image/png',
      },
    ],
  },
  {
    favoriteGroupId: 5,
    name: '겨울 아우터 코디',
    imageFileList: [
      {
        fileId: 9,
        filePath: '/images/coordibook5_image1.png',
        fileName: 'coordibook5_image1.png',
        fileType: 'image/png',
      },
      {
        fileId: 10,
        filePath: '/images/coordibook5_image2.png',
        fileName: 'coordibook5_image2.png',
        fileType: 'image/png',
      },
    ],
  },
]

export const mockFavoriteDetails: FavoriteDetail[] = [
  {
    favoriteId: 1,
    coordinate: {
      coordinateId: 1,
      name: '서터릿 코디 1',
      styleList: ['STREET'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 1,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
        fileName: 'coordibook1_image1.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 2,
    coordinate: {
      coordinateId: 2,
      name: '서터릿 코디 2',
      styleList: ['STREET'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 2,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
        fileName: 'coordibook1_image2.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 3,
    coordinate: {
      coordinateId: 3,
      name: '캐주얼 코디 1',
      styleList: ['CASUAL'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 3,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
        fileName: 'coordibook2_image1.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 4,
    coordinate: {
      coordinateId: 4,
      name: '캐주얼 코디 2',
      styleList: ['CASUAL'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 4,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
        fileName: 'coordibook2_image2.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 5,
    coordinate: {
      coordinateId: 5,
      name: '여름 휴가 코디 1',
      styleList: ['STREET'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 5,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/37026/detail_37026_66a2ee8c7c5fa_500.jpg?w=1000',
        fileName: 'coordibook3_image1.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 6,
    coordinate: {
      coordinateId: 6,
      name: '여름 휴가 코디 2',
      styleList: ['STREET'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 6,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
        fileName: 'coordibook3_image2.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 7,
    coordinate: {
      coordinateId: 7,
      name: '비즈니스 캐주얼 1',
      styleList: ['ELEGANT'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 7,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/37027/detail_37027_66a2ee8fb080e_500.jpg?w=1000',
        fileName: 'coordibook4_image1.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 8,
    coordinate: {
      coordinateId: 8,
      name: '비즈니스 캐주얼 2',
      styleList: ['FORMAL'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 8,
        filePath:
          '	https://image.msscdn.net/thumbnails/mfile_s01/_shopstaff/staff_64800ed2b73b4.jpg?w=100',
        fileName: 'coordibook4_image2.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 9,
    coordinate: {
      coordinateId: 9,
      name: '겨울 아우터 코디 1',
      styleList: ['NATURAL'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 9,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
        fileName: 'coordibook5_image1.png',
        fileType: 'image/png',
      },
    },
  },
  {
    favoriteId: 10,
    coordinate: {
      coordinateId: 10,
      name: '겨울 아우터 코디 2',
      styleList: ['MANNISH'],
      createdDate: '2024-08-07T00:42:22.146Z',
      imageFile: {
        fileId: 10,
        filePath:
          'https://image.msscdn.net/thumbnails/images/codimap/detail/36971/detail_36971_66a19761aa51f_500.jpg?w=1000',
        fileName: 'coordibook5_image2.png',
        fileType: 'image/png',
      },
    },
  },
]
