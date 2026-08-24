/*
 * Lumière design reminder: Botanical Editorial Luxury — warm ivory, Lumière Moss,
 * champagne hairlines, Cormorant Garamond + Manrope, asymmetric editorial pacing,
 * tactile botanical imagery, and slow purposeful motion.
 */
import { useEffect, useMemo, useState } from "react";
import type * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Instagram,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const assets = {
  heroVideo: "https://assets.mixkit.co/videos/33766/33766-720.mp4",
  product: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=88",
  lifestyle: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1800&q=88",
  botanical: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=1400&q=88",
  bathroom: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88",
  hair: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=88",
  longHairReference: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=88",
  mobileHero: "https://images.unsplash.com/photo-1556229010-4c3e0d2e5c9a?auto=format&fit=crop&w=1200&q=88",
  mark: "/favicon.svg",
};

const sectionImages = {
  shampooProduct: assets.product,
  hairBeauty: assets.longHairReference,
  hairMacro: assets.hair,
  hibiscus: assets.botanical,
  rosemary: assets.botanical,
  aloe: assets.bathroom,
  botanicalOils: assets.lifestyle,
  ritualApply: assets.bathroom,
  ritualMassage: assets.longHairReference,
  ritualRestore: assets.hair,
  beforeHair: assets.hair,
  afterHair: assets.longHairReference,
  lifestyleBeauty: assets.lifestyle,
  shampooHairCombination: assets.product,
  shampooCollection: assets.product,
  hairOilCollection: assets.lifestyle,
  hairMaskCollection: assets.bathroom,
  scalpSerumCollection: assets.botanical,
  hairElixirCollection: assets.hair,
  journalRitual: assets.bathroom,
  journalIngredients: assets.botanical,
  journalScalp: assets.hair,
  instagramImages: [assets.product, assets.longHairReference, assets.hair, assets.botanical, assets.bathroom, assets.lifestyle, assets.botanical, assets.product],
};

const editorialImages = sectionImages.instagramImages;
const journalImages = [sectionImages.journalRitual, sectionImages.journalIngredients, sectionImages.journalScalp];

const navLinks = [
  { label: "Shop", href: "#collection" },
  { label: "Our story", href: "#story" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Ritual", href: "#ritual" },
  { label: "Journal", href: "#journal" },
];

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
};

const products: Product[] = [
  { id: "shampoo", name: "Botanical Shampoo", category: "The signature wash", description: "A gentle botanical cleanse for long hair that feels soft, fresh, and luminous.", price: 38, image: sectionImages.shampooCollection, featured: true },
  { id: "hair-oil", name: "Golden Hair Oil", category: "Gloss and softness", description: "A light finishing oil for long lengths that catches the light without weight.", price: 46, image: sectionImages.hairOilCollection },
  { id: "hair-mask", name: "Silk Hair Mask", category: "Weekly treatment", description: "A rich, creamy veil for dry-looking lengths that need a slower kind of care.", price: 52, image: sectionImages.hairMaskCollection },
  { id: "scalp-serum", name: "Scalp Reset Serum", category: "Root care", description: "A precise dropper treatment for a calm, balanced-feeling scalp.", price: 44, image: sectionImages.scalpSerumCollection },
  { id: "hair-elixir", name: "Long-Hair Elixir", category: "Finishing touch", description: "A slim, luminous final step for smooth ends and soft movement.", price: 40, image: sectionImages.hairElixirCollection },
];

const ingredients = [
  { name: "Hibiscus", kicker: "Nourish", text: "Fresh red petals bring a soft botanical note to the washing ritual.", image: sectionImages.hibiscus },
  { name: "Rosemary", kicker: "Awaken", text: "Aromatic green branches bring freshness to the scalp-care ritual.", image: sectionImages.rosemary },
  { name: "Aloe", kicker: "Soothe", text: "Translucent aloe gel keeps the lather feeling light and calm.", image: sectionImages.aloe },
  { name: "Botanical oils", kicker: "Restore", text: "Golden plant oils add slip, softness, and a luminous finish to lengths.", image: sectionImages.botanicalOils },
];

