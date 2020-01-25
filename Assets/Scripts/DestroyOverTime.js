private var lifeSpan: float = 5.0f;

function Update() {
    lifeSpan = lifeSpan - Time.deltaTime;
    if (lifeSpan <= 0) {//destroy current object if lifeSpan < 0
        Destroy(gameObject);
    }
}

