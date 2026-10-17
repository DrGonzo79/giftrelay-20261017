from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="GiftRelay matching API", version="0.1.0")

class Brief(BaseModel):
    budget: float = Field(gt=0)
    deadline_minutes: int = Field(ge=30)
    interests: List[str] = Field(min_length=1)

class Offer(BaseModel):
    id: str
    shop: str
    item: str
    price: float = Field(gt=0)
    eta_minutes: int = Field(gt=0)
    rating: float = Field(ge=0, le=5)
    tags: List[str]

class MatchRequest(BaseModel):
    brief: Brief
    offers: List[Offer] = Field(min_length=1)

@app.get("/health")
def health(): return {"status": "ok"}

@app.post("/rank")
def rank(request: MatchRequest):
    wanted = {x.lower() for x in request.brief.interests}
    results=[]
    for offer in request.offers:
        overlap=len(wanted.intersection(x.lower() for x in offer.tags))
        under=offer.price <= request.brief.budget
        on_time=offer.eta_minutes <= request.brief.deadline_minutes
        score=max(0,min(100,round(overlap*22+(24 if under else 0)+(28 if on_time else 0)+offer.rating*2)))
        results.append({"offer_id":offer.id,"score":score,"eligible":under and on_time,"matched_interests":overlap})
    results.sort(key=lambda x:(x["eligible"],x["score"]),reverse=True)
    if not any(x["eligible"] for x in results):
        raise HTTPException(status_code=422, detail="No offer can meet both budget and deadline")
    return {"ranked":results}
