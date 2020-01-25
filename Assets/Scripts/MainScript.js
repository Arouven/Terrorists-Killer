import System.Collections.Generic;
import UnityEngine.Video;
import UnityEngine.SceneManagement;


function Bonus() {
	
    SceneManager.LoadScene("Bonus");
}
function PlayHere() {
	Time.timeScale = 1f;
    SceneManager.LoadScene("Intro");
	FindObjectOfType.<GameManager>().boolToStart=false;
}
