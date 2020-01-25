public var movementSpeed: float = 0.05;
private var rend: Renderer;

function Start() {
    rend = GetComponent.<Renderer>();
}

function Update() {
    var offset: float = Time.time * -movementSpeed;
    rend.material.SetTextureOffset("_MainTex", new Vector2(offset, 0));
}
