
public var isShield: boolean;
public var isSpeed: boolean;
public var isExtraLife: boolean;

public var moveSpeed: float = 0.0f;

public var collectedSound: GameObject;

function Update() {
    transform.position = new Vector3(transform.position.x - (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z);
}

function OnTriggerEnter2D(other:Collider2D ) {
    if (other.tag == "Player") {
        if (isShield) {
            other.GetComponent.<PlayerBehaviour>().shield.SetActive(true);
            Instantiate(collectedSound, FindObjectOfType.<PlayerBehaviour>().transform.position, FindObjectOfType.<PlayerBehaviour>().transform.rotation);
            Destroy(gameObject);
        }

        if (isSpeed) {
            FindObjectOfType.<GameManager>().ActivateSpeedPower();
            Instantiate(collectedSound, FindObjectOfType.<PlayerBehaviour>().transform.position, FindObjectOfType.<PlayerBehaviour>().transform.rotation);
            Destroy(gameObject);
        }
        if (isExtraLife) {
            FindObjectOfType.<GameManager>().addLife();
            Instantiate(collectedSound, FindObjectOfType.<PlayerBehaviour>().transform.position, FindObjectOfType.<PlayerBehaviour>().transform.rotation);
            Destroy(gameObject);
        }

    }
}

function OnBecameInvisible() {//destroy after talken
    Destroy(gameObject);
}
