import type { Video } from "@/lib/content";

/**
 * Project videos, all with controls. Silent clips also start on their own and loop, like
 * moving photographs (the controls let viewers pause them); videos with sound wait.
 */
export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {videos.map(({ src, poster, width, height, title, sound }) => (
        <video
          key={src}
          src={src}
          poster={poster}
          width={width}
          height={height}
          aria-label={title}
          playsInline
          preload="metadata"
          className="h-auto w-full bg-[#111]"
          controls
          {...(!sound && { autoPlay: true, muted: true, loop: true })}
        />
      ))}
    </div>
  );
}