const ritualSteps = [
  { number: "01", title: "Apply", text: "Warm a small amount of product in your palms and work gently through the scalp and lengths.", image: sectionImages.ritualApply },
  { number: "02", title: "Massage", text: "Use the pads of your fingers to massage the scalp with a slow, grounding touch.", image: sectionImages.ritualMassage },
  { number: "03", title: "Restore", text: "Let freshly washed lengths fall freely into their natural shine and soft movement.", image: sectionImages.ritualRestore },
];

const journalArticles = [
  { label: "Ritual notes", title: "How to build a healthier hair ritual", image: journalImages[0], read: "5 min read" },
  { label: "Botanical index", title: "The ingredients your hair loves", image: journalImages[1], read: "4 min read" },
  { label: "Root care", title: "Why scalp care is the foundation", image: journalImages[2], read: "6 min read" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".js-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} href="#top" aria-label="Lumière Haircare home">
      <img src={assets.mark} alt="" className="brand-mark" />
      <span className="brand-wordmark">Lumière</span>
      {!compact && <span className="brand-submark">Haircare</span>}
    </a>
  );
}

function ChapterLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`chapter-label ${light ? "chapter-label--light" : ""}`}>
      <span className="chapter-number">{number}</span>
      <span className="chapter-rule" />
      <span>{children}</span>
    </div>
  );
}

function ArrowButton({ children, onClick, dark = false, type = "button" }: { children: React.ReactNode; onClick?: () => void; dark?: boolean; type?: "button" | "submit" }) {
  return (
    <button type={type} className={`arrow-button ${dark ? "arrow-button--dark" : ""}`} onClick={onClick}>
      <span>{children}</span>
      <ArrowUpRight size={15} strokeWidth={1.5} />
    </button>
  );
}

