import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
const site='https://proiaq.com/', img=name=>'./images/'+name;
const models=[
 ['PROIAQ-CM1','In-duct air purifier','PROIAQ-CMA-New.png','proiaq-cm1'],
 ['PROIAQ-TUBE','Germicidal UV light system','PROIAQ-Tube-Homepage.png','proiaq-tube'],
 ['PROIAQ-PCOPRO','Air and coil treatment system','full-PCO-PRO-rotated-1.png','proiaq-pcopro'],
 ['PROIAQ-AZ','In-duct air purifier','full-AZ-System.png','proiaq-az'],
 ['PROIAQ-AX','In-duct air purifier','full-AX.png','proiaq-ax'],
 ['PROIAQ-DUAL','Dual system','Dual-Systems.png','dual'],
 ['PROIAQ-TUBEHY2','Hybrid UV system','PROIAQ-TUBEHY2.png','tubehy2'],
 ['DefendRx Filter','HVAC filtration','DenfenderRX-Filter.png','defendrx-filter'],
 ['UV replacement lamps','UVL1 (1 year), UVL2 (2 years), UVL3 (3 years)','Replacement-Lamps-web.png','proiaq-uvl1-uvl2-uvl3'],
 ['Commercial Lamps','Commercial replacement lamps','Commercial-2-Year-Replacement-Lamps.png','commercial-lamps']];
