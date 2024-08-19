import HeaderWithBackward from '@/components/HeaderWithBackward'
import ProfileEdit from '@/containers/my-page/editprofile'

export default function ProfileEditPage() {
  return (
    <div className="space-y-12">
      <HeaderWithBackward title="회원 정보 수정" />
      <ProfileEdit />
    </div>
  )
}
