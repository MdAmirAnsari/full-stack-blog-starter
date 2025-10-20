import { Image as IKReactImage } from "@imagekit/react"

const IkImage = ({src, className, h, w, alt}) => {
  return (
    <IKReactImage 
        src = {src}
        width={w}
        height={h}
        alt = {alt}
        loading = "lazy"
    />
  )
}

export default IkImage