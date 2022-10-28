import FloatingWindow from './FloatingWindow.js';

export default class FloatingRobotWindow extends FloatingWindow {
  constructor(parentNode, name, url, windowName, mainWindow) {
    super(parentNode, name, url);
    this.isMainWindow = mainWindow;
    this.window = windowName;
    this.headerText.innerHTML = (mainWindow ? 'World Info: ' : 'Robot Window: ') + name;
    this.frame.id = this.name + '-robot-window';
    // this.frame.src = (this.window === '<none>') ? '' : this.url + '/robot_windows/' + this.window + '/' + this.window +
      // '.html?name=' + this.name;
      console.log(name)
      let url_ = (this.window === '<none>') ? '' : this.url + '/robot_windows/' + this.window + '/' + this.window +
      '.html?name=' + this.name;
    // this.frame.src =  `${this.url}/${name}/${name}.html`// not live
    fetch(url_).then(function(data) {
      this.frame.src =  url_

      if (this.isMainWindow) {
        this.frame.allowtransparency = 'true';
        this.frame.style.backgroundColor = 'transparent';
      }
    }).catch(error => {
      url_ = `${this.url}/${name}/${name}.html`
      this.frame.src =  url_

      if (this.isMainWindow) {
        this.frame.allowtransparency = 'true';
        this.frame.style.backgroundColor = 'transparent';
      }
    })
    
    
  }
}
