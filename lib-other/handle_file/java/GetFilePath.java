import java.io.File;
import java.io.FileFilter;

public class GetFilePath {
  public static void main(String[] args) {
    String path = "../../../../library";
    File file = new File(path);
    handleFile(file);
  }

  private static void handleFile(File file) {
    File[] fs = file.listFiles();
    for(File f:fs) {
      if (f.isDirectory()) {
        handleFile(f);
      }
      if (f.isFile()) {
        System.out.println(f);
      }
    }
  }
}
