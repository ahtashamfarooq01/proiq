import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const SITE = 'https://proiaq.com/';
const img = name => './images/' + name;
const PHONE = '(844) PRO-IAQ1';
const TEL = 'tel:+18447764271';
const LINE_CARD = SITE + 'wp-content/uploads/2026/08/PRODUCT-LINE-CARD-07.27.2026-3.pdf';

const PRODUCTS = [
  {name: 'PROIAQ-CM1', tag: 'The singular, cost-effective IAQ solution', file: 'PROIAQ-CMA-New.png', path: 'proiaq-cm1'},
  {name: 'PROIAQ-TUBE', tag: 'Germicidal UV light for HVAC systems', file: 'PROIAQ-Tube-Homepage.png', path: 'proiaq-tube'},
  {name: 'PROIAQ-PCOPRO', tag: 'Advanced indoor air & coil treatment system', file: 'PCOPRO-564x348-1.png', path: 'proiaq-pcopro'},
  {name: 'PROIAQ-AZ', tag: 'Purifies air throughout your home', file: 'Active-AZ.png', path: 'proiaq-az'},
  {name: 'PROIAQ-AX', tag: 'Purifies air throughout your home', file: 'PROIAQ-AX-New.png', path: 'proiaq-ax'},
  {name: 'UVL1 · UVL2 · UVL3', tag: 'Germicidal UV replacement lamps, 1, 2 or 3 years', file: 'Replacement-Lamps-web.png', path: 'proiaq-uvl1-uvl2-uvl3'},
  {name: 'Commercial lamps', tag: 'Commercial replacement lamps', file: 'Commercial-2-Year-Replacement-Lamps.png', path: 'commercial-lamps'},
  {name: 'DefendRx filter', tag: 'HVAC filtration', file: 'DenfenderRX-Filter.png', path: 'defendrx-filter'}
];

const POLLUTANTS = [
  {key: 'part', pct: 35, label: 'Particulates', body: 'Dust, pet dander, spores and dust mites. The only group a traditional filter addresses.'},
  {key: 'bio', pct: 34, label: 'Mold & germs', body: 'Mold, bacteria and viruses, on the air and on HVAC surfaces.'},
  {key: 'chem', pct: 31, label: 'Odors & VOCs', body: 'Odors and chemical vapors found in the air.'}
];

const Arrow = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const Logo = ({className = 'logo'}) => (
  <img className={className} src={img('ProIAQ-Logo-Green-2x-New.png')} width="788" height="182" alt="ProIAQ"/>
);

/* ---------- Floating header ---------- */
function Header({open, setOpen}) {
  const ref = useRef(null);
  useEffect(() => {
    let last = window.scrollY;
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const y = self.scroll();
        ref.current?.classList.toggle('hide', y > 300 && y > last && !document.body.classList.contains('lock'));
        last = y;
      }
    });
    return () => st.kill();
  }, []);
  const links = [['#how', 'How it works'], ['#air', 'Why'], ['#products', 'Products'], ['#dual', 'DUAL'], ['#pros', 'Contractors']];
  return (
    <>
      <header className="header" ref={ref}>
        <a className="brand" href="#top" aria-label="ProIAQ home"><Logo/></a>
        <nav className="nav" aria-label="Primary">
          {links.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className="btn btn-ink phone" href={TEL}>{PHONE}</a>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span/><span/></button>
      </header>
      <div id="menu" className={'menu' + (open ? ' open' : '')} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {[...links, [SITE + 'news/', 'News'], [SITE + 'contact/', 'Contact']].map(([h, l], i) => (
            <a key={h} href={h} style={{'--i': i}} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{l}</a>
          ))}
        </nav>
        <a className="btn btn-ink menu-call" href={TEL} tabIndex={open ? 0 : -1}>Call {PHONE}</a>
      </div>
    </>
  );
}

