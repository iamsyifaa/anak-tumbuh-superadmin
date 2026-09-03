interface Props {
  name: string;
  avatarUrl?: string;
  size?: number;
}

function AvatarProfile({ name, avatarUrl, size = 40 }: Props) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";

  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt={name} style={{ width: size, height: size }} className="rounded-full object-cover" />;
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-[#D7EFFF]/30 font-bold text-[#203A5B]"
    >
      {initial}
    </div>
  );
}

export default AvatarProfile;
