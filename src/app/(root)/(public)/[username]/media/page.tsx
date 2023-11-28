import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserByUsername } from "@/utils/getData";
import useCookies from "@/hooks/useCookies";
import PostSection from "@/components/profile/PostSection";

interface Params {
  params: {
    username: string;
  };
}

const MediaPage = async ({ params: { username } }: Params) => {
  const { userId } = useCookies();
  const { user } = await getUserByUsername(username);

  return (
    <ProfileHeader type="media" user={user} userId={userId}>
      <PostSection userId={userId} username={username.slice(3)} type="media" />
    </ProfileHeader>
  );
};

export default MediaPage;