/* ---------- House diagram: air in (gray) -> ProIAQ -> clean air out (green) ---------- */
function House() {
  return (
    <svg className="house" viewBox="0 0 560 450" role="img" aria-label="Diagram of a house. Air is drawn into the air handler, treated by a ProIAQ purifier in the duct, and clean air flows out through the vents.">
      <g className="h-shell">
        <line x1="20" y1="410" x2="540" y2="410" stroke="#0f1b14" strokeWidth="5" strokeLinecap="round"/>
        <rect x="70" y="170" width="420" height="240" rx="4" fill="#fff" stroke="#0f1b14" strokeWidth="5"/>
        <polygon points="46,180 280,38 514,180" fill="#0f1b14" strokeLinejoin="round" stroke="#0f1b14" strokeWidth="8"/>
        <rect x="236" y="236" width="48" height="56" rx="3" fill="#e4f1d8" stroke="#0f1b14" strokeWidth="3"/>
        <rect x="336" y="236" width="48" height="56" rx="3" fill="#e4f1d8" stroke="#0f1b14" strokeWidth="3"/>
        <line x1="260" y1="236" x2="260" y2="292" stroke="#0f1b14" strokeWidth="2"/>
        <line x1="360" y1="236" x2="360" y2="292" stroke="#0f1b14" strokeWidth="2"/>
      </g>
      <g className="h-duct">
        <path d="M124 300 V198 H462" fill="none" stroke="#0f1b14" strokeWidth="16" strokeLinejoin="round"/>
        <path d="M470 392 H156" fill="none" stroke="#0f1b14" strokeWidth="16"/>
        <rect x="462" y="370" width="10" height="44" rx="2" fill="#0f1b14"/>
        {[200, 300, 400].map(x => <rect key={x} x={x - 16} y="204" width="32" height="9" rx="2" fill="#0f1b14"/>)}
        <rect x="88" y="298" width="72" height="106" rx="6" fill="#0f1b14"/>
        <rect x="100" y="360" width="48" height="6" rx="3" fill="#2b3d33"/>
        <rect x="100" y="372" width="48" height="6" rx="3" fill="#2b3d33"/>
      </g>
      <path className="flow flow-in" d="M466 392 H160" fill="none" stroke="#cdd5c6" strokeWidth="7" strokeLinecap="round" strokeDasharray="0 24"/>
      <path className="flow flow-out" d="M124 296 V198 H458" fill="none" stroke="#7fbb54" strokeWidth="7" strokeLinecap="round" strokeDasharray="0 24"/>
      {[200, 300, 400].map((x, i) => <circle key={x} className="puff" cx={x} cy="222" r="6" fill="#7fbb54"/>)}
      <g className="h-unit">
        <circle className="pulse" cx="124" cy="250" r="22" fill="none" stroke="#7fbb54" strokeWidth="4"/>
        <rect x="104" y="236" width="40" height="28" rx="6" fill="#7fbb54" stroke="#0f1b14" strokeWidth="4"/>
        <rect x="112" y="246" width="24" height="4" rx="2" fill="#0f1b14"/>
        <rect x="112" y="254" width="14" height="4" rx="2" fill="#0f1b14"/>
      </g>
    </svg>
  );
}

function Hero() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = s => root.current.querySelectorAll(s);
      gsap.to(q('.flow'), {strokeDashoffset: -24, duration: 0.7, ease: 'none', repeat: -1});
      gsap.fromTo(q('.pulse'), {scale: 0.7, opacity: 0.9, transformOrigin: '50% 50%'}, {scale: 1.7, opacity: 0, duration: 1.6, ease: 'power1.out', repeat: -1});
      q('.puff').forEach((el, i) => {
        gsap.timeline({repeat: -1, delay: 1.2 + i * 0.5})
          .fromTo(el, {y: 0, opacity: 0, scale: 0.6}, {y: 18, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out'})
          .to(el, {y: 70, opacity: 0, duration: 1.3, ease: 'power1.in'});
      });
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}});
      tl.from(q('.h-shell > *'), {opacity: 0, y: 24, duration: 0.7, stagger: 0.08}, 0.2)
        .from(q('.h-duct > *'), {opacity: 0, duration: 0.5, stagger: 0.04}, 0.8)
        .from(q('.h-unit'), {scale: 0, transformOrigin: '124px 250px', duration: 0.6, ease: 'back.out(2)'}, 1.1)
        .from(q('.h1 .ln'), {yPercent: 115, duration: 0.9, stagger: 0.1}, 0.1)
        .from(q('.hero-in'), {opacity: 0, y: 18, duration: 0.7, stagger: 0.1}, 0.6);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="h1">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker hero-in">Indoor air quality products for your home</p>
          <h1 id="h1" className="h1">
            <span className="mk"><span className="ln">Cleaner air</span></span>
            <span className="mk"><span className="ln">in every</span></span>
            <span className="mk"><span className="ln">room.</span></span>
          </h1>
          <p className="lede hero-in">Whole-house UV light and in-duct air purifiers that work inside your central air system, treating the air as it circulates.</p>
          <div className="actions hero-in">
            <a className="btn btn-ink" href="#products">Explore products <Arrow/></a>
            <a className="btn btn-outline" href="#how">How it works</a>
          </div>
        </div>
        <figure className="hero-art" id="how">
          <House/>
          <figcaption className="legend">
            <span><i className="d d-in"/>Air in</span>
            <span><i className="d d-pro"/>ProIAQ treats it</span>
            <span><i className="d d-out"/>Clean air out</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- Ticker ---------- */
