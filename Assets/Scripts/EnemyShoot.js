
public var bullet: GameObject;
public var bulletPoint: Transform;

public var shotDelay: float = 1.0f;
private var shotCounter: float;

function Update() {
    shotCounter -= Time.deltaTime;
    if (shotCounter <= 0) {
        Instantiate(bullet, bulletPoint.position, bulletPoint.rotation);
        shotCounter = shotDelay;
    }
}
