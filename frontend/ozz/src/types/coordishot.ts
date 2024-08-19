export interface CoordishotDetail {
  boardId: number
  content: string
  createdDate: string
  imageFile: FileDetail
  user: UserDetail
  like: LikeDetail
  isBookmark: boolean
  tags: TagDetail[]
  style: string[]
  age: number
}

export interface FileDetail {
  fileId: number
  filePath: string
  fileName: string
  fileType: string
}

export interface UserDetail {
  usersId: number
  nickname: string
  profileFileId: FileDetail
}

export interface LikeDetail {
  total: number
  isLike: boolean
}

export interface TagDetail {
  clothesTagId: number
  clothes: ClothesDetail
  x_position: number
  y_position: number
}

export interface ClothesDetail {
  imageFile: FileDetail
  categoryLow: CategoryLowDetail
  name: string
}

export interface CategoryLowDetail {
  categoryLowId: number
  name: string
}
