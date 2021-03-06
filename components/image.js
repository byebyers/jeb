import Img from 'next/image'
import sanity from '@/services/sanity'
import { useNextSanityImage } from 'next-sanity-image'

export default function Image({ image, layout, widthOverride, heightOverride, focalPoint, className, objectSettings, priority, noCaption }) {
  // Pass in custom URL builder props
  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width((widthOverride ? widthOverride : options.width) || Math.min(( widthOverride ? widthOverride : options.originalImageDimensions.width), 800))
      .quality(90)
      .fit('clip')
  };
  
  // Generate actual URL
	const imageProps = useNextSanityImage(sanity.config, image.asset, { imageBuilder: myCustomImageBuilder });

  // Generate attributes for Img component
  const attributes = {};
  if (focalPoint?.x && focalPoint?.y) {
    const { x, y } = focalPoint;
    attributes.objectPosition = `${x * 100}% ${y * 100}%`;
  }

  if (image.alt) { attributes.alt = image.alt } else { attributes.alt = 'MISSING ALT TEXT' }
  if (layout) { attributes.layout = layout } else { attributes.layout = 'responsive' }
  if (priority) { attributes.priority = true } else { attributes.priority = false }
  if (objectSettings) {attributes.objectFit = objectSettings}

	return image.overrideVideo ? (
    <div className={`image ${className} w-full h-full overflow-hidden relative ${layout == 'fill' && 'cover-image' }`}>
      <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-center w-full h-full absolute inset-0 z-10`}>
        <source src={ image.overrideVideo.asset.url } type="video/mp4" />

        Sorry. Your browser does not support the video tag.
      </video>
      
      <figure className={`image ${className} ${layout == 'fill' && 'cover-image' }`}>
        <Img {...imageProps} {...attributes} />
        
        {(image.caption && layout !== 'fill' && !noCaption) && (
          <figcaption className="text-xs mt-2">"{image.caption}"</figcaption>
        )}
      </figure>
    </div>
  )
  : (
    <figure className={`image ${className} ${layout == 'fill' && 'cover-image' }`}>
		  <Img {...imageProps} {...attributes} />
      
      {(image.caption && layout !== 'fill' && !noCaption) && (
        <figcaption className="text-xs mt-2">"{image.caption}"</figcaption>
      )}
    </figure>
	)
}