function Ticker() {
  const ref = useRef(null);
  const words = ['In-duct purifiers', 'UV light systems', 'Hybrid UV', 'DUAL systems', 'Replacement lamps', 'DefendRx filters'];
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(ref.current, {xPercent: -50, duration: 32, ease: 'none', repeat: -1});
    });
    return () => mm.revert();
  }, []);
  const set = key => words.map(w => <span key={key + w}>{w}<b aria-hidden="true">/</b></span>);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" ref={ref}>{set('a')}{set('b')}{set('c')}{set('d')}</div>
    </div>
  );
}

/* ---------- Why: proportional bar ---------- */
function Air() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({scrollTrigger: {trigger: root.current.querySelector('.bar3'), start: 'top 82%', once: true}});
      tl.from(root.current.querySelectorAll('.seg'), {flexGrow: 0.0001, duration: 1.1, stagger: 0.15, ease: 'power3.out'})
        .from(root.current.querySelectorAll('.brk'), {opacity: 0, y: 10, duration: 0.5, stagger: 0.1}, 0.6);
      root.current.querySelectorAll('[data-count]').forEach(el => {
        const o = {v: 0};
        gsap.to(o, {v: +el.dataset.count, duration: 1.3, ease: 'power2.out', scrollTrigger: {trigger: el, start: 'top 90%', once: true}, onUpdate: () => (el.textContent = Math.round(o.v))});
      });
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="section air" id="air" ref={root} aria-labelledby="air-h">
      <div className="wrap">
        <div className="two">
          <h2 id="air-h" className="h2" data-r>Filters stop at one third.</h2>
          <p className="body" data-r>Indoor air pollution comes in three groups. Traditional filtration only handles particulates and leaves the other two thirds. ProIAQ also treats biological contaminants and neutralizes VOCs.</p>
        </div>
        <div className="brks" aria-hidden="true">
          <div className="brk" style={{flexGrow: 35}}><span>Filters alone</span></div>
          <div className="brk brk-pro" style={{flexGrow: 65}}><span>ProIAQ adds</span></div>
        </div>
        <div className="bar3" role="img" aria-label="Indoor air pollution: particulates 35%, mold and germs 34%, odors and VOCs 31%">
          {POLLUTANTS.map(p => (
            <div key={p.key} className={'seg seg-' + p.key} style={{flexGrow: p.pct}}>
              <span className="seg-label">{p.label}</span>
              <strong><span data-count={p.pct}>{p.pct}</span><small>%</small></strong>
            </div>
          ))}
        </div>
        <ul className="plist">
          {POLLUTANTS.map(p => (
            <li key={p.key} data-r><i className={'d d-' + p.key} aria-hidden="true"/><div><h3>{p.label}</h3><p>{p.body}</p></div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Products: index list with live preview ---------- */
function Products() {
  const [on, setOn] = useState(-1);
  const float = useRef(null);
  const mover = useRef(null);

  useLayoutEffect(() => {
    // Smoothly trail the cursor.
    mover.current = {
      x: gsap.quickTo(float.current, 'x', {duration: 0.5, ease: 'power3.out'}),
      y: gsap.quickTo(float.current, 'y', {duration: 0.5, ease: 'power3.out'})
    };
  }, []);

  const follow = e => mover.current && (mover.current.x(e.clientX + 28), mover.current.y(e.clientY - 120));
  // Keyboard focus: park the preview beside the row.
  const park = e => {
    const r = e.currentTarget.getBoundingClientRect();
    mover.current.x(Math.min(r.left + r.width * 0.55, innerWidth - 380));
    mover.current.y(r.top - 60);
  };

  return (
    <section className="section products" id="products" aria-labelledby="prod-h">
      <div className="wrap">
        <p className="kicker dark" data-r>Products</p>
        <h2 id="prod-h" className="h2" data-r>Find your system.</h2>
        <ul className="index" onMouseMove={follow} onMouseLeave={() => setOn(-1)}>
          {PRODUCTS.map((p, i) => (
            <li key={p.name} data-r>
              <a href={SITE + p.path + '/'} className={on === i ? 'on' : ''}
                 onMouseEnter={() => setOn(i)} onFocus={e => {setOn(i); park(e);}} onBlur={() => setOn(-1)}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="thumb"><img loading="lazy" src={img(p.file)} alt=""/></span>
                <span className="txt"><strong>{p.name}</strong></span>
                <span className="tag">{p.tag}</span>
                <span className="go"><Arrow/></span>
              </a>
            </li>
          ))}
        </ul>
        <div className={'float' + (on >= 0 ? ' open' : '')} ref={float} aria-hidden="true">
          <div className="float-in">
            {PRODUCTS.map((p, i) => <img key={p.name} className={on === i ? 'show' : ''} src={img(p.file)} alt=""/>)}
          </div>
        </div>
        <p className="also" data-r>Also: <a href={SITE + 'tubehy2/'}>PROIAQ-TUBEHY2 hybrid UV</a><a href={LINE_CARD}>Product line card (PDF)</a></p>
      </div>
    </section>
  );
}

/* ---------- DUAL ---------- */
function Dual() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current.querySelector('.dual-img'), {scale: 0.92, borderRadius: 48}, {scale: 1, borderRadius: 24, ease: 'none', scrollTrigger: {trigger: ref.current.querySelector('.dual-img'), start: 'top 95%', end: 'top 35%', scrub: true}});
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="section dual" id="dual" ref={ref} aria-labelledby="dual-h">
      <div className="wrap">
        <div className="two">
          <div>
            <p className="kicker" data-r>ProIAQ DUAL systems</p>
            <h2 id="dual-h" className="h2" data-r>Two systems. One installation.</h2>
          </div>
          <div>
            <p className="body" data-r>Pair a CM1 or PCOPRO in-duct purifier with a UV light system. Choose HYBRID for a two-year lamp that also generates hydrogen peroxide and irradiates the coil, or TUBE for 1-, 2- or 3-year lamps.</p>
            <div className="actions" data-r><a className="btn btn-green" href={SITE + 'dual/'}>Explore DUAL systems <Arrow/></a></div>
          </div>
        </div>
        <a className="dual-img" href={SITE + 'dual/'} aria-label="See ProIAQ DUAL system configurations">
          <img loading="lazy" src={img('Dual-Systems.png')} width="1920" height="1080" alt="ProIAQ DUAL configurations: CM1 or PCOPRO with a TUBE or HYBRID UV system installed at the coil"/>
        </a>
      </div>
    </section>
  );
}

