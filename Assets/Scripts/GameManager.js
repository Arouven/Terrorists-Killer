
import System.Collections;
import UnityEngine.UI;

public var waveSpawnPoint: Transform;

public var waves: GameObject[];
public var waveDelays: float[];
public var activateWaves: boolean = true;
private var waveTracker: int;

public var powerUps: GameObject[];
public var powerupChance: int;

public var speedupLength: float;
private var powerupCounter: float;
private var playerSpeed: float;
private var thePlayer: PlayerBehaviour;
public var speedMultiplier: float;

private var playerBullet: boolean;

public var playerRevivePoint: Transform;
public var explosion: GameObject;

public var gameOverScreen: GameObject;

public var livesText: Text;
public var healthText: Text;
public var scoreText: Text;
public var bossHealthText: Text;
public var bossHealthObject: GameObject;

public var bgSound: GameObject;
public var evilSound: GameObject;

public var bossBattle: GameObject;

public var deadPlayer: GameObject;
//public var instantiateDeadPlayer: GameObject;

private var CurrentLife: int;
private var CurrentHealth: int;
private var CurrentScore: int;

public var countDownToStart: float = 2.0f;
public var boolToStart: boolean = false;

function Start() {
	boolToStart = false;
    thePlayer = FindObjectOfType.<PlayerBehaviour>();
    playerSpeed = thePlayer.moveSpeed;

    CurrentLife = 3;
    CurrentHealth = 100;
    CurrentScore = 0;

    livesText.text = "Lives: " + CurrentLife;
    healthText.text = "Health: " + CurrentHealth + " %";
    scoreText.text = "Score: " + CurrentScore;
    bgSound.SetActive(true);
}

function Update() {
    if (activateWaves) {
        waveDelays[waveTracker] -= Time.deltaTime;
        if (waveDelays[waveTracker] < 0) {
            Instantiate(waves[waveTracker], waveSpawnPoint.position, waveSpawnPoint.rotation);
            waveTracker++;
            if (waveTracker >= waveDelays.Length) {
                activateWaves = false;
                if (bossBattle != null) {
                    bossBattle.SetActive(true);
                }
            }
        }
    }
    if (powerupCounter > 0) {
        powerupCounter -= Time.deltaTime;
        if (powerupCounter <= 0) {
            thePlayer.moveSpeed = playerSpeed;
        }
    }
	if(boolToStart){
		countDownToStart -= Time.deltaTime;
        if (countDownToStart <= 0) {
            Time.timeScale = 0f;//freez the time
        }
	}
	
}
function updateBossHealthLevel() {//-1 with boss health
    FindObjectOfType.<Boss>().bossHealth -= 1;
    bossHealthText.text = "Boss Health: " + FindObjectOfType.<Boss>().bossHealth + " %";
}
function BossGotHeadshot() {
    FindObjectOfType.<Boss>().bossHealth -= 10;
    bossHealthText.text = "Boss Health: " + FindObjectOfType.<Boss>().bossHealth + " %";

}
function dropPowerup(ePosition) {//when enemy get deatroy
    var enemyPosition: Vector3 = ePosition;
    if (Random.Range(0, 100) < powerupChance) {//random function
        Instantiate(powerUps[Random.Range(0, powerUps.Length)], enemyPosition, new Quaternion(0, 0, 0, 0));
    }
}
function ActivateSpeedPower() {//speed powerup fn
    powerupCounter = speedupLength;
    thePlayer.moveSpeed = playerSpeed * speedMultiplier;
}
function addLife() {//add life powerup
    CurrentLife = CurrentLife + 1;
    livesText.text = "Lives: " + CurrentLife;
}
function removeHealth(reHealth) {//remove health from player as per bullet damage
    var rHealth: int = reHealth;
    CurrentHealth = CurrentHealth - rHealth;
    healthText.text = "Health: " + CurrentHealth + " %";
    if (CurrentHealth <= 0) {
        killPlayer();
    }
}
 function killPlayer() {
    CurrentHealth = 100;
    healthText.text = "Health: " + CurrentHealth + " %";
    CurrentLife = CurrentLife - 1;
    livesText.text = "Lives: " + CurrentLife;
    if (CurrentLife > 0) {//player still alive
		
		healthText.text = "Health: " + CurrentHealth + " %";
        Instantiate(explosion, thePlayer.transform.position, thePlayer.transform.rotation);
        thePlayer.gameObject.SetActive(false);
        thePlayer.moveSpeed = playerSpeed;
        thePlayer.transform.position = playerRevivePoint.transform.position;
        thePlayer.gameObject.SetActive(true);
        thePlayer.shield.SetActive(true);
    }
    else if(CurrentLife <=0 ){//player died
		//CurrentHealth = -10;
        livesText.text = "All lives lost!";
        healthText.text = "Health: 0 %";
        Instantiate(deadPlayer, thePlayer.transform.position, thePlayer.transform.rotation);//
        thePlayer.gameObject.SetActive(false);
        gameOverScreen.SetActive(true);
        bgSound.SetActive(false);        
        Instantiate(evilSound, thePlayer.transform.position, thePlayer.transform.rotation);
		//IEnumerator waitforme(){
		boolToStart = true;
			//yield return new WaitForSeconds (2);   
		//}
		   

        

    }
}

function addScore(sToAdd) {//add and update score
    var scoreToAdd: int = sToAdd;
    CurrentScore = CurrentScore + scoreToAdd;
    scoreText.text = "Score: " + CurrentScore;
}

