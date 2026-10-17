"use client";
import {FormEvent,useEffect,useMemo,useState} from "react";
import offersData from "@/data/demo_offers.json";
import {Offer,rankOffers} from "@/lib/match";

const interests=["design","coffee","food","plants","home","local"];
export default function Home(){
 const [budget,setBudget]=useState(120),[deadline,setDeadline]=useState(180),[picked,setPicked]=useState<string[]>(["design"]),[submitted,setSubmitted]=useState(false),[selected,setSelected]=useState<string|null>(null),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const ranked=useMemo(()=>rankOffers({budget,deadlineMinutes:deadline,interests:picked},offersData as Offer[]),[budget,deadline,picked]);
 useEffect(()=>{document.body.dataset.hydrated="true";return()=>{delete document.body.dataset.hydrated}},[]);
 function toggle(tag:string){setPicked(v=>v.includes(tag)?v.filter(x=>x!==tag):[...v,tag]);}
 function submit(e:FormEvent){e.preventDefault();setError("");if(budget<25)return setError("Set a budget of at least $25.");if(deadline<30)return setError("Allow at least 30 minutes for local delivery.");if(!picked.length)return setError("Choose at least one interest so boutiques can curate.");setLoading(true);setTimeout(()=>{setSubmitted(true);setLoading(false);},450)}
 const choice=ranked.find(x=>x.id===selected);
 return <main>
  <nav><a className="brand" href="#top"><span>G</span>GiftRelay</a><p>ATX · Demo market <i/></p></nav>
  <section className="hero" id="top"><div><p className="kicker">LOCAL TASTE. URGENT DELIVERY.</p><h1>One brief.<br/><em>Real gifts,</em> today.</h1><p className="lede">Tell local boutiques who it’s for, not what to search. Get photographed, gift-ready options delivered before the moment.</p><a className="jump" href="#brief">Post an urgent brief ↓</a></div><aside><small>LIVE DEMO WINDOW</small><strong>4</strong><p>boutique proposals ready</p><div><b>42 min</b><span>fastest arrival</span></div></aside></section>
  <section className="how"><p>01 / BRIEF</p><p>02 / BOUTIQUES CURATE</p><p>03 / YOU CHOOSE</p><p>04 / COURIER DELIVERS</p></section>
  <section className="workspace" id="brief"><form onSubmit={submit} noValidate><p className="kicker">URGENT BRIEF · FICTIONAL DATA</p><h2>Who are we delighting?</h2><label>Gift budget <span>${budget}</span><input aria-label="Gift budget" type="range" min="25" max="300" step="5" value={budget} onChange={e=>setBudget(Number(e.target.value))}/></label><label>Must arrive within<select aria-label="Delivery deadline" value={deadline} onChange={e=>setDeadline(Number(e.target.value))}><option value="30">30 minutes</option><option value="60">1 hour</option><option value="120">2 hours</option><option value="180">3 hours</option></select></label><fieldset><legend>They’re into</legend><div className="chips">{interests.map(tag=><button type="button" aria-pressed={picked.includes(tag)} key={tag} onClick={()=>toggle(tag)}>{tag}</button>)}</div></fieldset><label>Card note<textarea defaultValue="Congratulations on the promotion — dinner is on me next time!" maxLength={180}/></label>{error&&<p className="error" role="alert">{error}</p>}<button className="primary" disabled={loading}>{loading?"Calling nearby boutiques…":"Find local gifts"}</button><small>No payment is collected. This is a product demo.</small></form>
   <div className="results" aria-live="polite"><div className="resulthead"><div><p className="kicker">CURATED RESPONSES</p><h2>{submitted?`${ranked.filter(x=>x.eligible).length} fit the brief`:"Preview matches"}</h2></div><span>{submitted?"Brief live · demo":"Adjust brief to rerank"}</span></div>{ranked.map((o,i)=><article className={!o.eligible?"dim":""} key={o.id}><div className="monogram">{o.image}</div><div className="offer"><small>{o.shop} · ★ {o.rating}</small><h3>{o.item}</h3><p>{o.note}</p><div className="tags">{o.tags.slice(0,3).map(t=><i key={t}>{t}</i>)}</div></div><div className="terms"><b>${o.price}</b><span>{o.etaMinutes} min</span><small>{o.score}% brief fit</small><button disabled={!o.eligible} onClick={()=>setSelected(o.id)}>{selected===o.id?"Selected ✓":o.eligible?"Choose gift":"Misses brief"}</button></div></article>)}</div>
  </section>
  {choice&&<section className="confirmation" role="status"><div><p className="kicker">GIFT SELECTED</p><h2>{choice.item}</h2><p>{choice.shop} will wrap it and attach your note. Demo courier ETA: {choice.etaMinutes} minutes.</p></div><button onClick={()=>setSelected(null)}>Change selection</button></section>}
  <footer><p><b>GiftRelay</b> · Fictional prototype. Simulated boutique inventory, matching, checkout, and delivery.</p><a href="https://www.ideabrowser.com/hub/ideas/today">Idea source ↗</a></footer>
 </main>
}
