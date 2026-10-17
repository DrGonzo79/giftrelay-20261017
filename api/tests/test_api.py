from fastapi.testclient import TestClient
from api.main import app

client=TestClient(app)
OFFERS=[{"id":"1","shop":"Local","item":"Set","price":80,"eta_minutes":60,"rating":4.8,"tags":["design","home"]},{"id":"2","shop":"Late","item":"Box","price":130,"eta_minutes":240,"rating":5,"tags":["food"]}]

def test_health(): assert client.get("/health").json()=={"status":"ok"}
def test_rank_places_eligible_match_first():
    r=client.post("/rank",json={"brief":{"budget":100,"deadline_minutes":120,"interests":["design"]},"offers":OFFERS})
    assert r.status_code==200
    assert r.json()["ranked"][0]["offer_id"]=="1"
    assert r.json()["ranked"][0]["eligible"] is True
def test_invalid_brief_is_rejected():
    assert client.post("/rank",json={"brief":{"budget":0,"deadline_minutes":10,"interests":[]},"offers":OFFERS}).status_code==422
def test_no_eligible_offer_is_domain_failure():
    r=client.post("/rank",json={"brief":{"budget":25,"deadline_minutes":30,"interests":["food"]},"offers":OFFERS})
    assert r.status_code==422
    assert "No offer" in r.json()["detail"]
