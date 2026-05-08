import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import heroImage from './assets/hero.png'
import './App.css'

const services = [
  {
    title: 'Basic Package',
    slug: 'basic',
    price: '$200',
    session: 'Up to 2 hours',
    summary: '10 photos, 3 videos, and all high-resolution raw files delivered by your preferred method.',
    bestFor: 'Hobbies, small business needs, social media posts, and personal projects.',
    details: [
      '10 aerial photos',
      '3 aerial videos',
      'Raw high-resolution files included through your preferred delivery method',
      'One drone session up to 2 hours',
      'Flexible for hobbies, business, social media, and general content needs',
    ],
  },
  {
    title: 'Business Package',
    slug: 'business',
    price: '$350',
    session: 'Up to 3 hours',
    summary: '15 photos, 5 videos, raw files, and a working session to curate content to your needs.',
    bestFor: 'Real estate listings, business marketing, property showcases, and content campaigns.',
    details: [
      '15 aerial photos',
      '5 aerial videos',
      'Raw high-resolution files included through your preferred delivery method',
      'One drone session up to 3 hours',
      'Working session to curate the content to your needs',
    ],
  },
  {
    title: 'Premium Package',
    slug: 'premium',
    price: '$500',
    session: 'Up to 3 hours',
    summary: '20 edited photos, 7 edited videos, raw files, and a working session for the most complete content set.',
    bestFor: 'Larger properties, full brand shoots, premium listings, and deeper marketing coverage.',
    details: [
      '20 edited aerial photos',
      '7 edited aerial videos',
      'All high-resolution raw files included on a memory card',
      'One drone session up to 3 hours',
      'Working session to curate the content to your needs',
    ],
  },
]

const whySmaerialPoints = [
  'Quick turnaround for listing deadlines, launches, and social schedules',
  'Interactive, friendly service from planning through delivery',
  'High-quality aerial camera equipment for sharp, polished visuals',
  'State-of-the-art editing software for clean, professional outcomes',
  'Shot planning built around how the photos and videos will actually be used',
  'Flexible delivery options for raw files, edited assets, and marketing-ready content',
]

const customService = {
  title: 'Custom Inquiry',
  slug: 'custom',
  price: 'Negotiable',
  session: 'Built around your project',
  summary: 'A tailored package for unique shoots, custom deliverables, and negotiated pricing.',
  bestFor: 'Projects that need a tailored mix of photos, videos, editing, raw files, timing, or delivery options.',
  details: [
    'Choose the photo and video deliverables that fit your goals',
    'Request a custom mix of raw files, edited files, or marketing-ready content',
    'Plan around unique locations, deadlines, business needs, or creative ideas',
    'Pricing can be negotiated based on scope, time, editing, and delivery needs',
  ],
}

const homepagePortfolioItems = [
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

const expandedPortfolioItems = [
  {
    title: 'Portfolio Feature 1',
    text: 'Expanded aerial portfolio image.',
    image: '/images/portimg1.JPG',
  },
  {
    title: 'Portfolio Feature 2',
    text: 'Expanded aerial portfolio image.',
    image: '/images/portimg2.JPG',
  },
  {
    title: 'Portfolio Feature 3',
    text: 'Expanded aerial portfolio image.',
    image: '/images/portimg3.JPG',
  },
  {
    title: 'Portfolio Feature 4',
    text: 'Expanded aerial portfolio image.',
    image: '/images/portimg4.JPG',
  },
  ...homepagePortfolioItems,
]

const portfolioVideos = [
  {
    title: 'Aerial video 1',
    src: '/videos/vid1.mp4',
  },
  {
    title: 'Aerial video 2',
    src: '/videos/vid2.mp4',
  },
  {
    title: 'Aerial video 3',
    src: '/videos/vid3.mp4',
  },
  {
    title: 'Aerial video 4',
    src: '/videos/vid4.mp4',
  },
]

type PortfolioItem = (typeof expandedPortfolioItems)[number]
type ServicePackage = (typeof services)[number]

type LightboxImage = {
  src: string
  alt: string
}

type LightboxVideo = {
  src: string
  title: string
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
        <video
          className="lightbox-video-player"
          title={video.title}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls
        >
          <source src={video.src} type="video/mp4" />
        </video>
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
  src,
  onOpen,
}: {
  title: string
  src: string
  onOpen: (video: LightboxVideo) => void
}) {
  const hasVideo = src.trim().length > 0
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const prepareVideo = useCallback(
    (video: HTMLVideoElement) => {
      video.muted = true
      video.defaultMuted = true
      video.autoplay = true
      video.loop = true
      video.playsInline = true
      video.preload = 'auto'
      video.setAttribute('muted', '')
      video.setAttribute('autoplay', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')

      if (video.src !== new URL(src, window.location.href).href) {
        video.src = src
        video.load()
      }
    },
    [src],
  )

  const setPreviewVideo = useCallback(
    (video: HTMLVideoElement | null) => {
      videoRef.current = video

      if (!video || !hasVideo) {
        return
      }

      prepareVideo(video)
      void video.play().catch(() => {})
    },
    [hasVideo, prepareVideo],
  )

  useEffect(() => {
    const video = videoRef.current

    if (!video || !hasVideo) {
      return
    }

    const playPreview = () => {
      prepareVideo(video)
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
  }, [hasVideo, prepareVideo])

  return (
    <button
      className="portfolio-video-button"
      type="button"
      aria-label={`View larger video: ${title}`}
      onClick={() => {
        if (hasVideo) {
          onOpen({ src, title })
        }
      }}
      disabled={!hasVideo}
    >
      {hasVideo ? (
        <video
          ref={setPreviewVideo}
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
              video.defaultMuted = true
              void video.play().catch(() => {})
            }
          }}
        />
      ) : (
        <span>Add video file</span>
      )}
    </button>
  )
}