/* ---------- Contractors ---------- */
function Pros() {
  return (
    <section className="section pros" id="pros" aria-labelledby="pros-h">
      <div className="wrap pros-grid">
        <div>
          <p className="kicker ink" data-r>HVAC contractors &amp; distributors</p>
          <h2 id="pros-h" className="h2" data-r>Bring better air to your customers.</h2>
          <p className="body" data-r>ProIAQ products are innovative and high quality. Licensed HVAC contractors and distributors can profit from a fast-growing market segment by promoting them.</p>
          <div className="actions" data-r>
            <a className="btn btn-ink" href={SITE + 'request-training/'}>Request training <Arrow/></a>
            <a className="btn btn-outline" href={SITE + 'register-product/'}>Register a product</a>
          </div>
        </div>
        <div className="pros-img" data-r><img loading="lazy" src={img('HVAC-Contractor.jpg')} width="612" height="408" alt="HVAC contractor servicing an air system"/></div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const social = [['Facebook', 'https://www.facebook.com/profile.php?id=61574402534021'], ['LinkedIn', 'https://www.linkedin.com/company/proformance-iaq'], ['YouTube', 'https://www.youtube.com/@PROIAQ'], ['Instagram', 'https://www.instagram.com/proformanceiaq']];
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="kicker">Questions? Call us</p>
        <a className="bigphone" href={TEL}>{PHONE}</a>
        <div className="f-grid">
          <div className="f-brand"><Logo/><p>Indoor air quality solutions for the whole home.</p></div>
          <div className="f-col"><h3>Products</h3>
            <a href={SITE + 'proiaq-cm1/'}>PROIAQ-CM1</a><a href={SITE + 'proiaq-tube/'}>PROIAQ-TUBE</a><a href={SITE + 'proiaq-pcopro/'}>PROIAQ-PCOPRO</a><a href={SITE + 'proiaq-az/'}>PROIAQ-AZ</a><a href={SITE + 'proiaq-ax/'}>PROIAQ-AX</a></div>
          <div className="f-col"><h3>Company</h3>
            <a href={SITE + 'news/'}>News</a><a href={SITE + 'register-product/'}>Register product</a><a href={SITE + 'request-training/'}>Request training</a><a href={SITE + 'contact/'}>Contact</a><a href={LINE_CARD}>Product line card</a></div>
          <div className="f-col"><h3>Follow</h3>{social.map(([n, u]) => <a key={n} href={u} rel="noopener">{n}</a>)}</div>
        </div>
        <div className="legal">© 2026 PRO IAQ.</div>
      </div>
    </footer>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('lock', open);
    const esc = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.batch('[data-r]', {
        start: 'top 90%', once: true,
        onEnter: els => gsap.fromTo(els, {opacity: 0, y: 26}, {opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', overwrite: true})
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <a className="skip" href="#products">Skip to products</a>
      <Header open={open} setOpen={setOpen}/>
      <main>
        <Hero/>
        <Ticker/>
        <Air/>
        <Products/>
        <Dual/>
        <Pros/>
      </main>
      <Footer/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
