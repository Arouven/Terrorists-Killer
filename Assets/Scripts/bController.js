public var moveSpeed = 15;//float
public var bulletImpact : GameObject;
public var explosion : GameObject;
public var hurtPlayer = true;//bool
public var bossBulletHurt = true;//bool

public var playerGotHeadshotSound: GameObject;

function Update() {
	transform.position = new Vector3(transform.position.x + (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z);
}

//destroy other obj
function OnTriggerEnter2D(other: Collider2D) {
	Instantiate(bulletImpact, transform.position, transform.rotation);
	Destroy(gameObject);
	if (other.tag == "Enemy") {//shot enemy
		FindObjectOfType.<EnemyLives>().enemyLive -= 1;
		if (FindObjectOfType.<EnemyLives>().enemyLive <= 0) {
			FindObjectOfType.<GameManager>().dropPowerup(other.transform.position);
			var a: int = FindObjectOfType.<EnemyLives>().scoreWhenKill;
			FindObjectOfType.<GameManager>().addScore(a);
			Instantiate(explosion, transform.position, transform.rotation);
			Destroy(other.gameObject);
		}
	}
	if (other.tag == "EnemyHead") {//headshot an enemy
		var b: int = FindObjectOfType.<EnemyLives>().headshot;
		FindObjectOfType.<EnemyLives>().enemyLive -= b;

		if (FindObjectOfType.<EnemyLives>().enemyLive <= 0) {
			FindObjectOfType.<GameManager>().dropPowerup(other.transform.position);
			var c: int = FindObjectOfType.<EnemyLives>().scoreWhenKill;
			FindObjectOfType.<GameManager>().addScore(c);
			Instantiate(explosion, transform.position, transform.rotation);
			Destroy(other.gameObject);
		}

		Debug.Log(FindObjectOfType.<EnemyLives>().enemyLive);
	}

	if (other.tag == "Player" && hurtPlayer) {
		var d: int = FindObjectOfType.<EnemyLives>().bulletPower;//health to remove from player
		FindObjectOfType.<GameManager>().removeHealth(d);
	}
    if (other.tag == "PlayerHead" && hurtPlayer) {
        Instantiate(playerGotHeadshotSound, FindObjectOfType.<PlayerBehaviour>().transform.position, FindObjectOfType.<PlayerBehaviour>().transform.rotation);
		var e: int = FindObjectOfType.<EnemyLives>().headshot;//health to remove from player
		FindObjectOfType.<GameManager>().removeHealth(e);
	}
	if (other.tag == "Shield") {//deactivate the shield when bullet collide
		other.gameObject.SetActive(false);
	}


	if (other.tag == "Player" && bossBulletHurt) {
		var f: int = FindObjectOfType.<Boss>().healthPointRemover;
		FindObjectOfType.<GameManager>().removeHealth(f);//-f to player
	}
    if (other.tag == "PlayerHead" && bossBulletHurt) {
        Instantiate(playerGotHeadshotSound, FindObjectOfType.<PlayerBehaviour>().transform.position, FindObjectOfType.<PlayerBehaviour>().transform.rotation);
		var g: int = FindObjectOfType.<Boss>().headshot;//health to remove from player
		FindObjectOfType.<GameManager>().removeHealth(g);
	}
	if (other.tag == "Boss" && Boss.canBeHurt) {
		FindObjectOfType.<GameManager>().updateBossHealthLevel();//-1 to boss
	}
	if (other.tag == "BossHead" && Boss.canBeHurt) {
		FindObjectOfType.<GameManager>().BossGotHeadshot();//-10 to boss
	}
}

//destroy bullet while out of scene
function OnBecameInvisible(){
	Destroy (gameObject);
}


