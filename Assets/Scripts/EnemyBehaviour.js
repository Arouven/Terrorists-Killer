

public var enemyLevel: int = 0;

public var commingSpeed: float = 3;

private var enemyCanJump: boolean = false;

public var jumpHeight: float = 20;

private var numJumps = 0;
private var maxJumps = 1;
public var anim: Animator;
private var enemyRB: Rigidbody2D;


//0--comming toward player
//1--comming,jumping and shooting


function Start() {
	enemyRB = GetComponent.<Rigidbody2D>();
	if (enemyLevel >= 1 && enemyLevel <=2) {
		enemyCanJump = true;
	}
}

function Update() {
	switch (enemyLevel) {
		case 0:
			enemyRB.velocity = new Vector2(-commingSpeed, enemyRB.velocity.y);

			break;

		case 1:
			if (canJump()) {
				enemyRB.velocity = new Vector2(-commingSpeed, jumpHeight);

				++numJumps;
				anim.SetBool("isJumping", true);

			}
			break;
	}
}
function canJump() {
	return numJumps < maxJumps;
}

function OnBecameInvisible() {
	Destroy(gameObject);
}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.CompareTag("Ground")) {
		numJumps = 0;
	}
	if (coll.gameObject.CompareTag("Player")) {
		FindObjectOfType.<GameManager>().killPlayer();
		Destroy(gameObject);
		//Debug.Log("touch the player");
	}
	if (coll.gameObject.CompareTag("Shield")) {
		coll.gameObject.SetActive(false);
		Destroy(gameObject);
	}

}



