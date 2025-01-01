

export const FacebookVideo: React.FC<{ videoId: string }> = ({ videoId }) => {
  const videoUrl = `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FFashionpalettebd%2Fvideos%2F${videoId}%2F&show_text=false&width=267&t=0`;

  return (
    <iframe
      src={videoUrl}
      width="267"
      height="476"
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  );
};
