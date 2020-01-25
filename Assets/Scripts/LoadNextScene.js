import System.Collections.Generic;
import UnityEngine.Video;
import UnityEngine.SceneManagement;

public var VideoPlayer: VideoPlayer; // Drag & Drop the GameObject holding the VideoPlayer component
public var SceneName: String;

function Start() {
    VideoPlayer.loopPointReached += LoadScene;
}
function LoadScene() {
    SceneManager.LoadScene(SceneName);
}
