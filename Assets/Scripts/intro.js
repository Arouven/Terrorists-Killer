import System.Collections.Generic;
import UnityEngine.Video;
import UnityEngine.SceneManagement;


function skipBtn() {
	Time.timeScale = 1f;
    SceneManager.LoadScene("s1");
	FindObjectOfType.<GameManager>().boolToStart=false;
}