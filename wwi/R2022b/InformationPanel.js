export default class InformationPanel {
  constructor(parentNode) {
    this.informationPanel = document.createElement('div');
    this.informationPanel.className = 'information-panel';

    let infoTabsBar = document.createElement('div');
    infoTabsBar.className = 'info-tabs-bar';
    this.informationPanel.appendChild(infoTabsBar);

    this.tab0 = document.createElement('button');
    this.tab0.className = 'info-tab tab0';
    this.tab0.innerHTML = 'Simulation';
    this.tab0.onclick = () => this.switchTab(0);
    infoTabsBar.appendChild(this.tab0);

    this.tab1 = document.createElement('button');
    this.tab1.className = 'info-tab tab1';
    this.tab1.innerHTML = 'Robots';
    this.tab1.onclick = () => this.switchTab(1);
    infoTabsBar.appendChild(this.tab1);

    this.tab2 = document.createElement('button');
    this.tab2.className = 'info-tab tab2';
    this.tab2.innerHTML = 'About';
    this.tab2.onclick = () => this.switchTab(2);
    infoTabsBar.appendChild(this.tab2);

    this.webotsPresentation = document.createElement('div');
    this.webotsPresentation.style.display = 'none';
    this.webotsPresentation.innerHTML = `
      <h2>Brian Mechanism Simulator</h2>
      <p>For use in robot programming, control and education.</p>`;
    this.informationPanel.appendChild(this.webotsPresentation);

    this.simulationDescritption = document.createElement('div');
    this.informationPanel.appendChild(this.simulationDescritption);

    this.simulationTitle = document.createElement('h2');
    this.simulationTitle.innerHTML = 'No title found';
    this.simulationDescritption.appendChild(this.simulationTitle);

    this.simulationText = document.createElement('div');
    this.simulationText.className = 'simulation-text';
    this.simulationText.innerHTML = 'No description found';
    this.simulationDescritption.appendChild(this.simulationText);


    this.robotSelector = document.createElement('div');
    this.robotSelector.style.display = 'none';
    this.informationPanel.appendChild(this.robotSelector);

    parentNode.appendChild(this.informationPanel);
  }

  loadRobots() {
    // delete children
    this.robotSelector.textContent = '';
    this.robotSelectorTitle = document.createElement('h5');
    this.robotSelectorTitle.innerHTML = 'Select Robot';
    this.robotSelector.appendChild(this.robotSelectorTitle);

    this.robotsSelectorText = document.createElement('div');
    this.robotsSelectorText.className = 'simulation-text';

    let botTypes = [
      "live",
      "animation",
      "scene"
    ]
    let sceneSelect = document.createElement("select");
    sceneSelect.style.width = "100%";
    sceneSelect.style.marginBottom = "5px";
    botTypes.map(botType => {
      let option = document.createElement("option");
      option.value = botType;
      option.text = botType[0].toUpperCase() + botType.slice(1);
      sceneSelect.appendChild(option);
    })
    sceneSelect.addEventListener('change', changedBotType);
    this.robotsSelectorText.appendChild(sceneSelect);


    function changedBotType(varr) {
      let botType = varr.path[0].value
      showBots(botType)
    }

    let button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('ID', 'selectRobot');
    button.setAttribute('value', 'Select Robot');

    let hr = document.createElement('hr');
    this.robotsSelectorText.appendChild(hr);
    let div0 = document.createElement('div');
    // div0.appendChild(robotSelect)
    this.robotsSelectorText.appendChild(div0);
    let robotsNames = [];
    let showBots = (botType) => {
      let robots = window.localStorage.getItem("robots")
      try {
        robots = JSON.parse(robots)
      } catch (error) { robots = {} }
      robotsNames = Object.keys(robots).filter(key => robots[key].type === botType)
      button.disabled = (robotsNames.length === 0) ? true : false
      let array = robotsNames;
      array.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
      robotSelect.style.width = "100%"
      robotSelect.textContent = '';
      // robotSelect.style.float = "left"
      for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        robotSelect.appendChild(option);
      }
      div0.textContent = '';
      div0.appendChild(robotSelect);
    }

    let robotSelect = document.createElement("select");
    showBots(sceneSelect.value)

    this.robotsSelectorText.appendChild(hr);
    let selectRobot = () => {
      if (robotsNames.length === 0) return;
      let selectedBot = robotSelect.value
      this.startLoadRobot(selectedBot)
    }

    button.addEventListener('click', selectRobot);

    let div1 = document.createElement('div');
    div1.appendChild(button)
    this.robotsSelectorText.appendChild(div1);
    this.robotSelector.appendChild(this.robotsSelectorText);

  }

  startLoadRobot(botName) {
    let robots = {}
    try {
      robots = JSON.parse(window.localStorage.getItem("robots"));
    } catch (error) { }
    let botType = robots[botName].type;
    let webotsView = document.getElementsByTagName('webots-view')[0];
    switch (botType) {
      case "scene":
      case "animation":
        webotsView._view.destroyWorld()
        webotsView._view.open(robots[botName].data, 'x3d', robots[botName].data.replace(/x3d$/, 'jpg'));
        if(botType === "animation"){
          //setAnimation
          webotsView._view.setAnimation(robots[botName].data.replace(/x3d$/, 'json'))
        }
        webotsView.toolbar.type = 'animation';
        
        webotsView._view.onready= () => {
          webotsView.toolbar._createRobotWindowPane();
          webotsView.toolbar.createRobotWindowButton(botName);
          webotsView.toolbar._createRobotWindows(botName);
          
        }
        
        break;
      case "live":
        let serverUrl = robots[botName].server;
        let repoUrl = robots[botName].url;
        let url = `${serverUrl}/session?url=${repoUrl}`
        webotsView._view.destroyWorld()
        webotsView._view.open(url);


        webotsView.toolbar.type = 'animation';
        
        webotsView._view.onready= () => {
          webotsView.toolbar._createRobotWindowPane();
          webotsView.toolbar.createRobotWindowButton();
          webotsView.toolbar._createRobotWindows();
          
        }
        break;
    }
  }

  startAnimation() {

    const mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (mobileDevice) {
      let head = document.getElementsByTagName('head')[0];

      let mobileCss = document.createElement('link');
      mobileCss.setAttribute('rel', 'stylesheet');
      mobileCss.setAttribute('type', 'text/css');
      mobileCss.setAttribute('href', 'https://www.cyberbotics.com/wwi/R2022b/css/wwi_mobile.css');
      head.appendChild(mobileCss);
    }

    const defaultThumbnail = '/web/wwi/R2022b/images/loading/default_thumbnail.png';
    const streamingMode = 'x3d'
    const webotsView = document.getElementsByTagName('webots-view')[0];
    let url = "https://ubuntu.cseco.co.ke?url=https://github.com/kDeod/4wdsim/blob/main/worlds/4wd.wbt"
    webotsView.connect(url, streamingMode, false, mobileDevice, -1, defaultThumbnail);


  }

  switchTab(number) {
    switch (number) {
      case 0:
        this.tab0.style.backgroundColor = '#222';
        this.tab1.style.backgroundColor = '#333';
        this.tab2.style.backgroundColor = '#333';
        this.webotsPresentation.style.display = 'none';
        this.robotSelector.style.display = 'none';
        this.simulationDescritption.style.display = 'block';
        break;
      case 1:
        this.loadRobots();
        this.tab0.style.backgroundColor = '#333';
        this.tab1.style.backgroundColor = '#222';
        this.tab2.style.backgroundColor = '#333';
        this.webotsPresentation.style.display = 'none';
        this.robotSelector.style.display = 'block';
        this.simulationDescritption.style.display = 'none';
        break;
      case 2:
        this.tab0.style.backgroundColor = '#333';
        this.tab1.style.backgroundColor = '#333';
        this.tab2.style.backgroundColor = '#222';
        this.webotsPresentation.style.display = 'block';
        this.robotSelector.style.display = 'none';
        this.simulationDescritption.style.display = 'none';

    }

  }

  setTitle(title) {
    this.simulationTitle.innerHTML = title;
  }

  setDescription(description) {
    let array = description.split('"').filter(String);
    let arrayLength = array.length;
    if (arrayLength > 0)
      this.simulationText.innerHTML = '';

    for (let i = 0; i < arrayLength; i++) {
      let regExUrl = /(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]*(\/\S*)?/g;
      array[i] = array[i].replaceAll(regExUrl, link => '<a href=' + link + ' target=_blank>' + link + '</a>');
      this.simulationText.innerHTML += '<p>' + array[i] + '</p>';
    }
  }
}
