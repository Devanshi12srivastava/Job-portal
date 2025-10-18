const InitialsAvatar = ({ name, size = 40 }) => {
  const firstLetter = name?.charAt(0).toUpperCase() || "?";

  const colors = ["#F87171", "#34D399", "#60A5FA", "#FBBF24", "#A78BFA"];
  const bgColor = colors[name?.charCodeAt(0) % colors.length];

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size / 2,
      }}
    >
      {firstLetter}
    </div>
  );
};

export default InitialsAvatar;
