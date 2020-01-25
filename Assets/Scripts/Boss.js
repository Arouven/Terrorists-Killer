

public var phase0: boolean;
public var phase1: boolean;
public var phase2: boolean;
public var phase3: boolean;
public var phase4: boolean;
public var phase5: boolean;

public var countDownToStart: float = 15.0f;

public var bossScore: int = 1000;

public var theBoss: GameObject;
public var frontPosition: Transform;
public var backPosition: Transform;
public var bossLaser: GameObject;
public var bossShotPoint: Transform;

public var healthPointRemover: int = 10;//-10 when shoot the player
public var headshot: int = 50;

public var moveSpeedX: float = 5.0f;

public var moveFront: boolean;

public var shotDelay: float = 1.0f;
private var shotCounter: float;

public var bossHealth: int = 100;

public var bossSound: GameObject;
public var evilSound: GameObject;
public var explosion: GameObject;

public static var canBeHurt: boolean = false;

public var levelWinScreen: GameObject;
public var timeToLevelWin: float = 5.0f;

public var timeToStartFight: float = 3.0f;

public var bossDeadSound: GameObject;

public var player: GameObject;


function Update() {
    if (phase0) {
        countDownToStart -= Time.deltaTime;
        if (countDownToStart <= 0) {
            FindObjectOfType.<GameManager>().bgSound.SetActive(false);//stop normal bg sound
            FindObjectOfType.<GameManager>().bossHealthObject.SetActive(true);//display boss health

            Instantiate(evilSound, theBoss.transform.position, theBoss.transform.rotation);//evil laugth
             
            phase0 = false;
            phase1 = true;
        }
    }

    if (phase1) {//come and give an evil laugth
        theBoss.transform.position = Vector3.MoveTowards(theBoss.transform.position, new Vector3(backPosition.transform.position.x, theBoss.transform.position.y, theBoss.transform.position.z), moveSpeedX * Time.deltaTime);

        if (theBoss.transform.position.x == backPosition.position.x) {
            bossSound.SetActive(false);
            timeToStartFight -= Time.deltaTime;//countdown and start fighting
            if (timeToStartFight <= 0) {
                phase1 = false;
                phase2 = true;
            }
        }
    }

    if (phase2) {//player can hurt theboss
        canBeHurt = true;
        bossSound.SetActive(true);
        phase2 = false;
        phase3 = true;
    }

    if (phase3) {//move front and back
        if (moveFront) {
            theBoss.transform.position = Vector3.MoveTowards(theBoss.transform.position, new Vector3(frontPosition.transform.position.x, theBoss.transform.position.y, theBoss.transform.position.z), moveSpeedX * Time.deltaTime);
            if (theBoss.transform.position.x <= frontPosition.position.x) {
                moveFront = false;
            }
        }
        if (!moveFront) {
            theBoss.transform.position = Vector3.MoveTowards(theBoss.transform.position, new Vector3(backPosition.transform.position.x, theBoss.transform.position.y, theBoss.transform.position.z), moveSpeedX * Time.deltaTime);
            if (theBoss.transform.position.x >= backPosition.position.x) {
                moveFront = true;
            }
        }
        shotCounter -= Time.deltaTime;
        if (shotCounter <= 0) {//continuously shooting
            Instantiate(bossLaser, bossShotPoint.position, bossShotPoint.rotation);
            shotCounter = shotDelay;
        }
        if (bossHealth <= 40) {
            phase3 = false;
            phase4 = true;

        }
    }
    if (phase4) {
        if (moveFront) {
            theBoss.transform.position = Vector3.MoveTowards(theBoss.transform.position, new Vector3(frontPosition.transform.position.x, theBoss.transform.position.y, theBoss.transform.position.z), moveSpeedX*2 * Time.deltaTime);
            if (theBoss.transform.position.x <= frontPosition.position.x) {
                moveFront = false;
            }
        }
        if (!moveFront) {
            theBoss.transform.position = Vector3.MoveTowards(theBoss.transform.position, new Vector3(backPosition.transform.position.x, theBoss.transform.position.y, theBoss.transform.position.z), moveSpeedX*2 * Time.deltaTime);
            if (theBoss.transform.position.x >= backPosition.position.x) {
                moveFront = true;
            }
        }
        shotCounter -= Time.deltaTime;
        if (shotCounter <= 0) {//continuously shooting
            Instantiate(bossLaser, bossShotPoint.position, bossShotPoint.rotation);
            shotCounter = shotDelay / 2;
        }
    

        if (bossHealth <= 0) {//dead boss
            //explosion
            Instantiate(explosion, theBoss.transform.position, theBoss.transform.rotation);
            bossSound.SetActive(false);
            Instantiate(bossDeadSound, theBoss.transform.position, theBoss.transform.rotation);
            player.SetActive(false);
            FindObjectOfType.<GameManager>().addScore(bossScore);
            phase4 = false;
            phase5 = true;
            shotCounter = 9999;
            theBoss.SetActive(false);
        }
    }
    if (phase5) {
        timeToLevelWin -= Time.deltaTime;
        if (timeToLevelWin <= 0) {
            FindObjectOfType.<GameManager>().bossHealthObject.SetActive(false);//remove boss health
            Time.timeScale = 0f;//freez the time
            levelWinScreen.SetActive(true);
            gameObject.SetActive(false);
        }
    }
}
