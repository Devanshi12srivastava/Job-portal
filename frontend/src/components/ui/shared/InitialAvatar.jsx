const InitialAvatar = ({ name, size = 40 }) => {
  const firstLetter = name?.charAt(0).toUpperCase() || "?";

  // Array of colors
  const colors = ["#F87171", "#34D399", "#60A5FA", "#FBBF24", "#A78BFA", "#F472B6", "#10B981", "#3B82F6"];
  
  // Use char code to pick color
  const charCode = firstLetter.charCodeAt(0);
  const bgColor = colors[charCode % colors.length];

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

export default InitialAvatar;
