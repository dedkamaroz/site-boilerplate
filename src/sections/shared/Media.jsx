import { useEffect, useRef } from "react"

// One media abstraction for image and video, switched on media.kind. Reused by
// hero, gallery and featured so a site can supply a video (agency) or a still
// (trade) for the same section without parallel components.
//
//   media = { kind: "image" | "video", src, poster?, alt? }
//
// Video defaults to the background-loop behaviour (autoplay, muted, loop,
// playsInline); pass `controls` or override via props to change that. Renders
// nothing when there is no src, so an absent media block leaves no markup.
export default function Media({ media, className, style, alt, ...rest }) {
  const videoRef = useRef(null)
  const src = media?.src
  const kind = media?.kind || "image"

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const playback = v.play()
    if (playback && typeof playback.catch === "function") playback.catch(() => {})
  }, [src])

  if (!src) return null

  if (kind === "video") {
    return (
      <video
        ref={videoRef}
        src={src}
        poster={media.poster || undefined}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
        {...rest}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? media.alt ?? ""}
      className={className}
      style={style}
      loading="lazy"
      {...rest}
    />
  )
}
