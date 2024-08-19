import { notFound } from 'next/navigation'
import NavigationBar from '@/containers/community/NavigationBar'
import CoordiGrid from '@/containers/community/CoordiGrid'
import TagSelector from '@/containers/community/TagSelector'

export default function CommunityCategorizedPage({
  params,
}: {
  params: { group: 'all' | 'style' | 'age' }
}) {
  const validGroups = ['all', 'style', 'age']
  if (!validGroups.includes(params.group)) {
    notFound()
  }

  return (
    <div>
      <NavigationBar />
      {params.group !== 'all' && <TagSelector group={params.group} />}
      <CoordiGrid />
    </div>
  )
}
