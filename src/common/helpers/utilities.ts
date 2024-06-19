export function getOS(isRenderer: boolean) {
  let os;
  let platform;

  if (isRenderer) {
    if (navigator.appVersion.indexOf("Win") != -1) {
      platform = "win32";
    }
    if (navigator.appVersion.indexOf("Mac") != -1) {
      platform = "darwin";
    }
    if (navigator.appVersion.indexOf("X11") != -1) {
      platform = "linux";
    }
    if (navigator.appVersion.indexOf("Linux") != -1) { 
      platform = "linux";
    }
  } else {
    platform = process.platform;
  }
  
  if (platform === 'linux') {
    os = 'linux';
  } else if (platform === 'darwin') {
    os = 'macOS';
  } else if (platform === 'win32') {
    os = 'windows';
  }

  return os;
}