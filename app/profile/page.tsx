import DashboardLayout from "@/layout/DashboardLayout";
import ProfileFeed from "@/components/features/profile/ProfileFeed";

const ProfilePage = () => {
  return (
    <DashboardLayout pageName="Profil">
      <ProfileFeed />
    </DashboardLayout>
  );
};

export default ProfilePage;
