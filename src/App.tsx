import { useEffect, useRef, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import heroImage from './assets/hero.png'
import './App.css'

const services = [
  {
    title: 'Residential Listings',
    text: 'Exterior aerial photography that shows lot size, curb appeal, roof lines, pools, acreage, and neighborhood context.',
  },
  {
    title: 'Commercial Properties',
    text: 'Clean overhead and angled views for offices, retail centers, job sites, venues, and business locations.',
  },
  {
    title: 'Marketing Packages',
    text: 'Photo sets sized for MLS, websites, social media, flyers, and investor presentations.',
  },
]

const portfolioItems = [
  {
    title: 'Scenic & Lifestyle',
    text: 'Hero angles for property marketing, social media, and brand storytelling that show the whole place and the lifestyle it offers.',
    image: '/images/homepageimg1.JPG',
  },
  {
    title: 'Real Estate & Homes',
    text: 'Hero shots and supporting angles that show the whole property, the lot, and the neighborhood context for residential listings.',
    image: '/images/homepageimg2.JPG',
  },
  {
    title: 'Surroundings & Nature',
    text: 'Location-focused imagery for business owners and leasing teams that want to show the environment and natural features.',
    image: '/images/homepageimg3.JPG',
  },
  {
    title: 'Perspective',
    text: 'All-encompassing views that capture the essence of each location.',
    image: '/images/homepageimg4.JPG',
  },
]

const portfolioVideos = [
  {
    title: 'Aerial video 1',
    playbackId: 'R02Yp011LtG1bUkTIkmnX011cXYVv02WlMIUbhdM9MPRNPk',
  },
  {
    title: 'Aerial video 2',
    playbackId: 'k5lLII3mNyFpGUnUPFNjdepNl02wg3BaHoUuNYc00vXBY',
  },
  {
    title: 'Aerial video 3',
    playbackId: 'jchZ1bzM00gKlzv9WweXESxjqKDMIzzvOqVZLRYWo828',
  },
  {
    title: 'Aerial video 4',
    playbackId: 'M5Hws2Czs65x1svc2so3y8uzsYdXPFJ7GrgPfW6FVnM',
  },
]

type PortfolioItem = (typeof portfolioItems)[number]

type LightboxImage = {
  src: string
  alt: string
}

type LightboxVideo = {
  playbackId: string
  title: string
}

function getMuxStreamUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8?max_resolution=1080p&rendition_order=desc`
}

function ImageLightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  if (!image) {
    return null
  }

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded portfolio image">
      <button className="lightbox-backdrop" type="button" aria-label="Close image preview" onClick={onClose} />
      <div className="lightbox-panel">
        <button className="lightbox-close" type="button" aria-label="Close image preview" onClick={onClose}>
          Close
        </button>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  )
}

function VideoLightbox({ video, onClose }: { video: LightboxVideo | null; onClose: () => void }) {
  if (!video) {
    return null
  }

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded portfolio video">
      <button className="lightbox-backdrop" type="button" aria-label="Close video preview" onClick={onClose} />
      <div className="lightbox-panel">
        <button className="lightbox-close" type="button" aria-label="Close video preview" onClick={onClose}>
          Close
        </button>
        <MuxPlayer
          className="lightbox-video-player"
          playbackId={video.playbackId}
          title={video.title}
          videoTitle={video.title}
          streamType="on-demand"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          maxResolution="1080p"
          maxAutoResolution="1080p"
          renditionOrder="desc"
        />
      </div>
    </div>
  )
}

function PortfolioImageTile({
  item,
  variant = 'home',
  onOpen,
}: {
  item: PortfolioItem
  variant?: 'home' | 'expanded'
  onOpen: (image: LightboxImage) => void
}) {
  const alt = `${item.title} aerial photography`

  return (
    <button
      className={`portfolio-image-button ${variant === 'expanded' ? 'portfolio-image-button-expanded' : ''}`}
      type="button"
      onClick={() => onOpen({ src: item.image, alt })}
      aria-label={`View larger image: ${item.title}`}
    >
      <img className="portfolio-image" src={item.image} alt={alt} />
    </button>
  )
}

function PortfolioVideoTile({
  title,
  playbackId,
  onOpen,
}: {
  title: string
  playbackId: string
  onOpen: (video: LightboxVideo) => void
}) {
  const hasPlaybackId = playbackId.trim().length > 0
  const streamUrl = hasPlaybackId ? getMuxStreamUrl(playbackId) : ''
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video || !hasPlaybackId) {
      return
    }

    const playPreview = () => {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      void video.play().catch(() => {})
    }

    playPreview()
    video.addEventListener('loadedmetadata', playPreview)
    video.addEventListener('loadeddata', playPreview)
    video.addEventListener('canplay', playPreview)
    video.addEventListener('canplaythrough', playPreview)
    video.addEventListener('playing', playPreview)
    video.addEventListener('pause', playPreview)
    window.addEventListener('load', playPreview)
    document.addEventListener('visibilitychange', playPreview)

    const retryPlayback = window.setInterval(() => {
      if (video.paused) {
        playPreview()
      }
    }, 750)

    const stopRetrying = window.setTimeout(() => {
      window.clearInterval(retryPlayback)
    }, 10000)

    return () => {
      window.clearInterval(retryPlayback)
      window.clearTimeout(stopRetrying)
      video.removeEventListener('loadedmetadata', playPreview)
      video.removeEventListener('loadeddata', playPreview)
      video.removeEventListener('canplay', playPreview)
      video.removeEventListener('canplaythrough', playPreview)
      video.removeEventListener('playing', playPreview)
      video.removeEventListener('pause', playPreview)
      window.removeEventListener('load', playPreview)
      document.removeEventListener('visibilitychange', playPreview)
    }
  }, [hasPlaybackId, streamUrl])

  return (
    <button
      className="portfolio-video-button"
      type="button"
      aria-label={`View larger video: ${title}`}
      onClick={() => {
        if (hasPlaybackId) {
          onOpen({ playbackId, title })
        }
      }}
      disabled={!hasPlaybackId}
    >
      {hasPlaybackId ? (
        <video
          ref={videoRef}
          className="portfolio-video-player"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={title}
          onCanPlay={() => {
            const video = videoRef.current
            if (video) {
              video.muted = true
              void video.play().catch(() => {})
            }
          }}
        >
          <source src={streamUrl} type="application/x-mpegURL" />
        </video>
      ) : (
        <span>Add Mux playback ID</span>
      )}
    </button>
  )
}

function PortfolioPage() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)
  const [activeVideo, setActiveVideo] = useState<LightboxVideo | null>(null)

  return (
    <main className="site-shell">
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="SMAerial home">
            <span className="brand-mark">SM</span>
            <span>SMAerial</span>
          </a>
          <div className="nav-links">
            <a href="/#services">Services</a>
            <a href="/#portfolio">Portfolio</a>
            <a href="/#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section className="portfolio-page-hero">
        <a className="back-link" href="/">
          &lt;- Back home
        </a>
        <p className="eyebrow">Full portfolio</p>
        <h1>Photo and video work for properties, businesses, and places worth seeing from above.</h1>
      </section>

      <section className="portfolio-page-section">
        <div className="section-heading">
          <p className="eyebrow">Photo</p>
          <h2>Aerial photography</h2>
        </div>
        <div className="expanded-portfolio-grid">
          {portfolioItems.map((item) => (
            <article className="expanded-portfolio-card" key={item.title}>
              <PortfolioImageTile item={item} variant="expanded" onOpen={setActiveImage} />
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-page-section video-section">
        <div className="section-heading">
          <p className="eyebrow">Video</p>
          <h2>Aerial video</h2>
          <p className="video-note">Note: Please left-click to start the videos!</p>
        </div>
        <div className="portfolio-video-grid">
          {portfolioVideos.map((video) => (
            <article className="portfolio-video-card" key={video.title}>
              <PortfolioVideoTile title={video.title} playbackId={video.playbackId} onOpen={setActiveVideo} />
            </article>
          ))}
        </div>
      </section>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  )
}

function HomePage() {
  const currentYear = new Date().getFullYear()
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)

  return (
    <main className="site-shell">
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="SMAerial home">
            <span className="brand-mark">SM</span>
            <span>SMAerial</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Drone photography for property marketing</p>
          <h1>Aerial visuals that help buyers, tenants, and customers see the whole place.</h1>
          <p className="hero-lede">
            I create polished drone photography for real estate professionals and business
            owners who need listing-ready images, stronger marketing, and a simple way to start a
            project.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#contact">
              Request a Shoot
            </a>
            <a className="button button-secondary" href="#portfolio">
              View Work
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Aerial photography preview">
          <div className="photo-frame photo-frame-large">
            <img className="frame-image" src="/images/drone.png" alt="Drone photography preview" />
          </div>
          <img className="brand-device" src={heroImage} alt="" aria-hidden="true" />
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Built for listings, locations, and launch-ready campaigns.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section section-contrast">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2>Photo categories real estate teams and businesses ask for most.</h2>
          </div>
          <p>
            Replace these sample panels with your strongest finished shoots as the portfolio grows.
            The layout is ready for real aerial images.
          </p>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <PortfolioImageTile item={item} onOpen={setActiveImage} />
            </article>
          ))}
        </div>
        <a className="view-more-link" href="/portfolio">
          View more -&gt;
        </a>
      </section>

      <section className="section about-section">
        <div>
          <p className="eyebrow">Why SMAerial</p>
          <h2>Professional, practical drone photography with the end use in mind.</h2>
        </div>
        <p>
          The goal is simple: give property and business owners visuals that make a location easier
          to understand and easier to market. Every shoot is planned around the angles, timing, and
          deliverables that will help the finished images work harder.
        </p>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <div>
            <p className="eyebrow">Start a project</p>
            <h2>Tell me what you need photographed.</h2>
            <p>
              Share the property address, desired turnaround, and where the images will be used. I’ll
              follow up with availability, pricing, and any details needed before the flight.
            </p>
          </div>
          <img className="contact-portrait" src="/images/portrait.jpeg" alt="SMAerial drone photographer" />
        </div>

        <form className="contact-form" action="https://formsubmit.co/saipmukku@gmail.com" method="post">
          <input type="hidden" name="_subject" value="New SMAerial inquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Project details</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Property type, location, deadline, and how the images will be used"
              required
            />
          </div>
          <button type="submit">Send Inquiry</button>
        </form>
      </section>

      <footer className="footer">
        <span>SMAerial</span>
        <span>Drone photography for real estate and business marketing.</span>
        <span>&copy; {currentYear}</span>
      </footer>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </main>
  )
}

function App() {
  if (window.location.pathname === '/portfolio') {
    return <PortfolioPage />
  }

  return <HomePage />
}

export default App
