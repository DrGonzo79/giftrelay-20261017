export type GiftBrief={budget:number;deadlineMinutes:number;interests:string[]};
export type Offer={id:string;shop:string;item:string;price:number;etaMinutes:number;rating:number;tags:string[];note:string;image:string};
export type RankedOffer=Offer&{score:number;reasons:string[];eligible:boolean};
export function rankOffer(brief:GiftBrief, offer:Offer):RankedOffer {
  if (!Number.isFinite(brief.budget)||brief.budget<=0) throw new Error("Budget must be greater than zero");
  if (!Number.isFinite(brief.deadlineMinutes)||brief.deadlineMinutes<30) throw new Error("Deadline must be at least 30 minutes");
  const overlap=offer.tags.filter(tag=>brief.interests.map(x=>x.toLowerCase()).includes(tag.toLowerCase()));
  const under=offer.price<=brief.budget, onTime=offer.etaMinutes<=brief.deadlineMinutes;
  const score=Math.max(0,Math.min(100,Math.round(overlap.length*22+(under?24:0)+(onTime?28:0)+offer.rating*2)));
  const reasons=[overlap.length?`${overlap.length} interest match${overlap.length>1?"es":""}`:"No direct interest match",under?`$${brief.budget-offer.price} under budget`:`$${offer.price-brief.budget} over budget`,onTime?`${brief.deadlineMinutes-offer.etaMinutes} min before deadline`:`${offer.etaMinutes-brief.deadlineMinutes} min late`];
  return {...offer,score,reasons,eligible:under&&onTime};
}
export function rankOffers(brief:GiftBrief,offers:Offer[]){return offers.map(x=>rankOffer(brief,x)).sort((a,b)=>Number(b.eligible)-Number(a.eligible)||b.score-a.score);}