function WhySmaerialList() {
  return (
    <div className="why-list" aria-label="SMAerial advantages">
      {whySmaerialPoints.map((point) => (
        <div className="why-list-item" key={point}>
          <span aria-hidden="true">✓</span>
          <p>{point}</p>
        </div>
      ))}
    </div>
  )
}

function FreeIntroCallout() {
  return (
    <div className="free-intro-callout">
      <p className="eyebrow">Free 30-minute session</p>
      <h3>Try the service before choosing a package.</h3>
      <p>
        If you are interested in SMAerial, I offer a completely free 30-minute session so you
        can get a clear idea of whether aerial photos or videos will benefit your project. This is
        available for every prospective client at no charge, please contact me through the form below and select "Trial"!
      </p>
    </div>
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
            <a href="/">Home</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/services">Services</a>
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
          {expandedPortfolioItems.map((item) => (
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
          <p className="video-note">Note: Please left-click on the page to start all of the videos!</p>
        </div>
        <div className="portfolio-video-grid">
          {portfolioVideos.map((video) => (
            <article className="portfolio-video-card" key={video.title}>
              <PortfolioVideoTile title={video.title} src={video.src} onOpen={setActiveVideo} />
            </article>
          ))}
        </div>
      </section>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  )
}

function ServiceDetailCard({ service }: { service: ServicePackage }) {
  return (
    <div className="service-detail-card" id={service.slug}>
      <div className="service-detail-intro">
        <p className="eyebrow">{service.title}</p>
        <h2>Included in this package.</h2>
        <p>{service.bestFor}</p>
        <div className="service-detail-price">
          <span>{service.price}</span>
          <p>{service.session}</p>
        </div>
      </div>
      <ul className="service-detail-list">
        {service.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <a className="button button-primary service-cta" href={`/?package=${service.slug}#contact`}>
        Start with this package
      </a>
    </div>
  )
}

function ServicePage({ initialServiceSlug }: { initialServiceSlug?: string }) {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const targetId = hash || initialServiceSlug

    if (!targetId) {
      return
    }

    const scrollToService = () => {
      const target = document.getElementById(targetId)

      if (!target) {
        return
      }

      const targetTop = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: Math.max(targetTop - 92, 0), behavior: 'smooth' })
    }

    const scrollDelays = [0, 100, 300]
    const timers = scrollDelays.map((delay) => window.setTimeout(scrollToService, delay))

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [initialServiceSlug])

  return (
    <main className="site-shell">
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="SMAerial home">
            <span className="brand-mark">SM</span>
            <span>SMAerial</span>
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/services">Services</a>
            <a href="/#contact">Contact</a>
          </div>
        </nav>
      </header>

      <section className="service-page-hero">
        <a className="back-link" href="/#services">
          &lt;- Back to services
        </a>
        <p className="eyebrow">Service packages</p>
        <h1>Choose the aerial package that fits your project.</h1>
      </section>

      <section className="service-page-section">
        <FreeIntroCallout />
        <div className="service-detail-stack">
          {[...services, customService].map((service) => (
            <ServiceDetailCard service={service} key={service.slug} />
          ))}
        </div>
      </section>
    </main>
  )
}

function HomePage() {
  const currentYear = new Date().getFullYear()
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)
  const [showInquiryToast, setShowInquiryToast] = useState(() => {
    const wasSent = new URLSearchParams(window.location.search).has('sent')
    const pendingToast = window.sessionStorage.getItem('smaerial-inquiry-sent') === 'true'

    if (pendingToast) {
      window.sessionStorage.removeItem('smaerial-inquiry-sent')
    }

    return wasSent || pendingToast
  })
  const formReturnUrl = `${window.location.origin}/?sent=1#contact`
  const selectedPackage =
    services.find((service) => service.slug === new URLSearchParams(window.location.search).get('package'))?.title ?? ''

  const scrollToSection = useCallback((hash: string) => {
    if (hash === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(hash)

    if (!target) {
      return
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY

    if (hash === 'contact') {
      const centeredTop = targetTop - (window.innerHeight - target.offsetHeight) / 2 + 24
      const sectionTop = targetTop + 24
      window.scrollTo({ top: Math.max(Math.min(centeredTop, sectionTop), 0), behavior: 'smooth' })
      return
    }

    window.scrollTo({ top: Math.max(targetTop - 92, 0), behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('sent')) {
      window.history.replaceState(null, '', '/')
    }
  }, [])

  useEffect(() => {
    if (!showInquiryToast) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowInquiryToast(false)
    }, 5000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [showInquiryToast])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')

    if (!hash) {
      return
    }

    const scrollToHash = () => {
      scrollToSection(hash)
    }

    const scrollDelays = [0, 100, 300, 700]
    const timers = scrollDelays.map((delay) => window.setTimeout(scrollToHash, delay))

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [scrollToSection])

  const handleContactLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState(null, '', '#contact')
    scrollToSection('contact')
  }

  return (
    <main className="site-shell">
      {showInquiryToast ? (
        <div className="inquiry-toast" role="status" aria-live="polite">
          Inquiry sent. SMAerial will reach out soon!
        </div>
      ) : null}
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="SMAerial home">
            <span className="brand-mark">SM</span>
            <span>SMAerial</span>
          </a>
          <div className="nav-links">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                window.history.pushState(null, '', '#home')
                scrollToSection('home')
              }}
            >
              Home
            </a>
            <a href="/portfolio">Portfolio</a>
            <a href="/services">Services</a>
            <a href="#contact" onClick={handleContactLinkClick}>
              Contact
            </a>
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
            <a className="button button-primary" href="#contact" onClick={handleContactLinkClick}>
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

      <section id="portfolio" className="section section-contrast">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2>Photo categories real estate teams and businesses ask for most.</h2>
          </div>
        </div>
        <div className="portfolio-grid">
          {homepagePortfolioItems.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <PortfolioImageTile item={item} onOpen={setActiveImage} />
            </article>
          ))}
        </div>
        <a className="view-more-link" href="/portfolio">
          View my expanded portfolio
        </a>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Built for listings, locations, and launch-ready campaigns.</h2>
        </div>
        <FreeIntroCallout />
        <div className="service-grid">
          {services.map((service) => (
            <a className="service-card" href={`/services#${service.slug}`} key={service.title}>
              <div className="service-card-topline">
                <h3>{service.title}</h3>
              </div>
              <p>{service.summary}</p>
              <div className="service-meta">
                <span>{service.session}</span>
                <span>View details -&gt;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section about-section">
        <div>
          <p className="eyebrow">Why SMAerial</p>
          <h2>Professional, practical drone photography with the end use in mind.</h2>
        </div>
        <div className="about-content">
          <p>
            The goal is simple: give property and business owners visuals that make a location easier
            to understand and easier to market. Every shoot is planned around the angles, timing, and
            deliverables that will help the finished images work harder.
          </p>
          <WhySmaerialList />
        </div>
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

        <form
          className="contact-form"
          action="https://formsubmit.co/saipmukku@gmail.com"
          method="post"
          onSubmit={() => {
            window.sessionStorage.setItem('smaerial-inquiry-sent', 'true')
          }}
        >
          <input type="hidden" name="_subject" value="New SMAerial inquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={formReturnUrl} />
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="package">Package</label>
            <select id="package" name="package" defaultValue={selectedPackage} required>
              <option value="" disabled>
                Select a package
              </option>
              <option value="Basic Package">Basic Package</option>
              <option value="Business Package">Business Package</option>
              <option value="Premium Package">Premium Package</option>
              <option value="Custom Inquiry">Custom Inquiry</option>
              <option value="Trial">Trial</option>
            </select>
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
  const path = window.location.pathname.replace(/\/$/, '')
  const serviceSlug = path.match(/^\/services\/([^/]+)$/)?.[1]
  const selectedServiceSlug = services.find((service) => service.slug === serviceSlug)?.slug

  if (path === '/services' || selectedServiceSlug) {
    return <ServicePage initialServiceSlug={selectedServiceSlug} />
  }

  if (path === '/portfolio') {
    return <PortfolioPage />
  }

  return <HomePage />
}

export default App