function CartDrawer({ cartItems, open, onClose, onRemove, onQuantity }: { cartItems: { product: Product; quantity: number }[]; open: boolean; onClose: () => void; onRemove: (id: string) => void; onQuantity: (id: string, delta: number) => void }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <>
      <div className={`drawer-backdrop ${open ? "is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`cart-drawer ${open ? "is-open" : ""}`} aria-label="Shopping bag" aria-hidden={!open}>
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Your edit</span>
            <h2>Your bag <span className="bag-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></h2>
          </div>
          <button className="icon-button icon-button--dark" onClick={onClose} aria-label="Close shopping bag"><X size={19} /></button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-bag">
            <div className="empty-bag-mark"><ShoppingBag size={25} strokeWidth={1.1} /></div>
            <h3>A quieter kind of luxury.</h3>
            <p>Your bag is waiting for the first piece of your ritual.</p>
            <ArrowButton dark onClick={() => { onClose(); scrollToId("collection"); }}>Explore the collection</ArrowButton>
          </div>
        ) : (
          <>
            <div className="bag-items">
              {cartItems.map(({ product, quantity }) => (
                <div className="bag-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="bag-item-copy">
                    <span className="eyebrow">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="bag-item-bottom">
                      <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                        <button onClick={() => onQuantity(product.id, -1)} aria-label={`Decrease ${product.name} quantity`}><Minus size={12} /></button>
                        <span>{quantity}</span>
                        <button onClick={() => onQuantity(product.id, 1)} aria-label={`Increase ${product.name} quantity`}><Plus size={12} /></button>
                      </div>
                      <span className="bag-price">${product.price * quantity}</span>
                    </div>
                    <button className="remove-button" onClick={() => onRemove(product.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-summary">
              <div className="summary-row"><span>Subtotal</span><strong>${subtotal}</strong></div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button className="checkout-button" onClick={() => toast.success("Checkout is ready for your connected commerce setup.")}>Proceed to checkout <ArrowRight size={16} /></button>
              <div className="drawer-service"><Truck size={15} /> Complimentary shipping on orders over $75</div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function ProductModal({ product, onClose, onAdd }: { product: Product | null; onClose: () => void; onAdd: (product: Product) => void }) {
  if (!product) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close icon-button icon-button--dark" onClick={onClose} aria-label="Close product details"><X size={19} /></button>
        <div className="modal-image"><img src={product.image} alt={product.name} /></div>
        <div className="modal-copy">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="modal-price">${product.price} <span>50 ml / 1.7 fl oz</span></p>
          <p>{product.description} Designed for the everyday moment when care becomes a way of coming back to yourself.</p>
          <div className="modal-details"><div><Sparkles size={16} /> Botanical blend</div><div><Package size={16} /> Thoughtfully made</div></div>
          <button className="checkout-button" onClick={() => { onAdd(product); onClose(); }}>Add to bag <ArrowRight size={16} /></button>
          <button className="modal-link" onClick={onClose}>Back to collection</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [sliderPosition, setSliderPosition] = useState(54);
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const routeTarget: Record<string, string> = { "/shop": "collection", "/product": "featured", "/about": "story", "/ingredients": "ingredients", "/ritual": "ritual", "/journal": "journal" };
    if (location === "/cart") {
      setCartOpen(true);
      return;
    }
    const target = routeTarget[location];
    if (target) window.setTimeout(() => scrollToId(target), 60);
  }, [location]);

  const featuredProduct = useMemo(() => products.find((product) => product.featured)!, []);

  function addToBag(product: Product) {
    setCartItems((current) => {
      const exists = current.find((item) => item.product.id === product.id);
      return exists
        ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to your bag.`);
    setCartOpen(true);
  }

  function changeQuantity(id: string, delta: number) {
    setCartItems((current) => current.flatMap((item) => item.product.id !== id ? [item] : item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []));
  }

  function submitNewsletter(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter an email address to join the ritual.");
      return;
    }
    toast.success("You’re on the list. Look for a little more beauty soon.");
    setEmail("");
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <button className="mobile-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="header-action" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={18} strokeWidth={1.5} /></button>
            <button className="header-action account-action" onClick={() => toast("Account access will be available with your connected commerce setup.")} aria-label="Account"><CircleUserRound size={18} strokeWidth={1.5} /></button>
            <button className="header-action bag-action" onClick={() => setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={18} strokeWidth={1.5} /><span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-top"><BrandMark compact /><button className="icon-button icon-button--light" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <nav>{navLinks.map((link, index) => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={16} /></a>)}</nav>
        <div className="mobile-menu-foot"><span>Follow the ritual</span><div><Instagram size={17} /><span>@lumiere.haircare</span></div></div>
      </div>

      <main>
        <section className="hero" id="top">
          <video className="hero-video hero-video--desktop" autoPlay muted loop playsInline aria-label="Lumière desktop shampoo campaign video" onError={(event) => { event.currentTarget.style.display = "none"; }}><source src={assets.heroVideo} type="video/mp4" /></video>
          <div className="hero-mobile-image" role="img" aria-label="Lumière nourishing shampoo bottle with botanical extracts" style={{ backgroundImage: `url(${assets.mobileHero})` }} />
          <div className="hero-fallback" style={{ backgroundImage: `url(${assets.product})` }} />
          <div className="hero-shade" />
          <div className="mobile-hero-content">
            <span className="eyebrow">Botanical shampoo / 300 ml</span>
            <h1>Nourish <em>long hair.</em></h1>
            <p>Botanical shampoo. Natural shine.</p>
            <div className="mobile-hero-actions">
              <button className="solid-button" onClick={() => scrollToId("collection")}>Shop shampoo <ArrowRight size={14} /></button>
              <button className="mobile-hero-link" onClick={() => scrollToId("story")}>Discover the ritual <ArrowRight size={14} /></button>
            </div>
          </div>
          <div className="hero-foot"><span>Scroll to discover</span><span className="hero-scroll-line" /></div>
        </section>

        <section className="intro section-ivory">
          <div className="intro-aside js-reveal"><span className="vertical-word">LUMIÈRE / 2026</span><div className="contour-mark" /></div>
          <div className="intro-copy js-reveal"><ChapterLabel number="02">The art of hair care</ChapterLabel><h2>Nature,<br /><em>refined.</em></h2><p>A modern hair-care ritual inspired by nature and elevated through thoughtful formulation. We make room for the small, steady gestures that return you to yourself.</p><button className="text-button" onClick={() => scrollToId("story")}>Meet Lumière <ArrowRight size={14} /></button></div>
          <div className="intro-media js-reveal"><img src={sectionImages.hairBeauty} alt="Woman with exceptionally long healthy hair flowing in warm botanical light" loading="lazy" /><span className="image-caption">Long hair, luminous / 01</span></div>
        </section>

        <section className="featured section-ivory" id="featured">
          <div className="section-heading js-reveal"><div><ChapterLabel number="03">The signature ritual</ChapterLabel><h2>The ritual begins <em>here.</em></h2></div><p>One considered formula to bring softness, shine, and a little more light to the everyday.</p></div>
          <div className="featured-grid">
            <div className="featured-image-wrap js-reveal"><div className="featured-image"><img src={sectionImages.shampooProduct} alt="Lumière emerald glass shampoo bottle with gold pump on a marble pedestal" loading="lazy" /></div><div className="floating-stamp"><span>Botanical</span><strong>01</strong><span>Shampoo</span></div></div>
            <div className="featured-copy js-reveal"><span className="eyebrow">Botanical shampoo / 300 ml</span><h3>For hair that catches the light.</h3><p>A gentle botanical cleanse for long hair that feels fresh at the roots, soft through the lengths, and luminous in the light.</p><div className="product-meta"><span>${featuredProduct.price}</span><span className="meta-dot" /><span>Made for daily ritual</span></div><div className="product-actions"><button className="solid-button" onClick={() => addToBag(featuredProduct)}>Add to bag <ShoppingBag size={15} /></button><button className="text-button" onClick={() => setActiveProduct(featuredProduct)}>View details <ArrowUpRight size={14} /></button></div><div className="product-note"><Check size={15} /> Conscious formulation, no unnecessary extras.</div></div>
          </div>
        </section>

        <section className="benefits section-moss">
          <div className="benefits-header js-reveal"><ChapterLabel number="04" light>Why Lumière</ChapterLabel><h2>Beauty that begins<br /><em>at the root.</em></h2></div>
          <div className="benefits-grid">{[
            ["01", "Nourishes", "Deeply nourishes dry and stressed-looking hair."],
            ["02", "Strengthens", "Supports stronger, healthier-looking strands."],
            ["03", "Restores", "Helps restore softness, shine, and manageability."],
            ["04", "Protects", "Helps protect hair from everyday environmental stress."],
          ].map(([number, title, text]) => <div className="benefit-item js-reveal" key={title}><span className="benefit-number">{number}</span><div className="benefit-icon"><Sparkles size={19} strokeWidth={1.1} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>

        <section className="ingredients section-ivory" id="ingredients">
          <div className="section-heading ingredients-heading js-reveal"><div><ChapterLabel number="05">The botanical index</ChapterLabel><h2>Powered by <em>nature.</em></h2></div><p>Nothing ornamental. Every botanical has a place in the ritual, chosen for the feeling it leaves behind.</p></div>
          <div className="ingredient-shelf">{ingredients.map((ingredient, index) => <article className="ingredient-card js-reveal" key={ingredient.name}><div className="ingredient-image"><img src={ingredient.image} alt={`${ingredient.name} botanical ingredient`} loading="lazy" /><span>0{index + 1}</span></div><div className="ingredient-copy"><span className="eyebrow">{ingredient.kicker}</span><h3>{ingredient.name}</h3><p>{ingredient.text}</p></div></article>)}</div>
          <div className="shelf-footer"><span>Swipe to explore the index</span><div className="shelf-arrows"><button aria-label="Previous ingredient"><ChevronLeft size={17} /></button><button aria-label="Next ingredient"><ChevronRight size={17} /></button></div></div>
        </section>

        <section className="story-image" id="story">
          <img src={sectionImages.lifestyleBeauty} alt="Woman with beautiful healthy long hair in a sophisticated sunlit botanical environment" loading="lazy" />
          <div className="story-shade" /><div className="story-copy js-reveal"><ChapterLabel number="06" light>A slower kind of beauty</ChapterLabel><h2>A ritual worth<br /><em>slowing down for.</em></h2><ArrowButton onClick={() => scrollToId("ritual")}>Explore the ritual</ArrowButton></div><span className="image-caption image-caption--light">Lumière / The everyday, elevated</span>
        </section>

        <section className="ritual section-ivory" id="ritual">
          <div className="section-heading js-reveal"><div><ChapterLabel number="07">Your daily hair ritual</ChapterLabel><h2>Three steps.<br /><em>One reset.</em></h2></div><p>A few considered minutes can change the feeling of the whole day. Keep it simple. Let it linger.</p></div>
          <div className="ritual-grid">{ritualSteps.map((step) => <article className="ritual-card js-reveal" key={step.number}><div className="ritual-image"><img src={step.image} alt={`${step.title} step in the Lumière hair ritual`} loading="lazy" /><span>{step.number}</span></div><div className="ritual-copy"><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        </section>

        <section className="transformation section-sand">
          <div className="transformation-heading js-reveal"><ChapterLabel number="08">The before / after</ChapterLabel><h2>See the difference<br /><em>in your ritual.</em></h2><p>Slide slowly between the before and after texture studies. A reminder that beautiful change can be quiet.</p></div>
          <div className="comparison js-reveal" style={{ "--split": `${sliderPosition}%` } as React.CSSProperties} onPointerMove={(event) => { if (event.buttons === 1) { const rect = event.currentTarget.getBoundingClientRect(); setSliderPosition(Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100))); } }}>
            <img className="comparison-after" src={sectionImages.afterHair} alt="After texture study: healthy smooth long hair with natural shine" loading="lazy" /><div className="comparison-before"><img src={sectionImages.beforeHair} alt="Before texture study: dry-looking long hair with less shine" loading="lazy" /></div><div className="comparison-divider"><span><ArrowLeft size={13} /><ArrowRight size={13} /></span></div><span className="comparison-label comparison-label--before">Before</span><span className="comparison-label comparison-label--after">After</span><input className="comparison-range" aria-label="Compare before and after texture studies" type="range" min="8" max="92" value={sliderPosition} onChange={(event) => setSliderPosition(Number(event.target.value))} />
          </div>
        </section>

        <section className="standard section-moss">
          <div className="standard-mark"><img src={assets.mark} alt="" /></div>
          <div className="standard-copy js-reveal"><ChapterLabel number="09" light>The Lumière standard</ChapterLabel><blockquote>“Care should feel like a return to yourself.”</blockquote><p>We believe in thoughtful formulations, beautiful materials, and the kind of consistency that makes a daily ritual worth keeping.</p><button className="text-button text-button--light" onClick={() => scrollToId("story")}>Our point of view <ArrowRight size={14} /></button></div>
          <div className="standard-aside js-reveal"><span>Botanical</span><span>Considered</span><span>Conscious</span></div>
        </section>

        <section className="collection section-ivory" id="collection">
          <div className="section-heading js-reveal"><div><ChapterLabel number="10">The collection</ChapterLabel><h2>Make room for<br /><em>your ritual.</em></h2></div><button className="text-button" onClick={() => toast("All products are shown in this curated edit.")}>View all products <ArrowRight size={14} /></button></div>
          <div className="collection-grid">{products.map((product, index) => <article className={`product-card product-card--${index + 1} js-reveal`} key={product.id}><button className="product-card-image" onClick={() => setActiveProduct(product)} aria-label={`Quick view ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /><span className="quick-view">Quick view <ArrowUpRight size={13} /></span></button><div className="product-card-copy"><div><span className="eyebrow">0{index + 1} / {product.category}</span><h3>{product.name}</h3></div><span className="product-card-price">${product.price}</span></div><p>{product.description}</p><button className="card-add" onClick={() => addToBag(product)}>Add to bag <Plus size={14} /></button></article>)}</div>
        </section>

        <section className="brand-story section-sand">
          <div className="brand-story-media js-reveal"><img src={sectionImages.shampooHairCombination} alt="Woman with long healthy hair beside a subtly placed Lumière shampoo bottle in a warm stone setting" loading="lazy" /><span className="image-caption">Made for modern washes / 11</span></div>
          <div className="brand-story-copy js-reveal"><ChapterLabel number="11">Rooted in nature</ChapterLabel><h2>Created for<br /><em>modern rituals.</em></h2><p>We look to the garden, the apothecary, and the quiet intelligence of the natural world. Then we refine. Lumière is botanical inspiration shaped into a premium hair ritual for the pace of now.</p><p>Conscious beauty is not a compromise. It is choosing less, making it matter, and leaving room for the senses.</p><button className="text-button" onClick={() => toast("Our story is being written with intention.")}>Read our story <ArrowRight size={14} /></button></div>
        </section>

        <section className="journal section-ivory" id="journal">
          <div className="section-heading js-reveal"><div><ChapterLabel number="12">Notes from Lumière</ChapterLabel><h2>The <em>journal.</em></h2></div><button className="text-button" onClick={() => toast("The journal is opening soon.")}>Read all notes <ArrowRight size={14} /></button></div>
          <div className="journal-grid">{journalArticles.map((article, index) => <article className={`journal-card journal-card--${index + 1} js-reveal`} key={article.title}><button onClick={() => toast("This journal note is coming soon.")}><div className="journal-image"><img src={article.image} alt="" loading="lazy" /><span className="journal-arrow"><ArrowUpRight size={18} /></span></div><div className="journal-card-copy"><span className="eyebrow">{article.label} / {article.read}</span><h3>{article.title}</h3><span className="read-link">Read note <ArrowRight size={14} /></span></div></button></article>)}</div>
        </section>

        <section className="gallery section-ivory">
          <div className="gallery-heading js-reveal"><ChapterLabel number="13">A little more beauty</ChapterLabel><h2>Follow the <em>ritual.</em></h2><a href="https://instagram.com" target="_blank" rel="noreferrer">@lumiere.haircare <ArrowUpRight size={14} /></a></div>
          <div className="gallery-grid">{editorialImages.map((image, index) => <a className={`gallery-tile gallery-tile--${index + 1} js-reveal`} href="https://instagram.com" target="_blank" rel="noreferrer" key={`${image}-${index}`}><img src={image} alt={`Lumière ritual detail ${index + 1}`} loading="lazy" /><span><Instagram size={17} /></span></a>)}</div>
        </section>

        <section className="newsletter section-ivory">
          <div className="newsletter-inner js-reveal"><div><ChapterLabel number="14">The Lumière letter</ChapterLabel><h2>A little more beauty<br /><em>in your inbox.</em></h2></div><div className="newsletter-form-wrap"><p>Join our community for rituals, botanical insights, new launches, and the occasional thoughtful offer.</p><form onSubmit={submitNewsletter}><label className="sr-only" htmlFor="email">Enter your email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" /><button type="submit" aria-label="Join the newsletter"><ArrowRight size={18} /></button></form><span className="privacy-copy">By joining, you agree to our privacy policy. No noise, just the good parts.</span></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><div className="footer-brand"><BrandMark /><p>A botanical hair ritual for modern light.</p><a href="mailto:hello@lumierehaircare.com">hello@lumierehaircare.com <ArrowUpRight size={13} /></a></div><div className="footer-column"><span className="footer-label">Shop</span><a href="#collection">All products</a><a href="#featured">Botanical shampoo</a><a href="#collection">Hair treatments</a><a href="#collection">New arrivals</a></div><div className="footer-column"><span className="footer-label">Explore</span><a href="#story">Our story</a><a href="#ingredients">Ingredients</a><a href="#ritual">Ritual</a><a href="#journal">Journal</a></div><div className="footer-column"><span className="footer-label">Help</span><a href="mailto:hello@lumierehaircare.com">Contact</a><a href="#top" onClick={(event) => { event.preventDefault(); toast("Shipping details will be available at checkout."); }}>Shipping</a><a href="#top" onClick={(event) => { event.preventDefault(); toast("Returns are being prepared for launch."); }}>Returns</a><a href="#top" onClick={(event) => { event.preventDefault(); toast("FAQs are coming soon."); }}>FAQ</a></div><div className="footer-column footer-follow"><span className="footer-label">Follow</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13} /></a><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest <ArrowUpRight size={13} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 Lumière Haircare. All rights reserved.</span><div><a href="#top">Privacy policy</a><a href="#top">Terms &amp; conditions</a></div><span className="footer-end-mark"><img src={assets.mark} alt="" /></span></div>
      </footer>

      <div className={`search-overlay ${searchOpen ? "is-open" : ""}`}><button className="search-close icon-button icon-button--dark" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={19} /></button><div className="search-inner"><span className="eyebrow">Search Lumière</span><input autoFocus={searchOpen} placeholder="What are you looking for?" onKeyDown={(event) => { if (event.key === "Enter") { toast("Search is ready for your connected commerce setup."); setSearchOpen(false); } }} /><span className="search-hint">Press enter to explore</span></div></div>
      <CartDrawer cartItems={cartItems} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={(id) => setCartItems((current) => current.filter((item) => item.product.id !== id))} onQuantity={changeQuantity} />
      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onAdd={addToBag} />
    </div>
  );
}
