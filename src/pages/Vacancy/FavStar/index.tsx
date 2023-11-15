import { useAppSelector } from '@/hooks/useAppHooks'
import { ActiveFavStar } from '@/pages/Vacancy/ActiveFavStar'
import { selectFav } from '@/redux/favSlice'

import { IFavStar } from './interface'

export const FavStar = ({ vacancy }: IFavStar) => {
  const favourites = useAppSelector(selectFav)

  const favStarResult = favourites.find((f) => {
    return f.id === vacancy.id
  }) ? (
    <ActiveFavStar vacancy={vacancy} isFav />
  ) : (
    <ActiveFavStar vacancy={vacancy} isFav={false} />
  )

  return favStarResult
}
