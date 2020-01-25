public var playerLives: int = 3;
public var playerHealth: int = 100;
public var moveSpeed = 5;
private var moveInput: Vector2;
public var topLeft: Transform;//touch top left
public var buttomRight: Transform;//touch buttom right
public var anim: Animator;//hereeeee
var num: int = 1;

//repeated bullet
public var bullet: GameObject;
public var frontBulletPoint: Transform;




//shoot loop
public var shotDelay = 0.5;
private var shotCounter: float;

public var shield: GameObject;

private var jumpHeight = 20;
private var numJumps = 0;
private var maxJumps = 1;



function Start() {
    
}

function OnCollisionEnter2D(coll: Collision2D) {
    if (coll.gameObject.CompareTag("Ground")) {
        numJumps = 0;
    }

    if (coll.gameObject.CompareTag("Boss") || coll.gameObject.CompareTag("BossHead")) {
        FindObjectOfType.<GameManager>().killPlayer();
    }

}

function movementinput() {
		var x;
		var y;
    
    if ((Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow)) && canJump()) {
        x = GetComponent(Rigidbody2D).velocity.x;
        GetComponent(Rigidbody2D).velocity = new Vector2(x, jumpHeight);
        ++numJumps;
        anim.SetBool("isJumping",true);
    }else{
    	anim.SetBool("isJumping",false);
    }


    if (Input.GetKey(KeyCode.A)||Input.GetKey(KeyCode.LeftArrow)) {
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(-moveSpeed, y);
        anim.SetFloat("SpeedBack", 1.0);

    }else{
    	anim.SetFloat("SpeedBack", 0);
    }

   if (Input.GetKey(KeyCode.D)||Input.GetKey(KeyCode.RightArrow)) {
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);
        anim.SetFloat("Speed", 1.0);
    }else{
    	anim.SetFloat("Speed", 0);
    }


}
function canJump() {
    return numJumps < maxJumps;
}
//function Flip() {
//    var flipScale: Vector3;
//    var rigidbody: Rigidbody2D;

//    rigidbody = GetComponent(Rigidbody2D);

//    flipScale = rigidbody.transform.localScale;
//    flipScale.x *= -1;

//    rigidbody.transform.localScale = flipScale;

   
//}

function Update() {
    movementinput();
    transform.position = Vector3(Mathf.Clamp(transform.position.x, topLeft.position.x, buttomRight.position.x), Mathf.Clamp(transform.position.y, buttomRight.position.y, topLeft.position.y), transform.position.z);
    if (Input.GetButtonDown("Fire1")) {//on mouse click fire
        Instantiate(bullet, frontBulletPoint.position, frontBulletPoint.rotation);//fire

        shotCounter = shotDelay;
    }


    if (Input.GetButton("Fire1")) {//hold button
        shotCounter -= Time.deltaTime;
        if (shotCounter <= 0) {

            Instantiate(bullet, frontBulletPoint.position, frontBulletPoint.rotation);//fire

            shotCounter = shotDelay;
        }
    }

}