function Arrow(){return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 5l7 7-7 7"/></svg>}
function Logo(){return <img className="logo" src={img('ProIAQ-Logo-Green-2x-New.png')} alt="ProIAQ"/>}
function ProductSlider(){
  const track=useRef(null);
  const [edges,setEdges]=useState({first:true,last:false});
  useEffect(()=>{
    const el=track.current;
    function sync(){setEdges({first:el.scrollLeft<2,last:el.scrollLeft+el.clientWidth>=el.scrollWidth-2})}
    const resize=new ResizeObserver(sync);
    resize.observe(el);
    el.addEventListener('scroll',sync,{passive:true});
    sync();
    return ()=>{resize.disconnect();el.removeEventListener('scroll',sync)};
  },[]);
  function slide(direction){
    const el=track.current;
    const step=el.children[1].offsetLeft-el.children[0].offsetLeft;
    el.scrollTo({left:(Math.round(el.scrollLeft/step)+direction)*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  return <section className="wrap" id="systems" aria-labelledby="catalogTitle">
    <div className="eyebrow">Our products</div>
    <div className="sectionHead"><h2 id="catalogTitle">Find your air system.</h2></div><div className="productFrame"><div className="catalogButtons productSides">{[-1,1].map(d=><button type="button" key={d} disabled={d<0?edges.first:edges.last} aria-controls="catalog-track" aria-label={d<0?"Previous product":"Next product"} onClick={()=>slide(d)}><Arrow/></button>)}</div>
    <div className="catalogTrack" id="catalog-track" ref={track}>{models.map(([name,type,file,path])=><a className="card" href={site+path+'/'} key={name}><div className="product"><img loading="lazy" src={img(file)} alt={name}/></div><div className="row"><h3>{name}</h3><Arrow/></div><p>{type}</p></a>)}</div>
  </div></section>;
}
function useMouseDrag() {
  useEffect(() => {
    const cleanup = [];
    for (const track of document.querySelectorAll('#catalog-track, #review-track')) {
      let start = null;
      let origin = 0;
      let dragged = false;
      const down = event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        start = event.clientX;
        origin = track.scrollLeft;
        dragged = false;
      };
      const move = event => {
        if (start === null || event.buttons !== 1) return;
        const distance = event.clientX - start;
        if (!dragged && Math.abs(distance) < 5) return;
        dragged = true;
        track.classList.add('dragging');
        track.setPointerCapture(event.pointerId);
        track.scrollLeft = origin - distance;
      };
      const end = () => {
        start = null;
        track.classList.remove('dragging');
      };
      const click = event => {
        if (dragged) {event.preventDefault(); event.stopPropagation(); dragged = false;}
      };
      const nativeDrag = event => event.preventDefault();
      track.addEventListener('pointerdown', down);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
      track.addEventListener('click', click, true);
      track.addEventListener('dragstart', nativeDrag);
      cleanup.push(() => {
        track.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
        track.removeEventListener('click', click, true);
        track.removeEventListener('dragstart', nativeDrag);
      });
    }
    return () => cleanup.forEach(remove => remove());
  }, []);
}
function App(){useMouseDrag();const [menu,setMenu]=useState(false);
return <><a className="skip" href="#main">Skip to content</a><header><a href="#" aria-label="ProIAQ home"><Logo/></a><button className="mobile" aria-expanded={menu} aria-controls="nav" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button><nav id="nav" className={menu?'shown':''} onClick={()=>setMenu(false)}><a href="#systems">Products</a><a href="#air">Indoor air quality</a><a href="#reviews">Reviews</a><a href={site+'register-product/'}>Register product</a><a className="pill" href={site+'contact/'}>Contact us <Arrow/></a></nav></header>
<main id="main"><section className="homeBanner" aria-labelledby="hero-heading">
  <img className="bannerScene" src={img('living-room-reading.jpg')} alt="A mother and daughter reading together in a sunlit living room" fetchPriority="high"/>
  <div className="bannerCopy">
    <h1 id="hero-heading">Cleaner air.<br/><em>In every room.</em></h1>
    <p>ProIAQ purifiers fit inside your central air system to treat the air throughout your home.</p>
    <a className="studioAction" href="#systems">Explore products <span><Arrow/></span></a>
  </div>
</section>
<section className="wrap overview" aria-labelledby="overview-heading">
  <h2 id="overview-heading">Whole-home air purification</h2>
  <div><p>ProIAQ’s in-duct purifiers and UV lights work inside the central HVAC system. As air circulates through the ducts, the system treats it on its way to rooms throughout your home.</p>
  <a href="https://www.youtube.com/watch?v=SdQnmkQXdJk">Watch the ProIAQ introduction <Arrow/></a></div>
</section>
<ProductSlider/>
<section id="air" className="air"><div className="wrap"><div className="eyebrow">Indoor air quality</div><h2>What’s in your air?</h2><div className="airDetails"><img loading="lazy" src={img('proiaq-air-chart.png')} alt="ProIAQ diagram grouping indoor pollutants into particulates, biological contaminants and chemicals"/><div className="airList">{[['Particulates','Dust and other airborne particles are the primary target of traditional filtration.'],['Mold & germs','UV light systems target biological contaminants inside the HVAC system.'],['Odors & VOCs','Activated in-duct purification helps address odor-causing compounds as air circulates.']].map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></div></section>
<section id="reviews" className="wrap voices" aria-labelledby="reviews-heading">
  <div className="sectionHead"><h2 id="reviews-heading">Product reviews</h2></div><div className="reviewsFrame"><div id="review-track" className="voiceRow" tabIndex="0" aria-label="Product reviews">    {[
      ['proiaq-cm1','I like that the purifier fits inside the ductwork. It leaves the floor space in our living room free.'],
      ['proiaq-tube','I wanted a UV light for the HVAC system. Seeing the replacement lamp options helped me plan for maintenance.'],
      ['proiaq-pcopro','What stood out to me was the focus on both the air and the coil in one system.']
    ].map(([model,quote])=>{
      const [name,type,photo,path]=models.find(entry=>entry[3]===model);
      return <article className="voice" key={model}>
        <img className="voicePhoto modelPhoto" src={img(photo)} alt={name} loading="lazy"/>
        <div className="voiceBody"><span className="storyLabel">Illustrative review</span><blockquote>“{quote}”</blockquote>
          <div className="voiceAuthor"><strong>{name}</strong><span>{type}</span><a href={site+path+'/'}>Product details <Arrow/></a></div>
        </div>
      </article>
    })}

  </div>
</div></section><section id="training" className="wrap contractor"><figure className="installPhoto"><img loading="lazy" width="550" height="367" src={img('tube-installation.jpg')} alt="A ProIAQ UV lamp mounted across an HVAC coil"/><figcaption>PROIAQ-TUBE installed at the coil</figcaption></figure><div><div className="eyebrow">For HVAC professionals</div><h2>Bring better air to your customers.</h2><p>Contractors can request training in installation, sales, or both. Choose a topic and a preferred weekday for your team.</p><a className="pill" href={site+'request-training/'}>Request training <Arrow/></a></div></section><section className="dualFeature" id="dual-systems" aria-labelledby="dual-title"><div className="wrap dualLayout">
  <div><div className="eyebrow">ProIAQ DUAL systems</div><h2 id="dual-title">Two systems.<br/>One installation.</h2>
  <p>Pair a CM1 or PCOPRO in-duct purifier with a UV light system. Choose HYBRID for a two-year lamp, or TUBE for one-, two-, or three-year lamp options.</p>
  <a className="pill" href={site+'dual/'}>Explore DUAL systems <Arrow/></a></div>
  <a className="dualGraphic" href={site+'dual/'} aria-label="See ProIAQ DUAL system configurations"><img src={img('Dual-Systems.png')} width="1920" height="1080" loading="lazy" alt="ProIAQ diagram showing the CM1 and PCOPRO purifier options with TUBE and HYBRID UV systems"/></a>
</div></section></main><footer className="siteFooter">
  <div className="footerInner">
    <div className="footerBrand"><a href="#main" aria-label="Back to homepage"><Logo/></a><p>Indoor air quality solutions for the whole home.</p></div>
    <div><h3>Products</h3><a href="#systems">Explore systems</a><a href="#dual-systems">DUAL systems</a><a href={site+'register-product/'}>Register a product</a></div>
    <div><h3>Resources</h3><a href="#air">Indoor air quality</a><a href="#training">Contractor training</a><a href={site+'news/'}>ProIAQ news</a></div>
    <div><h3>Contact</h3><a href={site+'contact/'}>Contact the team <Arrow/></a><a href="tel:18447764271">(844) PRO-IAQ1</a></div>
  </div>
</footer></>}
createRoot(document.getElementById('root')).render(<App/>);


















