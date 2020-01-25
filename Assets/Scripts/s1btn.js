import System.Collections.Generic;
import UnityEngine.Video;
import UnityEngine.SceneManagement;


function MainMenu() {
	Time.timeScale = 1f;
    SceneManager.LoadScene("Main");
	FindObjectOfType.<GameManager>().boolToStart=false;
}
function RestartBtn() {
	Time.timeScale = 1f;
    SceneManager.LoadScene("s1");
	FindObjectOfType.<GameManager>().boolToStart=false;
}
function BonusBtn() {
    SceneManager.LoadScene("Bonus");

}